import { MediasoupClient } from "../lib/mediasoupClient";
import { useParams } from "react-router-dom";

export default function ObsViewer(){
    const socket = new WebSocket("ws://localhost:8080");
    const { userId,roomId } = useParams();
    
    const client = new MediasoupClient(
        socket,
        "viewer",
        userId
    );

    socket.onopen = () =>{
        socket.send(JSON.stringify({
            type : "joinRoomViewer",
            roomId : roomId,
            userId : userId
        }))
    }
    return <></>
}