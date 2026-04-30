import { type FC } from "react";
import useWebSocket from "react-use-websocket";

export const App: FC = () => {
  const { lastMessage, sendMessage } = useWebSocket.default(
    `ws://127.0.0.1:8000/ws`,
  );

  const volume = lastMessage?.data ? Number(lastMessage.data) : null;

  const handleVolumeChange = (newVolume: number) => {
    sendMessage(Math.max(0, Math.min(100, newVolume)));
  };

  return volume !== null ? (
    <>
      <div>
        <div>
          Volume is at <span>{volume}</span>
        </div>
        <div>
          <button onClick={() => handleVolumeChange(Math.max(0, volume - 10))}>
            -
          </button>
          <button
            onClick={() => handleVolumeChange(Math.min(100, volume + 10))}
          >
            +
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
        />
      </div>
    </>
  ) : (
    <>Erro ao conectar</>
  );
};
