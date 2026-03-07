import { useState } from "react"
import { ws } from "../sockets/sockets";
import {client} from "../lib/client"

export default function Host(){
    const [name,setName] = useState("");
    const [roomNumber,setRoomNumber] = useState("");
    const [userId,setUserId] = useState("");

    function handleCreateRoom(){
        alert(`Room Created! for Room Number ${roomNumber} with Name : ${name}`);
        ws.send(JSON.stringify({ type : "client-join" , roomId : roomNumber,userId:userId}))
        console.log("message sent");
        console.log(roomNumber);

    }
    return <div>
        This is a Host Page..
        
        <h1>Enter Name</h1>
        
        <input type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} />
        <br />

        <h1>Enter Room Number</h1>
        <input type="text" placeholder="Enter Room Number" onChange={(e)=>{setRoomNumber(e.target.value)}}/>
        <br />
        <h1>Enter User Id</h1>
        <input type="text" placeholder="Enter User Id " onChange={(e)=>{setUserId(e.target.value)}}/>
        <br />
        
        <button onClick={handleCreateRoom}>Create Room</button>
        <button onClick={()=>client.shareScreen()}>share screen</button>
    </div>
}