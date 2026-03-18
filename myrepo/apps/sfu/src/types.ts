import type { Router,Transport,Consumer,Producer } from "mediasoup/types";
import type { WebSocket } from "ws";

export type Peer = {
    socket : WebSocket;
    userId : string;
    transports : Map<string,{transport : Transport,direction : string}>
    producers : Map<string,Producer>
    consumers : Map<string,Consumer>
};

export type Room = {
    roomId : string;
    router : Router;
    peers : Map<string,Peer>
    // userId → (producerId → Producer)
    producersByUserId : Map<string,Map<string,Producer>>
};