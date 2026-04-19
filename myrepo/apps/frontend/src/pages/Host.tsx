import { useEffect, useState } from "react"
import { ws } from "../sockets/sockets";
import { client } from "../lib/client"
import { Video, Monitor, Radio, Users, Copy, Check, ArrowRight } from 'lucide-react';
import VideoGrid from "../components/VideoGrid";

export default function Host() {
    const [name, setName] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [userId, setUserId] = useState("");
    const [roomCreated, setRoomCreated] = useState(false);
    const [copied, setCopied] = useState(false);
    const [participants,setParticipants] = useState<any>();
    const [slots,setSlots] = useState([]);
    const [selectedSlots,setSelectedSlots] = useState<Record<string,string>>({});// key = userId, value = slotID

    const [remoteStreams,setRemoteStreams] = useState([]);
    const [localVideoStream,setLocalVideoStream] = useState(null);
    const [localScreenStream,setLocalScreenStream] = useState(null);

    
    useEffect(()=>{
        client.on("participantUpdated",(users : any)=>{
            console.log("participants",users);
            setParticipants(users);
            getSlots();
        })

        client.on("totalSlots",(totalSlots:any)=>{
            setSlots(totalSlots);
            
            console.log("ee",totalSlots);
            console.log("Total Slots",totalSlots);
        })

        client.on("remoteStreamAdded",(data:any)=>{
            setRemoteStreams((prev):any=>{
                const exists = prev.find((x:any)=>x.consumerId===data.consumerId);
                if(exists) return;
                return [...prev,data]
            })
        });

        client.on("localVideoStreamAdded",(data:any)=>{
            setLocalVideoStream(data.stream);
        });

        client.on("localScreenStreamAdded",(data:any)=>{
            setLocalScreenStream(data.stream);
        });

    },[])
    function handleCreateRoom() {
        if (!name || !roomNumber || !userId) {
            alert("Please fill in all fields");
            return;
        }
        ws.send(JSON.stringify({ type: "client-join", roomId: roomNumber,name : name, userId: userId ,userType : "host" }))
        setRoomCreated(true);
        console.log("Room created:", roomNumber);
    }

    function copyRoomId() {
        navigator.clipboard.writeText(roomNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function getSlots(){
        ws.send(JSON.stringify({ type : "getSlots"}));
    }

    function assignSlot(){

    }
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Radio className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">OBSBridge</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-gray-400">Host Mode</span>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {!roomCreated ? (
                    /* Create Room Form */
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
                                <Users className="w-4 h-4" />
                                Create a new streaming room
                            </div>
                            <h1 className="text-5xl font-bold mb-4">
                                Start Your
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Live Stream
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Set up your room and invite guests to join your stream
                            </p>
                        </div>

                        <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                                />
                            </div>

                            {/* Room Number Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Room Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a unique room number"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    This will be shared with your guests to join the room
                                </p>
                            </div>

                            {/* User ID Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your user ID"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                                />
                            </div>

                            {/* Create Room Button */}
                            <button
                                onClick={handleCreateRoom}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all group"
                            >
                                <Users className="w-5 h-5" />
                                Create Room
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Info Box */}
                        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">What happens next?</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Share the room number with your guests</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Start sharing your screen or video</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Add guest streams to OBS as Browser Sources</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    /* Room Created - Controls */
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                Room Active
                            </div>
                            <h1 className="text-5xl font-bold mb-4">
                                Welcome,
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {name}!
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Your streaming room is ready. Share the room ID with your guests.
                            </p>
                        </div>

                        <div className="space-y-4 mt-8">
                            <h2 className="text-2xl font-bold">Live Meeting Grid</h2>    

    <VideoGrid
      remoteStreams={remoteStreams}
      localVideoStream={localVideoStream}
      localScreenStream={localScreenStream}
   />
</div>

                        {/* Room Info Card */}
                        <div className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Room Number</p>
                                    <p className="text-3xl font-bold font-mono">{roomNumber}</p>
                                </div>
                                <button
                                    onClick={copyRoomId}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-400" />
                                            <span className="text-green-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Host Name</p>
                                    <p className="text-sm font-semibold">{name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                                    <p className="text-sm font-mono">{userId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stream Controls */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Stream Controls</h2>
                            <p className="text-gray-400">Start sharing your screen or video with guests</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Share Screen */}
                                <button
                                    onClick={() => client.shareScreen()}
                                    className="group p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all text-left"
                                >
                                    <div className="w-12 h-12 mb-4 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition">
                                        <Monitor className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Share Screen</h3>
                                    <p className="text-sm text-gray-400">
                                        Share your entire screen or specific window with guests
                                    </p>
                                </button>

                                {/* Share Video */}
                                <button
                                    onClick={() => client.shareVideo()}
                                    className="group p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all text-left"
                                >
                                    <div className="w-12 h-12 mb-4 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition">
                                        <Video className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Share Video</h3>
                                    <p className="text-sm text-gray-400">
                                        Share your camera feed with all guests in the room
                                    </p>
                                </button>
                            </div>
                        </div>
                                    <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">Participants</h2>

    <div className="space-y-2">
        {participants?.map((p:any) => (
            <div key={p.userId} className="p-3 bg-gray-800 rounded">
                <div className="flex justify-between">
                    <span>{p.name}</span>
                     <span className="text-sm text-gray-400">
                        {p.userId}
                    </span>
                    <span className="text-sm text-gray-400">
                        {p.hasVideo ? "🎥 Live" : "Idle"}
                    </span>
                    <span className="text-xs text-green-400">
                        {selectedSlots[p.userId]?`${window.location.origin}/obsviewer/${roomNumber}/${selectedSlots[p.userId]}`:"no slot assigned"}
                    </span>

                    <select value={selectedSlots[p.userId] || ""}
                        onChange={(e)=>{
                            const slotId = e.target.value;

                            setSelectedSlots((prev)=>({
                                ...prev,
                                [p.userId]:slotId
                            }))
                        }}
                    >
                    {slots.map((slot:any)=>(
                        <option key={slot.slotId} value={slot.slotId}>
                            {slot.slotId}
                        </option>
                    ))}
                    </select>

                    <button
                    onClick={()=>{
                        const slotId = selectedSlots[p.userId];
                        if(!slotId){
                            alert("Select Slot first!");
                            return;
                        }

                        const url =`${window.location.origin}/obsviewer/${roomNumber}/${slotId}`;
                        console.log("getne",url);
                        ws.send(JSON.stringify({
                            type : "assignSlot",
                            slotId : slotId,
                            roomId : roomNumber,
                            userId : p.userId
                        }))
                    }}>Assign Slot</button>
                </div>
            </div>
        ))}
    </div>
</div>
                        {/* Next Steps */}
                        <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Radio className="w-5 h-5 text-blue-400" />
                                Add to OBS
                            </h3>
                            <ol className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                        1
                                    </span>
                                    <span>Open OBS Studio and select your scene</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                        2
                                    </span>
                                    <span>Add a new Browser Source for each guest stream</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                        3
                                    </span>
                                    <span>Position and style the feeds as needed</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                        4
                                    </span>
                                    <span>Start streaming to YouTube, Twitch, or your platform</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
