import { createContext } from "react";
import { Socket } from "socket.io-client";
 
type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isLoading: boolean;
  evaluationResult?: {
    evaluationResult:{
      output: string;
      status: string;
    },
    userId: string;
    submissionId: string;
  }
};
 
export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isLoading: true,
});