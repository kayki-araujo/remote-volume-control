import { useState } from "react";
import useWebSocket from "react-use-websocket";

const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const WS_URL = `${wsProtocol}//${window.location.host}/ws`;

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
