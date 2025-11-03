class AppEvents extends EventTarget {}
export const appEvents = new AppEvents();

export type Word = {
  id: number;
  title: string;
};

export let gameState = $state({
  puzzle: [
    { id: 1, title: "meow" },
    { id: 2, title: "woo" },
    { id: 3, title: "hoo" },
  ] as Array<Word>,
  currentSolution: [] as Array<Word>,
});

const isWon = (game: typeof gameState) => {
  return game.currentSolution === game.puzzle;
};

export type gameStatus = "lost" | "won" | "playing";

export const getOverStatus = (game: typeof gameState) => {
  let status = "playing" as gameStatus;
  if (isWon(game)) {
    status = "won";
  } else {
    status = "playing";
  }

  return status;
};

export const shuffle = (array: Array<any>) => {
  let result = [...array];
  result.sort(() => Math.random() - 0.5);

  if (JSON.stringify(result) == JSON.stringify(array)) {
    result = shuffle(array);
  }

  return result;
};

gameState.currentSolution = shuffle(gameState.puzzle);

