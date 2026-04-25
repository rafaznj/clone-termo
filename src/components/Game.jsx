import {
  KEY_BASE,
  KEY_STATE,
  KEYS_ROW_1,
  KEYS_ROW_2,
  KEYS_ROW_3,
  TILE_BASE,
  TILE_STATE,
} from "../constants/game-constants";
import { useGame } from "../hooks/use-game";
import "../styles/global.css";
import { FaBackspace } from "react-icons/fa";

export default function Game() {
  const {
    guesses,
    results,
    currentRow,
    keyStates,
    status,
    chosen,
    selectedColumn,
    handleKey,
    handleBackSpace,
    handleEnter,
    handleTileClick,
  } = useGame();

  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      <h1 className="text-white text-4xl text-center tracking-widest">
        CLONE TERMO
      </h1>
      <div className="h-8 flex items-center justify-center">
        {status === "won" && (
          <p className="text-white text-xl font-bold bg-background-success px-2 py-1 rounded-lg whitespace-nowrap">
            Parabéns! Você acertou a palavra!
          </p>
        )}
        {status === "lost" && (
          <p className="text-white text-xl font-bold bg-background-failed px-2 py-1 rounded-lg whitespace-nowrap">
            Palavra: <span>{chosen}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 bg-background">
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => {
              const result = results[rowIndex][colIndex];
              const stateKey =
                result ??
                (rowIndex === currentRow
                  ? colIndex === selectedColumn
                    ? "selected"
                    : "typing"
                  : "disabled");

              return (
                <div
                  key={colIndex}
                  className={`${TILE_BASE} ${TILE_STATE[stateKey]}`}
                  onClick={() =>
                    rowIndex === currentRow ? handleTileClick(colIndex) : null
                  }
                >
                  {status === "won" && rowIndex === currentRow
                    ? chosen[colIndex].toUpperCase()
                    : letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex gap-2">
          {KEYS_ROW_1.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`${KEY_BASE} ${keyStates[key] ? KEY_STATE[keyStates[key]] : KEY_STATE.default}`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {KEYS_ROW_2.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`${KEY_BASE} ${keyStates[key] ? KEY_STATE[keyStates[key]] : KEY_STATE.default}`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleEnter}
            className={`${KEY_BASE} w-auto min-w-[4.5rem] bg-white hover:bg-gray-300 text-black`}
          >
            ENTER
          </button>

          {KEYS_ROW_3.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`${KEY_BASE} ${keyStates[key] ? KEY_STATE[keyStates[key]] : KEY_STATE.default}`}
            >
              {key}
            </button>
          ))}

          <button
            onClick={handleBackSpace}
            className={`${KEY_BASE} bg-white hover:bg-gray-300 text-black`}
          >
            <FaBackspace />
          </button>
        </div>
      </div>
    </div>
  );
}
