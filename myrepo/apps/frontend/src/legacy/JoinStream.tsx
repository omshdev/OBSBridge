import { useEffect, useState ,useRef} from "react";
import { ws as socket } from "../sockets/sockets";
import { Device } from "mediasoup-client";

let device : any;
let consumerTransport:any;
let consumerTransportPendingCallback:any;


// queue stuff
let pendingProducers : any = new Set();
let deviceLoaded = false;
// let transportReady = false; 

export default function JoinStream({wsId,userId}:string|any){
    console.log("hey hey",wsId);
    console.log("heyhey",userId)
    const [consumers,setConsumers] = useState({});
    const videoRef = useRef<any>(null);
    useEffect(()=>{
        console.log('use effect ran');
        socket.onmessage = async (event) =>{
            const msg = JSON.parse(event.data);
            console.log('socket rant');
            console.log(msg.type);
            if(msg.type === "rtpCapabilities"){
                if(!device) device = new Device();
                await device.load({routerRtpCapabilities : msg.rtp});
                deviceLoaded = true;
                console.log("deviceLoaded",deviceLoaded)
                console.log("router rtpcapabilties loaded.....")
                socket.send(JSON.stringify({ type : "createWebRtcTransport",wsId : wsId,direction : "recv",}))
            }else if(msg.type === "transport"){
                if(device){
                    consumerTransport = await device.createRecvTransport(msg.peerTransport)
                    console.log("consumer transport createad....");
                    console.log("consumer transport createad....");
                 
                    consumerTransport.on("connect",({dtlsParameters}:any,callback:any)=>{
                        console.log('listenr event triggered');
                        socket.send(JSON.stringify({ type : 'connectTransport',wsId : wsId,transportId:consumerTransport.id,dtlsParameters : dtlsParameters,}));
                        consumerTransportPendingCallback = callback;
                    });


                    pendingProducers.forEach((id:any)=>{
            requestConsume(id);
        });
        pendingProducers.clear();
                }
            }else if(msg.type === 'transportConnected'){
                consumerTransportPendingCallback();
                console.log("transport connected..!");
            }else if(msg.type === "newProducer"){
                console.log("new producer triggerde");
                socket.send(JSON.stringify({ type : "consume",wsId : wsId,producerId : msg.producerId,rtpCapabilities : device.rtpCapabilities}));
            }else if(msg.type === "existingProducers"){
                console.log(" i am at existingProducers....");
                const p = msg.producers;
                console.log(p);
                p.forEach((prod:any)=>{
                    requestConsume(prod.producerId);
                })
            }else if(msg.type === "consumerCreated"){
                const consumer = await consumerTransport.consume(msg.consumerParams);
                console.log('consumer created..!');
                const track = consumer.track;
                const stream = new MediaStream([track]);
                setConsumers(prev=>({
                    ...prev,
                    [msg.consumerParams.producerId] : {consumer,stream}
                }));
                   console.log(stream);
            console.log("track",track);
            socket.send(JSON.stringify({ type : "resumeConsumer",wsId:wsId,consumerId:consumer.id}));
            console.log("message sent");

            }else if(msg.type === "consumerResumed"){
                if(videoRef.current){
                    try{
                        await videoRef.current.play();
                        console.log("play() success");
                    }catch(error){
                    console.log("play() failed",error);
                    }
                }
            }
        }
    },[wsId])
    function handleJoinStream(){
        socket?.send(JSON.stringify({ type : "client-join",roomId:wsId,userId:userId}));
    }
    // function flushPending(){
    //     pendingProducers.forEach((id:any)=>requestConsume(id));
    //     pendingProducers.clear();
    // }
    function requestConsume(producerId : any){
if(!deviceLoaded || !consumerTransport){
                pendingProducers.add(producerId);
                console.log(" i am adding producers",pendingProducers);
                console.log("added");
                return;
            }
            socket.send(JSON.stringify({ 
                type : "consume",
                wsId : wsId,
                producerId,
                rtpCapabilities : device.rtpCapabilities
            }));
            console.log("message sent ommmya");
    }
    return <div>
        <button onClick={handleJoinStream}>Join Stream</button>
        <br />

         <h1>video ;;;</h1>
            {/* <video ref={videoRef} muted autoPlay playsInline></video> */}
            {/* <video ref={videoRef} autoPlay playsInline muted style={{ width: "600px", border: "1px solid red" }} /> */}

            <div className="grid">
                {Object.entries(consumers).map(([producerId,data]:any)=>{
                    console.log("finally",producerId,data);
                    return <Videotile key={producerId} stream={data.stream}/>
                    
                })}
    </div>
    </div>
    
}

function Videotile({stream}:any){
    const ref = useRef<any>(null);

    useEffect(()=>{
        if(ref.current && !ref.current.srcObject){
            ref.current.srcObject = stream;
        }
    },[stream])

    return(
        <video ref={ref} autoPlay playsInline muted  style={{ width: "100%", border: "1px solid #444" }}></video>
    )
}