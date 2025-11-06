class AppEvents extends EventTarget {}
export const appEvents = new AppEvents();

import * as crabnet from './api'

export type Word = {
  id: number;
  title: string;
};

export type Series = Array<Word>

export type Puzzle = {
  id: string,
  series: Array<Series>
}

export type PuzzleState = {
  currentSeriesIndex: number,
  currentSolution: Array<Series>,
  timeLeft: Milliseconds,
  maxTime: Milliseconds,
  status: gameStatus
}

export type Milliseconds = number

export const PUZZLE_TIME_QUANTITY = 15000 as Milliseconds; 

type GameType = "infinite"|"lightning"|"spooky"

export let gameState = $state({
  puzzle: undefined as Puzzle|undefined,
  puzzleState: undefined as PuzzleState|undefined,
  gameType: "infinite" as GameType
});

const createWordsFromTitles = (titles: Array<string>) => {
  let workingId = 0
  let words = [] as Series

  for (let title of titles) {
    words.push({
      id: workingId,
      title: title
    } as Word)
    workingId++
  }

  return words
}

const getRandomPuzzle = async (currentPuzzleId: string|undefined = undefined) => {
  let options = {
    searchParams: {}
  }

  if (currentPuzzleId != undefined) {
    options["searchParams"] = {
      currentPuzzle: currentPuzzleId
    }
  }

  const randomPuzzle = await crabnet.parseResponseJSON(
    await crabnet.api.get(
      "puzzles/random", 
      {
        ...options
      }
    )
  )

  let result = {
    id: randomPuzzle.id as string,
    series: [] as Array<Series>,
  } as Puzzle

  for (let series of randomPuzzle.series) {
    result.series.push(createWordsFromTitles(series))
  }

  return result
}

export const updatePuzzle = async () => {
  gameState.puzzle = await getRandomPuzzle(gameState?.puzzle?.id)
  
  let shuffledPuzzleSeries = (() => {
    let result = []
    for (let series of gameState.puzzle.series) {
      result.push(shuffle(series))
    }
    return result
  })()

  gameState.puzzleState = {
    currentSeriesIndex: 0,
    currentSolution: shuffledPuzzleSeries, 
    timeLeft: PUZZLE_TIME_QUANTITY,
    maxTime: PUZZLE_TIME_QUANTITY,
    status: "playing"
  }
}

const getWordTitles = (solution: Series) => {
  let titles = []
  for (let word of solution) {
    titles.push(word.title)
  }
  return titles
}

export const checkSeriesSolutionValidity = (solution: Series, series: Series) => {
  let seriesTitles = getWordTitles(series)
  let solutionTitles = getWordTitles(solution)

  return JSON.stringify(seriesTitles) === JSON.stringify(solutionTitles);
}

export const checkPuzzleSolutionValidity = (puzzleSeries: Array<Series>, solutionSeries: Array<Series>) => {
  for (let [puzzleSeriesIndex, _] of puzzleSeries.entries()) {
    try {
      if (
        !(checkSeriesSolutionValidity(
          solutionSeries[puzzleSeriesIndex],
          puzzleSeries[puzzleSeriesIndex]
        ))
      ) {
        return false
      }
    } catch {
      return false
    }
  }

  return true
}

const isWon = (game: typeof gameState) => {
  if (game.puzzle?.series == undefined || game.puzzleState?.currentSolution == undefined) {
    return false
  }

  return checkPuzzleSolutionValidity(game.puzzle.series, game.puzzleState.currentSolution);
};

export type gameStatus = "lost" | "won" | "playing";

export const getOverStatus = (game: typeof gameState) => {
  let status = "playing" as gameStatus;

  if (isWon(game)) {
    status = "won";
  } else {
    if (game.puzzleState?.timeLeft == 0) {
      status = "lost"
    } else {
      status = "playing";
    }
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

updatePuzzle()

const timeLeftLoop =  setInterval(() => {
  if (
    gameState.puzzleState?.timeLeft != undefined 
    && gameState.puzzleState.timeLeft >= 1000
  ) {
    gameState.puzzleState.timeLeft -= (1000 as Milliseconds);
  }
}, 1000);

export const SeriesCompleteEvent = new Event("seriesComplete")
export const PuzzleCompleteEvent = new Event("puzzleComplete")

appEvents.addEventListener('seriesComplete', () => {
  if (gameState?.puzzleState && gameState?.puzzle?.series) {
    if (gameState.puzzle.series.length > ( gameState.puzzleState.currentSeriesIndex + 1 )) {
      gameState.puzzleState.currentSeriesIndex += 1;
    } else {
      gameState.puzzleState.status = "won"
    }
  }
})

