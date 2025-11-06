class AppEvents extends EventTarget {}
export const appEvents = new AppEvents();

import * as crabnet from './api'

export type Puzzle = {
  id: string,
  series: Array< Array<Word> >
}

export type Word = {
  id: number;
  title: string;
};

export type Milliseconds = number

export const PUZZLE_TIME_QUANTITY = 15000 as Milliseconds; 

export let gameState = $state({
  puzzle: undefined as Puzzle|undefined,
  currentSolution: [] as Array<Word>,
  timeLeft: PUZZLE_TIME_QUANTITY,
  maxTime: PUZZLE_TIME_QUANTITY,
});

export const getRandomPuzzle = async () => {
  return await crabnet.parseResponseJSON(
    await crabnet.api.get(
      "puzzles/random", 
      {
        searchParams: {
          currentPuzzle: gameState?.puzzle?.id
        }
      }
    )
  ) as Puzzle
}

gameState.puzzle = await getRandomPuzzle()

const getWordTitles = (solution: Array<Word>) => {
  let titles = []
  for (let word of solution) {
    titles.push(word.title)
  }
  return titles
}

const createWordsFromTitles = (titles: Array<string>) => {
  let workingId = 0
  let words = [] as Array<Word>

  for (let title of titles) {
    words.push({
      id: workingId,
      title: title
    } as Word)
  }

  return words
} 

const isWon = (game: typeof gameState) => {
  let puzzleSolutionTitles = getWordTitles(game.currentSolution)
  let currentSolutionTitles = getWordTitles(game.puzzle)

  return JSON.stringify(puzzleSolutionTitles) === JSON.stringify(currentSolutionTitles);
};

export type gameStatus = "lost" | "won" | "playing";

export const getOverStatus = (game: typeof gameState) => {
  let status = "playing" as gameStatus;
  if (isWon(game)) {
    status = "won";
  } else {
    if (gameState.timeLeft == 0) {
      status = "lost"
    } else {
      status = "playing";
    }
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

const timeLeftLoop =  setInterval(() => {
  if (gameState.timeLeft > 0) {
    gameState.timeLeft -= (1000 as Milliseconds);
  }
}, 1000);