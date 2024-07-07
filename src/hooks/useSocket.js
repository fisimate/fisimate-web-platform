import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket(serverUrl) {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    newSocket.on("response", (data) => {
      setResponse(data);
    });

    newSocket.on("error", (err) => {
      setError(err);
    });

    return () => newSocket.close();
  }, [serverUrl]);

  const emitEvent = useCallback(
    (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket]
  );

  return { socket, response, error, emitEvent };
}
