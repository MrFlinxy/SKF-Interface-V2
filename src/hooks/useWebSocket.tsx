"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

/**
 * On mount, connect to the socket.io server
 * @param {*} url
 * @param {*} handleData
 * @returns
 */
const useWebSocket = (
  url: string,
  handleData: (e: Record<string, unknown>[]) => void,
) => {
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {
    const socketClient = io(url);

    socketClient.on("connect", () => {
      console.log("Connected to server - Next");
    });

    socketClient.on("disconnect", () => {
      console.log("Disconnected from server - Next");
    });

    socketClient.on("data", (data) => {
      handleData(data);
    });

    socketClient.on("custom_event_def", (data) => {
      handleData(data);
    });

    setSocket(socketClient);

    return () => {
      socketClient.close();
    };
  }, [handleData, url]);

  return socket;
};

export default useWebSocket;
