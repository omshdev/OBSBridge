import { Device } from "mediasoup-client";

export class MediasoupClient{
    socket : WebSocket
    device : Device | null = null; 

    sendTransport : any = null;
    recvTransport : any = null;

    producerCallback : any = null;
    connectCallback : any = null;

    recvConnectCallback : any = null
    
    producers = new Map();
    consumers = new Map();

    constructor(socket : WebSocket,private mode: "participant" | "viewer" = "participant",private targetUserId?: string){
        this.socket = socket;
        socket.addEventListener("message",this.handleMessage)
    }

    handleMessage = async(event : MessageEvent) =>{
        const msg = JSON.parse(event.data);

        switch(msg.type){
            case  "rtpCapabilities":
                await this.loadDevice(msg.rtp);
                break
            
            case "transportCreated":
                await this.createTransport(msg);
                break
            
            case "transportConnected":
                if(msg.transportId === this.sendTransport?.id){
                        this.connectCallback?.()
                }
                if(msg.transportId === this.recvTransport?.id){
                    this.recvConnectCallback?.()
                }
    
                break
            
            case "produced":
                // msg.callback?.({ id : msg.producerId})
                this.producerCallback?.({ id: msg.producerId })
                break
            
            case "existingProducers":
                
                if(!this.recvTransport){
                    setTimeout(()=>this.handleMessage(event), 100)
                    return
                }
                for(const p of msg.producers){
                    await this.consume(p.producerId)
                }
                break
            
            case "newProducer":
                await this.consume(msg.producerId);
                break

            case "consumerCreated":
                await this.createConsumer(msg.consumerParams)
                break

            case "foundProducer":
                await this.consume(msg.producerId);
                break;
        }
    }


    async loadDevice(routerRtpCapabilities:any){
        this.device = new Device();
        await this.device.load({routerRtpCapabilities});
        
        if(this.mode === "participant"){
            this.socket.send(JSON.stringify({ 
            type : "createWebRtcTransport",
            direction : "send",
            }));
        }
        
        this.socket.send(JSON.stringify({
            type : "createWebRtcTransport",
            direction : "recv",
        }));
    }

    async createTransport(msg : any){
        if(msg.direction === "send"){
            this.sendTransport = this.device!.createSendTransport(msg.params);
            
            this.sendTransport.on("connect",({dtlsParameters}:any,callback:any)=>{
                
                this.connectCallback = callback;

                this.socket.send(JSON.stringify({
                type : "connectTransport",
                 transportId:this.sendTransport.id,
                dtlsParameters
                }));
                
            })
            
            this.sendTransport.on("produce",({kind,rtpParameters}:any,callback:any)=>{
                this.socket.send(JSON.stringify({
                    type : "produce",
                    transportId : this.sendTransport.id,
                    kind,
                    rtpParameters
                }));
                this.producerCallback = callback;
            })
        }else{
            this.recvTransport = this.device!.createRecvTransport(msg.params);
            console.log("i am here viewer....")
            console.log("i below part running......")
            this.recvTransport.on("connect",({dtlsParameters}:any,callback:any)=>{
                console.log("inside below part running......")
                this.socket.send(JSON.stringify({
                    type : "connectTransport",
                    transportId : this.recvTransport.id,
                    dtlsParameters
                }));
                console.log("set callback......")
                this.recvConnectCallback = callback;
                console.log("out......")
            });

    if (this.mode === "viewer" && this.targetUserId) {
        console.log("Requesting producer for", this.targetUserId);

        this.socket.send(JSON.stringify({
            type: "getProducer",
            userId: this.targetUserId
        }));
    }
        };   
    }

    async shareScreen(){
        if(!this.sendTransport){
    console.log("Send transport not ready yet")
    return
  }
        const stream = await navigator.mediaDevices.getDisplayMedia({ video : true});
        const track = stream.getVideoTracks()[0];
        const producer = await this.sendTransport.produce({track});
        this.producers.set(producer.id,producer);
    }

    async consume(producerId : string){
        this.socket.send(JSON.stringify({
            type : "consume",
            producerId,
            rtpCapabilities:this.device!.rtpCapabilities
        }));
    }

    async createConsumer(params:any){
        const consumer = await this.recvTransport.consume(params);

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true
        video.muted = true
        
        document.body.appendChild(video);
        this.consumers.set(consumer.id,consumer);

        this.socket.send(JSON.stringify({
            type : "resumeConsumer",
            consumerId : consumer.id
        }))
    }
}