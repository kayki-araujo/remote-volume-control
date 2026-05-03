import { useState } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:8000/ws";

export function useVolumeSync() {
  const [volume, setVolumeLocally] = useState<number | null>(null);

  const { sendMessage, readyState } = useWebSocket.default(WS_URL, {
    onMessage: (event) => {
      const incoming = Number(event.data);
      if (!isNaN(incoming)) setVolumeLocally(incoming);
    },
  });

  const setVolume = (value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    setVolumeLocally(clamped);
    sendMessage(String(clamped));
  };

  return { volume, setVolume, readyState };
}
