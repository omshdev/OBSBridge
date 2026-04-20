// import { MediasoupClient } from "../lib/mediasoupClient";
// import { useParams } from "react-router-dom";

// export default function ObsViewer(){
//     const socket = new WebSocket("ws://localhost:8080");
//     const { slotId,roomId } = useParams();
    
//     const client = new MediasoupClient(
//         socket,
//         "viewer",
//         slotId
//     );

//     socket.onopen = () =>{
//         socket.send(JSON.stringify({
//             type : "joinRoomViewer",
//             roomId : roomId,
//             slotId : slotId
//         }))
//     }
//     return <></>
// }

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MediasoupClient } from "../lib/mediasoupClient";

export default function ObsViewer() {
  const { slotId, roomId } = useParams();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    const client = new MediasoupClient(
      socket,
      "viewer",
      slotId
    );

    client.on("remoteStreamAdded", ({ stream }: any) => {
      setStream(stream);
    });

    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "joinRoomViewer",
        roomId,
        slotId
      }));
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(console.log);
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ width: "100%", height: "100%" }}
    />
  );
}