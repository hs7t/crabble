import json
from utilitarianism import randomIndex
from fastapi import FastAPI, APIRouter
from typing import Literal

app = FastAPI()
v1_router = APIRouter(prefix="/api/v1", tags=["v1"])

async def readPuzzles():
    with open('puzzles.json', 'r') as puzzlesJSON:
        puzzles = json.load(puzzlesJSON)
    return puzzles

PuzzleKind = Literal["general", "spooky"]

async def getRandomPuzzle(type: PuzzleKind, currentPuzzle = None) -> list:
    puzzles = await readPuzzles()

    if type == "general":
        return randomIndex(puzzles["general"], currentPuzzle)
    elif type == "spooky":
        return randomIndex(puzzles["occasional"]["spooky"], currentPuzzle)

@v1_router.get("/")
async def main():
    return "chop chop 🦀"

@v1_router.get("/puzzles/random")
async def returnLatestPuzzle(kind: PuzzleKind = "general", currentPuzzle: str|None = None):
    return await getRandomPuzzle(kind, currentPuzzle)