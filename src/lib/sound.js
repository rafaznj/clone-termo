const createSound = (src, volume = 1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  return () => {
    audio.currentTime = 0;
    audio.play();
  };
};

export const win = createSound("/sounds/win.wav", 0.7);
export const lose = createSound("/sounds/lose.wav", 0.7);
export const wrong = createSound("/sounds/wrong.wav", 0.5);
export const skip = createSound("/sounds/skip.wav", 0.2);
export const enter = createSound("/sounds/enter.wav", 0.3);
