import { useState, useEffect, useCallback } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import { Socket } from "socket.io-client";

const GetQueueList = () => {
  const [queueData, setQueueData] = useState<Record<string, unknown>[]>();
  const currentQueue: any = useWebSocket(
    "http://localhost:5001",
    (data: Record<string, unknown>[]) => {
      if (data != null) {
        setQueueData(data);
      }
    },
  );

  const waitTime = useCallback(async () => {
    if (currentQueue != null) {
      await currentQueue.emit("custom_event_def");
    }
  }, [currentQueue]);

  useEffect(() => {
    const interval = setInterval(() => {
      waitTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [waitTime]);

  return queueData;
};

export default GetQueueList;
