# Crabble

A fast-paced word game where you unscramble strings of words. [Check it out!](https://crabble.hvii.cc/)

![A screenshot of the game Crabble](https://i.imgur.com/bxvgflx.png)

> [!NOTE]
> **Hi, reviewer!** I commit a lot - I apologise in advance. I've tried to take
> some steps to make reviewing easier: I'm committing less and have started
> working in different branches so I can group related commits into pull requests.
> And I've squashed commits in the same pull requests together (that's why you
> may see some extremely broken timestamps).
> So, please, when reviewing, don't start with the commit history, 
> but with the [Pull Requests](https://github.com/hs7t/crabble/pulls?q=is%3Apr+is%3Aclosed)
> tab instead!

## Playing
*   Pick a mode - Lightning, Infinite, or Spooky!
    -   In Lighting mode, solve a set of three puzzles.
    -   In Infinite mode, solve as many puzzles as you want (until you run out
        of puzzles, because there aren't that many :sob:)
    -   In Spooky mode, solve a set of three puzzles - but spooky!

*   Solve a puzzle by ordering each series of words within it correctly.
    -   Use `Q` or `W` to select words.
    -   Use `Space` to pick up a word. Then, use your arrow keys to move it.
    -   Hit `Space` again to set down the word.
    -   Not using a keyboard? Don't worry. Drag any word to set it in the right place.

*   Keep an eye on the time!
    -   Moving a word gives you more time.
    -   You'll lose if you run out of time.

## About
This project was started for week 5 of [Siege](https://siege.hackclub.com/)! It was a lot
of work, but I'm quite happy with how it's shaping out :D

## Credits
### In use
*   [Vite](https://vite.dev/) + [Svelte](https://svelte.dev/)!
*   [Typescript](https://www.typescriptlang.org/) & [Python](https://www.python.org/)
*   [svelte-dnd-action](https://github.com/isaacHagoel/svelte-dnd-action) (give it a star!)
*   [FastAPI](https://fastapi.tiangolo.com/)
*   [ky](https://github.com/sindresorhus/ky)

### More!
*   [How To Use an Emoji as a Favicon Easily](https://css-tricks.com/emoji-as-a-favicon/) (at CSS-Tricks)

## Running

This project has two parts: a backend API (crabnet!) and the website frontend.

You should start by cloning the repo:

```bash
$ git clone https://github.com/hs7t/cubby.git
```

Specific instructions for running each part follow.

### Website

Spinning up the website is easy! From [`crabble-web`](./crabble-web/):

1. Install packages
    ```bash
    $ npm install
    ```
2. Run a development server
    ```bash
    $ npm run dev
    ```
3. Get a build when you're ready
    ```bash
    $ npm run build     # check out ./dist afterward!
    ```

If you want, you can edit `crabble-web/config.js` to direct API requests to your
own URL.

### Backend

This is also easy! Making sure you've got [Poetry](https://python-poetry.org/) and
Python both installed, from [`crabnet`](./crabnet/):

1. Install dependencies
    ```bash
    $ poetry install
    ```
2. Run a development server
    ```bash
    $ poetry run fastapi dev 
    ```

[Deployment](https://fastapi.tiangolo.com/deployment/) is slightly trickier.