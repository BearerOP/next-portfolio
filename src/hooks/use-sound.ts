// utils/useSound.ts
import { useRef } from "react";

const useSound = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((e) => console.log("Sound error:", e));
  };

  return play;
};

export default useSound;
