export const ROWS = 6;
export const COLUMNS = 5;

export const KEYS_ROW_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
export const KEYS_ROW_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
export const KEYS_ROW_3 = ["Z", "X", "C", "V", "B", "N", "M"];
export const TILE_BASE =
  "w-14 h-14 rounded-lg flex items-center justify-center text-3xl";

export const TILE_STATE = {
  correct: "bg-tiles-correct text-white cursor-pointer",
  displaced: "bg-tiles-displaced text-white cursor-pointer",
  wrong: "bg-tiles-wrong text-white cursor-pointer",
  typing:
    "bg-transparent border-3 border-tiles-background text-white cursor-pointer",
  disabled: "bg-tiles-disabled text-white cursor-not-allowed",
  selected:
    "bg-transparent border-3 border-tiles-background border-b-8 text-white cursor-pointer",
};

export const KEY_BASE =
  "key h-14 w-14 min-w-[3rem] px-3 rounded font-bold text-3xl cursor-pointer transition-colors";

export const KEY_STATE = {
  correct: "bg-tiles-correct text-white",
  wrong: "bg-tiles-wrong text-white opacity-20",
  displaced: "bg-tiles-displaced text-white",
  default: "bg-tiles-background text-white hover:bg-tiles-background-hover",
};
