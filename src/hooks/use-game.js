import { useEffect, useCallback } from "react";
import { words } from "../lib/words";
import { COLUMNS, ROWS } from "../constants/game-constants";
import { useReducer } from "react";
import { lose, win, skip, enter, wrong } from "../lib/sound";
import { useRef } from "react";

const getRandomWord = () =>
  words[Math.floor(Math.random() * words.length)].toUpperCase();

const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const emptyGuesses = () =>
  Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""));

const initialState = {
  word: getRandomWord(),
  guesses: emptyGuesses(),
  results: Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null)),
  currentRow: 0,
  selectedColumn: 0,
  keyStates: {},
  status: "playing",
};

const getFilledCount = (guesses, row) =>
  guesses[row].filter((l) => l !== "").length;

function gameReducer(state, action) {
  switch (action.type) {
    case "KEY": {
      if (state.status !== "playing") return state;
      const filled = getFilledCount(state.guesses, state.currentRow);
      if (filled >= COLUMNS) return state;

      const next = state.guesses.map((row) => [...row]);
      next[state.currentRow][state.selectedColumn] = action.letter;

      return {
        ...state,
        guesses: next,
        selectedColumn: Math.min(state.selectedColumn + 1, COLUMNS - 1),
      };
    }

    case "BACKSPACE": {
      if (state.status !== "playing") return state;
      const filled = getFilledCount(state.guesses, state.currentRow);
      if (filled === 0) return state;

      const col = state.guesses[state.currentRow][state.selectedColumn]
        ? state.selectedColumn
        : state.selectedColumn - 1;

      if (col < 0) return state;

      const next = state.guesses.map((row) => [...row]);
      next[state.currentRow][col] = "";

      return {
        ...state,
        guesses: next,
        selectedColumn: col,
      };
    }

    case "SELECT_COLUMN": {
      if (state.status !== "playing") return state;
      return { ...state, selectedColumn: action.colIndex };
    }

    case "ARROW_LEFT":
      return {
        ...state,
        selectedColumn: Math.max(0, state.selectedColumn - 1),
      };

    case "ARROW_RIGHT":
      return {
        ...state,
        selectedColumn: Math.min(COLUMNS - 1, state.selectedColumn + 1),
      };

    case "ENTER": {
      if (state.status !== "playing") return state;

      const filled = getFilledCount(state.guesses, state.currentRow);
      if (filled !== COLUMNS) return state;

      const guessRaw = state.guesses[state.currentRow].join("");
      const guess = removeAccents(guessRaw).toUpperCase();
      const word = removeAccents(state.word).toUpperCase();

      const newResults = state.results.map((r) => [...r]);
      const newKeyStates = { ...state.keyStates };
      const result = Array(COLUMNS).fill("wrong");

      const wordLetterCount = {};
      for (const l of word) {
        wordLetterCount[l] = (wordLetterCount[l] || 0) + 1;
      }

      for (let i = 0; i < COLUMNS; i++) {
        if (guess[i] === word[i]) {
          result[i] = "correct";
          wordLetterCount[guess[i]]--;
        }
      }

      for (let i = 0; i < COLUMNS; i++) {
        if (result[i] === "correct") continue;
        if (wordLetterCount[guess[i]] > 0) {
          result[i] = "displaced";
          wordLetterCount[guess[i]]--;
        }
      }

      for (let i = 0; i < COLUMNS; i++) {
        const letter = guess[i];
        const prev = newKeyStates[letter];
        if (result[i] === "correct") {
          newKeyStates[letter] = "correct";
        } else if (result[i] === "displaced" && prev !== "correct") {
          newKeyStates[letter] = "displaced";
        } else if (result[i] === "wrong" && !prev) {
          newKeyStates[letter] = "wrong";
        }
      }

      newResults[state.currentRow] = result;

      const won = guess === word;
      const lost = !won && state.currentRow === ROWS - 1;

      return {
        ...state,
        results: newResults,
        keyStates: newKeyStates,
        status: won ? "won" : lost ? "lost" : "playing",
        currentRow: won || lost ? state.currentRow : state.currentRow + 1,
        selectedColumn: 0,
      };
    }

    case "RESET":
      return { ...initialState, word: getRandomWord() };

    default:
      return state;
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleKey = useCallback((key) => {
    if (!/^[A-Za-zÀ-ú]$/.test(key)) return;
    (enter(), dispatch({ type: "KEY", letter: key.toUpperCase() }));
  }, []);

  const handleBackSpace = useCallback(() => {
    enter();
    dispatch({ type: "BACKSPACE" });
  }, []);
  const handleEnter = useCallback(() => dispatch({ type: "ENTER" }), []);
  const handleReset = useCallback(() => dispatch({ type: "RESET" }), []);
  const handleTileClick = useCallback((colIndex) => {
    skip();
    dispatch({ type: "SELECT_COLUMN", colIndex });
  }, []);

  const prevRowRef = useRef(0);

  useEffect(() => {
    if (state.status === "won") {
      win();
    } else if (state.status === "lost") {
      lose();
    } else if (state.currentRow !== prevRowRef.current) {
      wrong();
    }
    prevRowRef.current = state.currentRow;
  }, [state.status, state.currentRow]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") handleBackSpace();
      else if (e.key === "ArrowLeft") {
        skip();
        dispatch({ type: "ARROW_LEFT" });
      } else if (e.key === "ArrowRight") {
        skip();
        dispatch({ type: "ARROW_RIGHT" });
      } else if (/^[a-zA-ZÀ-ú]$/.test(e.key)) handleKey(e.key);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey, handleBackSpace, handleEnter]);

  const chosen =
    state.word.charAt(0).toUpperCase() + state.word.slice(1).toLowerCase();

  return {
    ...state,
    chosen,
    handleKey,
    handleBackSpace,
    handleEnter,
    handleReset,
    handleTileClick,
  };
}
