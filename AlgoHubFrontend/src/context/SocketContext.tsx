import { createContext } from "react";
import { Socket } from "socket.io-client";

type EvaluationCaseResult = {
  output: string;
  status: string;
  testCaseIndex: number;
};

export type EvaluationResult = {
  results?: EvaluationCaseResult[];
  output?: string;
  status?: string;
  userId: string;
  submissionId: string;
};
 
type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isLoading: boolean;
  evaluationResult?: EvaluationResult;
};
 
export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isLoading: true,
});