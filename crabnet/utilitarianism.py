import random
def randomIndex(lst: list) -> list:
    return lst[random.randint(0, ( len(lst) - 1 ))]
