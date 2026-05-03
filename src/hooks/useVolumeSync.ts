import { useState } from "react";
import useWebSocketImport from "react-use-websocket";

const useWebSocket =
  (useWebSocketImport as { default?: typeof useWebSocketImport }).default ??
  useWebSocketImport;

const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const WS_URL = `${wsProtocol}//${window.location.host}/ws`;

export function useVolumeSync() {
  const [volume, setVolumeLocally] = useState<number | null>(null);

  const { sendMessage, readyState } = useWebSocket(WS_URL, {
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
