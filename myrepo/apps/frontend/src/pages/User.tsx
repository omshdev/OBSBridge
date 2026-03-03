import { useState } from "react";
import { ws } from "../sockets/sockets";
import { useNavigate } from "react-router-dom";

export default function User(){
    const [roomId,setRoomId] = useState<string>('');
    const [name,setName] = useState<string>('');
    const [userId,setUserId] = useState<string>('');
    const navigate = useNavigate();

    function handleJoinRoom(){
        ws.send(JSON.stringify({type : "client-join" , roomId : roomId,userId:userId}))
        alert(`Room Joined! for Room Number ${roomId} with Name : ${name}`);
        navigate('/userDashboard',{state : {wsId:roomId,userId:userId }});
    }
    return <div> 
        <h1>Enter RoomId</h1>
        <br />
        <input type="text" onChange={(e)=>{setRoomId(e.target.value)}} />
        <br />
        <h1>Enter UserId</h1>
        <br />
        <input type="text" placeholder="Enter UserId" onChange={(e)=>{
            setUserId(e.target.value)
        }}/>
        <h1>Enter Name</h1>
        <br />
        <input type="text" onChange={(e)=>{setName(e.target.value)}} />
        <br />
        <button onClick={handleJoinRoom}>Join Room</button>
    </div>
}