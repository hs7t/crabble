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

export const shuffle = (array: Array<any>) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

gameState.currentSolution = shuffle(gameState.puzzle);

