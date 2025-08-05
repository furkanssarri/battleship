# Battleship

A modern, test-driven implementation of the classic [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>) game. Play against a smart computer opponent with a sleek UI, built using ES6, Webpack, and Jest.

## Live Demo

Try it out: [furkanssarri.github.io/battleship](https://furkanssarri.github.io/battleship/)

## Features

-  Interactive grid-based gameplay
-  Smart computer AI opponent
-  Responsive design for desktop and mobile
-  Ship placement with drag, click, or long-press
-  Visual feedback for hits, misses, and sunk ships
-  Game over detection and restart option
-  Test-driven development with Jest

## Technologies Used

-  HTML5
-  CSS3 (with custom font and reset)
-  JavaScript (ES6 modules)
-  [Jest](https://jestjs.io/) for unit testing
-  [Webpack](https://webpack.js.org/) for bundling
-  [Babel](https://babeljs.io/) for ES6+ compatibility

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/furkanssarri/battleship.git
cd battleship
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Running Tests

Run all unit tests with:

```bash
npm test
```

## Build for Production

Bundle the app for deployment:

```bash
npm run build
```

## Project Structure

```txt
src/
  components/      # Game logic modules (Player, Ship, Gameboard, etc.)
  __tests__/       # Jest unit tests
  assets/          # Fonts and images
  style.css        # Main styles
  index.js         # Entry point
  template.html    # HTML template
webpack.*.js       # Webpack configs
```

## Acknowledgements

Built by [furkanssarri](https://github.com/furkanssarri) for [The Odin Project](https://www.theodinproject.com/).

---

Enjoy playing Battleship and feel free to contribute
