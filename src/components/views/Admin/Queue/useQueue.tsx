import { useState, useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

const getQueueList = () => {
  const [queueData, setQueueData] = useState("");
  const currentQueue: any = useWebSocket(
    "http://localhost:5001",
    (data: any) => {
      setQueueData(data);
    },
  );

  const waitTime = async () => {
    if (currentQueue != null) {
      await currentQueue.emit("custom_event_def");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      waitTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [waitTime]);

  return queueData;
};

export default getQueueList;
