class AppEvents extends EventTarget {}
export const appEvents = new AppEvents();

export type Word = {
  id: number;
  title: string;
};

export type Milliseconds = number

export let gameState = $state({
  puzzle: [
    { id: 1, title: "meow" },
    { id: 2, title: "woo" },
    { id: 3, title: "hoo" },
  ] as Array<Word>,
  currentSolution: [] as Array<Word>,
  timeLeft: 15000 as Milliseconds
});

const isWon = (game: typeof gameState) => {
  return JSON.stringify(game.currentSolution) === JSON.stringify(game.puzzle);
};

export type gameStatus = "lost" | "won" | "playing";

export const getOverStatus = (game: typeof gameState) => {
  let status = "playing" as gameStatus;
  if (isWon(game)) {
    status = "won";
  } else {
    status = "playing";
  }

  console.log(status);
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

const loopTimeLeftUpdate = async () => {
  await setTimeout(() => {
    if (gameState.timeLeft > 0) gameState.timeLeft += -1
  }, 1000);
  loopTimeLeftUpdate()
}

loopTimeLeftUpdate()