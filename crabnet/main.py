import json
import random
from fastapi import FastAPI, HTTPException
from typing import Literal

app = FastAPI()

async def readPuzzles():
    with open('puzzles.json', 'r') as puzzlesJSON:
        puzzles = json.load(puzzlesJSON)
    return puzzles

def randomIndex(lst: list) -> list:
    return lst[random.randint(0, ( len(lst) - 1 ))]

PuzzleKind = Literal["general", "spooky"]

async def getRandomPuzzle(type: PuzzleKind) -> list:
    puzzles = await readPuzzles()

    if type == "general":
        return randomIndex(puzzles["general"])
    elif type == "spooky":
        return randomIndex(puzzles["occasional"]["spooky"])

@app.get("/")
async def main():
    return "Hello!"

@app.get("/v1/puzzles/random")
async def returnLatestPuzzle():
    return await getRandomPuzzle("general")
