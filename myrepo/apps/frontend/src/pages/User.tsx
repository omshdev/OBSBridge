import { useState } from "react";
import { ws } from "../sockets/sockets";
import { Radio, Users, ArrowRight, Video, Mic, Check } from 'lucide-react';

export default function User() {
    const [roomId, setRoomId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [joined, setJoined] = useState<boolean>(false);

    function handleJoinRoom() {
        if (!roomId || !name || !userId) {
            alert("Please fill in all fields");
            return;
        }
        ws.send(JSON.stringify({ type: "client-join", roomId: roomId, name : name,userId: userId,userType : "participant" }))
        setJoined(true);
        console.log("Joined room:", roomId);
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">OBSBridge</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                        <span className="text-gray-400">Guest Mode</span>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {!joined ? (
                    /* Join Room Form */
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
                                <Video className="w-4 h-4" />
                                Join as a guest
                            </div>
                            <h1 className="text-5xl font-bold mb-4">
                                Join a
                                <br />
                                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                    Live Stream
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                Enter the room details shared by your host to join
                            </p>
                        </div>

                        <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl space-y-6">
                            {/* Room ID Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Room Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the room number from your host"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition font-mono text-lg"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    The host will share this number with you
                                </p>
                            </div>

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
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    This will be visible to the host and other guests
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
                                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
                                />
                            </div>

                            {/* Join Room Button */}
                            <button
                                onClick={handleJoinRoom}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all group"
                            >
                                <Users className="w-5 h-5" />
                                Join Room
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <div className="w-10 h-10 mb-4 bg-green-500/10 rounded-lg flex items-center justify-center">
                                    <Video className="w-5 h-5 text-green-400" />
                                </div>
                                <h3 className="font-semibold mb-2">Camera Ready</h3>
                                <p className="text-sm text-gray-400">
                                    Your browser will ask for camera and microphone permissions after joining
                                </p>
                            </div>

                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <div className="w-10 h-10 mb-4 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <Mic className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="font-semibold mb-2">No Downloads</h3>
                                <p className="text-sm text-gray-400">
                                    Join directly from your browser. No apps or plugins required
                                </p>
                            </div>
                        </div>

                        {/* Requirements Box */}
                        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">Before you join</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Make sure you have a working camera and microphone</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Use a modern browser (Chrome, Firefox, or Edge recommended)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Ensure stable internet connection for best quality</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    /* Joined Successfully */
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                Connected
                            </div>
                            <h1 className="text-5xl font-bold mb-4">
                                Welcome,
                                <br />
                                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                    {name}!
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                You've successfully joined the room. Your stream is now live.
                            </p>
                        </div>

                        {/* Connection Info Card */}
                        <div className="p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <Check className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Connected to Room</h3>
                                    <p className="text-gray-400">Room #{roomId}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Your Name</p>
                                    <p className="text-sm font-semibold">{name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                                    <p className="text-sm font-mono">{userId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stream Status */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <Video className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Camera</h3>
                                            <p className="text-xs text-gray-500">Active</p>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Your camera is streaming to the host
                                </p>
                            </div>

                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                            <Mic className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Microphone</h3>
                                            <p className="text-xs text-gray-500">Active</p>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Your audio is streaming to the host
                                </p>
                            </div>
                        </div>

                        {/* Guest Instructions */}
                        <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Radio className="w-5 h-5 text-green-400" />
                                What's Happening
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">
                                        1
                                    </span>
                                    <span>Your video and audio are being streamed to the host via WebRTC</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">
                                        2
                                    </span>
                                    <span>The host can add your stream to OBS as a Browser Source</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">
                                        3
                                    </span>
                                    <span>You'll appear on the final stream that goes to YouTube, Twitch, etc.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Tips */}
                        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Keep your camera at eye level for the best angle</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Make sure you have good lighting - face a window or use a lamp</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Use headphones to prevent echo and feedback</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                                    <span>Stay close to your router for the most stable connection</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}