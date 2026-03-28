import type { Router,Transport,Consumer,Producer } from "mediasoup/types";
import type { WebSocket } from "ws";

export type Peer = {
    name : string;
    socket : WebSocket;
    userId : string;
    transports : Map<string,{transport : Transport,direction : string}>
    producers : Map<string,Producer>
    consumers : Map<string,Consumer>
    role : "host" | "participant" ;    
};

export type Room = {
    roomId : string;
    router : Router;
    peers : Map<string,Peer>
    slots : Map<string,Slot>
    // userId → (producerId → Producer)
    producersByUserId : Map<string,Map<string,Producer>>
};

export type Slot = {
    slotId : string;
    producerId : string | null;
    userId : string | null;
}
