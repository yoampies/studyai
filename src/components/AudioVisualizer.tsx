import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  file: File;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!file || !canvasRef.current || !audioRef.current) return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }

    const audioCtx = audioContextRef.current;
    const audioEl = audioRef.current;

    if (!sourceRef.current) {
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      const source = audioCtx.createMediaElementSource(audioEl);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      sourceRef.current = source;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      const draw = () => {
        animationIdRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          ctx.fillStyle = '#607afb'; // Color corporativo StudyAI
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      draw();
    }

    const url = URL.createObjectURL(file);
    audioEl.src = url;

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (!audioRef.current || !audioContextRef.current) return;
    if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (audioRef.current) audioRef.current.currentTime += seconds;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-[#dedce5] w-full max-w-2xl shadow-sm font-inter">
      <h3 className="text-xs font-bold text-[#6e6388] uppercase tracking-widest mb-6 px-4">
        Audio Analysis Player
      </h3>

      <canvas ref={canvasRef} width={600} height={120} className="w-full h-24 mb-8 rounded-lg" />

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="w-full flex flex-col gap-2 mb-8 px-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-[#f1f0f4] rounded-lg appearance-none cursor-pointer accent-[#607afb]"
        />
        <div className="flex justify-between text-[12px] font-medium text-[#6e6388]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={() => skip(-10)}
          className="p-3 text-[#131118] bg-[#f1f0f4] hover:bg-[#e2e1e9] rounded-full transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a96,96,0,0,1-94.71,96H128a95.38,95.38,0,0,1-67.88-28.12,8,8,0,0,1,11.31-11.31A80,80,0,1,0,128,48a79.44,79.44,0,0,0-56.57,23.43L60.69,82.14,74.34,95.79A8,8,0,0,1,68.69,109.45L21.34,103.79a8,8,0,0,1-7.13-7.13L20,49.31a8,8,0,0,1,13.66-5.66l14.88,14.88A96,96,0,0,1,224,128Z"></path>
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="flex size-16 items-center justify-center rounded-full bg-[#607afb] text-white hover:bg-[#4a63e0] transition-transform active:scale-95 shadow-md"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="bold"
              viewBox="0 0 256 256"
            >
              <path d="M200,48V208a8,8,0,0,1-16,0V48a8,8,0,0,1,16,0Zm-128,0V208a8,8,0,0,1-16,0V48a8,8,0,0,1,16,0Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="bold"
              viewBox="0 0 256 256"
              className="ml-1"
            >
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.75a16,16,0,0,1-24.32-13.75V40a16,16,0,0,1,24.32-13.75L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
            </svg>
          )}
        </button>

        <button
          onClick={() => skip(10)}
          className="p-3 text-[#131118] bg-[#f1f0f4] hover:bg-[#e2e1e9] rounded-full transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M241.79,96.66l-47.35,5.66a8,8,0,0,1-8.91-8.91l5.66-47.35a8,8,0,0,1,13.66-5.66l14.88,14.88A96,96,0,1,0,128,224h.71A96,96,0,0,0,224,128a8,8,0,0,1,16,0,112,112,0,0,1-111.29,112H128A112,112,0,1,1,207.17,44.83l14.88,14.88A8,8,0,0,1,241.79,96.66Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioVisualizer;
