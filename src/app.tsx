import { useVolumeSync } from "./hooks/useVolumeSync";

const STEP = 10;

export default function App() {
  const { volume, setVolume } = useVolumeSync();

  if (volume === null) {
    return (
      <main className="h-screen w-screen bg-zinc-950 flex items-center justify-center">
        <p className="font-mono text-zinc-600 text-sm tracking-[0.3em] uppercase animate-pulse">
          connecting…
        </p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen bg-zinc-950 text-amber-400 font-mono select-none overflow-hidden">
      <LandscapeLayout volume={volume} setVolume={setVolume} />
      <PortraitLayout volume={volume} setVolume={setVolume} />
    </main>
  );
}

function LandscapeLayout({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (v: number) => void;
}) {
  return (
    <div className="hidden landscape:flex flex-col items-center justify-center h-full w-full px-10 gap-8 max-w-2xl mx-auto">
      <VolumeReadout volume={volume} />

      <div className="flex w-full gap-4">
        <VolumeButton label="−" onClick={() => setVolume(volume - STEP)} />
        <VolumeButton label="+" onClick={() => setVolume(volume + STEP)} />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full h-1 accent-amber-400 cursor-pointer rounded-full"
      />
    </div>
  );
}

function PortraitLayout({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (v: number) => void;
}) {
  return (
    <div className="flex landscape:hidden flex-col h-full w-full px-8 py-10 gap-6">
      <VolumeReadout volume={volume} />

      <div className="flex flex-1 gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <VolumeButton label="+" onClick={() => setVolume(volume + STEP)} />
          <VolumeButton label="−" onClick={() => setVolume(volume - STEP)} />
        </div>

        <div className="w-12 flex items-stretch">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="accent-amber-400 cursor-pointer"
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function VolumeReadout({ volume }: { volume: number }) {
  return (
    <div className="flex items-end gap-1 leading-none">
      <span className="text-8xl font-bold tabular-nums tracking-tighter">
        {volume}
      </span>
      <span className="text-3xl text-zinc-600 pb-2">%</span>
    </div>
  );
}

function VolumeButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center text-5xl font-bold
                 border border-zinc-800 rounded-xl
                 hover:border-amber-400/50 hover:bg-amber-400/5
                 active:scale-95 active:bg-amber-400/10
                 transition-all duration-100 cursor-pointer"
    >
      {label}
    </button>
  );
}
