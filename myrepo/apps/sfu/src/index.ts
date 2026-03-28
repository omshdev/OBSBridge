import * as mediasoup from "mediasoup";
import { WebSocket,WebSocketServer} from "ws";
import type {Room, Slot} from "./types.js"
import { randomUUID } from "crypto";
import type { Worker } from "mediasoup/types";
import os from "os";

// Websocket Server Initialization..
const wss = new WebSocketServer({port : 8080});

// mediasoup global variables.
let worker : Worker | any;

const rooms = new Map<string,Room>();

// mediasoup worker,router creation.
(async()=>{
    worker = await mediasoup.createWorker();
    console.log("worker created...");
})();


wss.on('connection',function connection(ws : WebSocket){
    ws.on('error',console.error);

    ws.on('message',async function message(data:any,isBinary){
        const msg = JSON.parse(data);
        if(msg.type === "client-join"){
            const roomId = msg.roomId;
            const userId = msg.userId;
            const name = msg.name;
            const userType = msg.userType;

            console.log("client join",roomId,userId);
            if(!rooms.has(roomId)){
                const router = await worker.createRouter({mediaCodecs:[
                   {kind : 'video',mimeType:'video/VP8',clockRate:90000}
            ]});                
            
            console.log("Router Created!",router);
            
            rooms.set(roomId,{
                    roomId,
                    router,
                    peers : new Map(),
                    slots : new Map<string,Slot>(),
                    producersByUserId : new Map()
                })
            }

            const room = rooms.get(roomId);
            const peerId = randomUUID();
            
            room?.peers.set(peerId,{userId : userId, socket : ws,transports : new Map() , producers : new Map(),consumers : new Map(),role: userType,name : name });
            
            // slots setup...
            room?.slots.set("slot1",{slotId : "slot1",userId : null,producerId : null});
            room?.slots.set("slot2",{slotId : "slot2",userId : null,producerId : null});
            room?.slots.set("slot3",{slotId : "slot3",userId : null,producerId : null});

            

            // setting roomId and PeerId on websocket object...
            (ws as any).roomId = roomId;
            (ws as any).peerId = peerId;

            // checking router rtpCapabilites...
            if(!room?.router.rtpCapabilities){
                ws.send(JSON.stringify({ msg : "Router RTPCapabilities Error!"}));
                return;
            }
            
            ws.send(JSON.stringify({ type : "rtpCapabilities" , rtp : room.router.rtpCapabilities}))
            
            // notifying..host...
            notifyHost(room);
            // issue : “Meeting already started → new consumer joins → cannot see existing screen share” 
            // fix : send existing producers list to client 
            const existingProducers = [];
            const currentPeerId = (ws as any).peerId;
            for(const[otherPeerId,otherPeer] of room.peers.entries()){
                if(otherPeerId === currentPeerId) continue;
                for(const producer of otherPeer.producers.values()){
                    existingProducers.push({
                        producerId : producer.id,
                        peerId : otherPeerId
                    });
                }
            }
            console.log("Existing producers",existingProducers);
            
            ws.send(JSON.stringify({ type : "existingProducers",producers : existingProducers}));
            return;
        }else if(msg.type === "createWebRtcTransport"){
            console.log(msg.type);
            const roomId = (ws as any).roomId
            const direction = msg.direction;

            // get room 
            const room = rooms.get(roomId);

            if(!room){
                ws.send(JSON.stringify({ msg : "Room Not Found...!"}));
                return;
            } 
            
            // creating webrtctransport on server side...
            const transport = await createWebRtcTransport(room);
            // get peer using peerId from ws object...
            const peerId = (ws as any).peerId;            
            const peer = room?.peers.get(peerId);

            if(!peer){
                ws.send(JSON.stringify({ msg : "Peer Not Found"}));
                return;
            }
            console.log("peer entry.......yeee",peer)
            // setting created webRtcTransport to Peer..
            peer?.transports.set(transport.id,{transport,direction});

            ws.send(JSON.stringify({ type : 'transportCreated',direction,params: {id : transport.id,iceCandidates : transport.iceCandidates,iceParameters : transport.iceParameters,dtlsParameters : transport.dtlsParameters}}));
            return;
        }else if(msg.type === "connectTransport"){
            console.log(msg.type);
            const roomId = (ws as any).roomId
            const room = rooms.get(roomId);

             if(!room){
                ws.send(JSON.stringify({ msg : "Room Not Found...!"}));
                return;
            } 
            const transportId = msg.transportId;
            const peerId = (ws as any).peerId;
            const peer = room.peers.get(peerId);
            const transports = peer?.transports; 
            
            if(!transports){
                throw new Error("Transports not found");
            }
            
            const entry = transports?.get(transportId);
            console.log("connectTrANSPORT ENTRY",entry);
            const transport = entry?.transport;
            await transport?.connect({ dtlsParameters : msg.dtlsParameters});
            ws.send(JSON.stringify({ type : "transportConnected",transportId : transport?.id}));
            return;
        }else if(msg.type === "produce"){
            console.log(msg.type);
            const roomId = (ws as any).roomId
            const room = rooms.get(roomId);
            
            if(!room){
                ws.send(JSON.stringify({ msg : "Room Not Found...!"}));
                return;
            } 
            
            const transportId = msg.transportId;
            const peerId = (ws as any).peerId;
            const peer = room.peers.get(peerId);
            if(!peer) return;

            const entry = peer.transports.get(transportId);

            const transports = peer.transports;
            transports?.forEach((element:any) => {
                    console.log("dewfewewf",element)
            });

            if(entry?.direction !== "send"){
                throw new Error("Cannot Produce on recv transport");
            }

            const transport = entry.transport;
            const producer = await transport.produce({
                kind : msg.kind,
                rtpParameters : msg.rtpParameters
            });

            peer?.producers.set(producer.id,producer);
            
            // new feat... setting producers with userId mapped to get producer without scanning O(n) loop..
            let userProducers = room.producersByUserId.get(peer?.userId);
            if(!userProducers){
                userProducers = new Map();
                room.producersByUserId.set(peer?.userId,userProducers);
            }
            userProducers.set(producer.id,producer);


            ws.send(JSON.stringify({ type : "produced",producerId : producer.id }));
            // Skip the sender and broadcast the 'newProducer' event to everyone else in the room.
            
            for(const[otherPeerId,otherPeer] of room.peers.entries()){
                if(otherPeerId === peerId) continue; // here we skip if otherPeerId is producer.

                otherPeer.socket.send(JSON.stringify({
                    type : "newProducer",
                    producerId : producer.id,
                    peerId  : peerId
                }));
            }
            return;
        }else if(msg.type === "consume"){
            const roomId = (ws as any).roomId
            const producerId = msg.producerId;
            console.log(msg.type,msg.wsId);
            const rtpCapabilities = msg.rtpCapabilities;
            const room = rooms.get(roomId);
            const peerId = (ws as any).peerId;
             if(!room){
                ws.send(JSON.stringify({ msg : "Room Not Found...!"}));
                return;
            } 
            const peer = room.peers.get(peerId);
            const routerConsume = room.router.canConsume({ producerId,rtpCapabilities});

            if(!routerConsume){
                ws.send(JSON.stringify({ msg : "Router cannot Consume"}));
                return;
            };

            const transportEntries = peer?.transports;
            if(!transportEntries){console.log("transport entries not found!")
                return;
            };

            let consumerTransport;

            for(const transportEntry of transportEntries.values()){
                if(transportEntry.direction === "recv"){
                    console.log("finalhere");
                    consumerTransport = transportEntry.transport;
                }
            }
            console.log('consumerTransport : ',consumerTransport);
            
            if(!consumerTransport){
                ws.send(JSON.stringify({ msg : "consumer transport not Found!"}));
                return;
            };

            const consumer = await consumerTransport.consume({producerId , rtpCapabilities,paused:true});

            peer.consumers.set(consumer.id,consumer);
            console.log('consumers list : ',peer.consumers);
            ws.send(JSON.stringify({ type : "consumerCreated",consumerParams : {id : consumer.id,producerId : consumer.producerId,kind : consumer.kind,rtpParameters : consumer.rtpParameters,transportId : consumerTransport.id}}));
            return;

        }else if(msg.type === "resumeConsumer"){
            const roomId = (ws as any).roomId
            console.log(msg.type,msg.wsId);
            const consumerId = msg.consumerId;
            const room = rooms.get(roomId);
            
            if(!room){
                ws.send(JSON.stringify({ msg : "Room Not Found...!"}));
                return;
            } 
            
            const peerId = (ws as any).peerId;
            const peer = room.peers.get(peerId);
            const consumer = peer?.consumers.get(consumerId);
            await consumer?.resume();
            await consumer?.requestKeyFrame();
            ws.send(JSON.stringify({ type : "consumerResumed",consumerId : consumer?.id}));
            return;
        }else if(msg.type === "joinRoomViewer"){
                // for obsviewer page section
            console.log("i am at join room viewer")
                // send router rtp capabilities...
                const room = rooms.get(msg.roomId);
                if(!room) return;
                const peerId = randomUUID();

                room.peers.set(peerId,{
                    userId : msg.userId,
                    socket : ws,
                    transports : new Map(),
                    producers : new Map(),
                    consumers : new Map(),
                    role : "participant",
                    name : "viewer."
                });

                (ws as any).roomId = msg.roomId;
                (ws as any).peerId = peerId;

                ws.send(JSON.stringify({
                    type : "rtpCapabilities",
                    rtp : room?.router.rtpCapabilities
                }))

        }else if(msg.type === "getProducer"){
            // get producer for current peers set by userId..
            // send back producerId... with 
            console.log("get producer called....")
            const roomId = (ws as any).roomId;
            const targetUserId = msg.userId;
            const room = rooms.get(roomId);

            if(!room) return;
            // getting producers from mapped userId with producer to prevent O(n) lookup entries to O(1)..
            const userProducers = room.producersByUserId.get(targetUserId);
            
            if(!userProducers || userProducers.size === 0){
                console.log("no producers found!..");
                return;
            }

            const producer = [...userProducers.values()][0];

            if(!producer){
                console.log("Producers not found!>>");
                return;
            } 
            
            ws.send(JSON.stringify({
                    type : "foundProducer",
                    producerId : producer.id
                }));
        }
    });

    ws.send(JSON.stringify({ msg : "success"}));
    ws.on('close',()=>{
        console.log("client disconnected..!");
        return;
    })
});


async function createWebRtcTransport(room : any){
    const announcedIp = getLocalIpAddress();
    const transport = await room.router.createWebRtcTransport({
        listenIps:[{ ip : '0.0.0.0',announcedIp : announcedIp}],
        enableTcp : true,
        enableUdp : true,
        preferUdp : true,
    });
    return transport;
};


function getLocalIpAddress(){
    const interfaces : any = os.networkInterfaces();  
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {

      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return '127.0.0.1';
}


function notifyHost(room : Room){
    const users = [];

    for(const [,peer] of room.peers){
        if(peer.role === "participant"){
            users.push({
                userId : peer.userId,
                name : peer.name,
            });
        }        
    }

    for(const [,peer] of room.peers){
        if(peer.role === "host"){
            peer.socket.send(JSON.stringify({ 
                type : "participantUpdated",
                users : users
            }))
        }
    }
}