export default function VideoGrid({
  remoteStreams,
  localVideoStream,
  localScreenStream
}: any) {
  const allStreams = [];

  if (localVideoStream) {
    allStreams.push({
      id: "local-camera",
      stream: localVideoStream,
      label: "You"
    });
  }

  if (localScreenStream) {
    allStreams.push({
      id: "local-screen",
      stream: localScreenStream,
      label: "Screen Share"
    });
  }

  remoteStreams?.forEach((item: any) => {
    allStreams.push({
      id: item.consumerId,
      stream: item.stream,
      label: "Guest"
    });
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {allStreams.map((item) => (
        <div
          key={item.id}
          className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
        >
          <video
            ref={(el) => {
              if (el && el.srcObject !== item.stream) {
                el.srcObject = item.stream;
              }
            }}
            autoPlay
            playsInline
            muted={item.id === "local-camera" || item.id === "local-screen"}
            className="w-full h-64 object-cover bg-black"
          />

          <div className="p-3 text-sm text-gray-300">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}