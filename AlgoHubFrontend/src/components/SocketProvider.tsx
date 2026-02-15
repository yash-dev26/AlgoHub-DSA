import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SocketContext } from "../context/SocketContext";
 
const ioServerUrl = import.meta.env.VITE_SOCKET_SERVICE_URL || "http://localhost:3000";
 
function createSocketConnection() {
  return io(ioServerUrl, {
    autoConnect: false,
  });
}
 
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluationResult, setevaluationResult] = useState(null);
 
  useEffect(() => {
    const newSocket = createSocketConnection();
 
    function handleConnect() {
      console.log("Socket connected", newSocket.id);
      // Send the user ID right after connecting
      newSocket.emit('setUserId', '1'); // we will replace '1' with actual user ID from auth later
      setSocket(newSocket);
      setIsConnected(true);
      setIsLoading(false);
    }
 
    function handleDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
    }
 
    function handleConnectError(error: Error) {
      console.error("Socket connection error", error);
      setIsLoading(false);
    }

    // Listen for data from backend
    newSocket.on('newData', (data) => {
      console.log("Full data:", data);
      console.log("Output:", data.evaluationResult.output);
      console.log("Status:", data.evaluationResult.status);
      console.log("User ID:", data.userId);
      console.log("Submission ID:", data.submissionId);

      setevaluationResult(data.evaluationResult);
    });
 
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("connect_error", handleConnectError);
 
    newSocket.connect();
 
    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("connect_error", handleConnectError);
      newSocket.disconnect();
    };
  }, []);
 
  return (
    <SocketContext.Provider value={{ socket, isConnected, isLoading, evaluationResult }}>
      {children}
    </SocketContext.Provider>
  );
}