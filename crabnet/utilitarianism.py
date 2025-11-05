import random
def randomIndex(lst: list, exceptIndex: int|None = None) -> list:
    index = random.randint(0, ( len(lst) - 1 ))

    # consider for a case where index == exceptIndex.
    # tries thrice because I like the number three.
    indexTries = 0
    while (exceptIndex is not None) and (exceptIndex == index) and (indexTries < 3 and indexTries <= len(lst) ):
        random.randint(0, ( len(lst) - 1 ))

    return lst[index]
