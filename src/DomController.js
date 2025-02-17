import { player1, player2, resolveCellEvents } from "./GameController";
import { handleCellClick } from "./AppController";

export const renderGameBoards = (player1, player2) => {
   const container = document.createElement("div");
   container.classList.add("container");

   const player1GameboardDOM = _createGameBoardDOM(player1, handleCellClick);
   const player2GameboardDOM = _createGameBoardDOM(player2, handleCellClick);
   container.append(player1GameboardDOM, player2GameboardDOM);

   document.getElementById("root").appendChild(container);
};

function _createGameBoardDOM(player, callback) {
   const size = player.ownBoard.getGrid().length;
   const playerName = player.name;
   const gridContainer = document.createElement("div");
   gridContainer.classList.add("game-board");
   gridContainer.id = playerName;

   for (let col = 0; col < size; col++) {
      const colElement = document.createElement("div");
      colElement.classList.add("column");

      for (let row = 0; row < size; row++) {
         // Change col -> row
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.dataset.row = row;
         cell.dataset.col = col;

         const isOccupied = player.ownBoard.hasShip(row, col);
         if (isOccupied) {
            cell.classList.add("ship");
         }

         cell.addEventListener("click", () => callback(row, col, player));

         colElement.appendChild(cell);
      }

      gridContainer.appendChild(colElement);
   }

   return gridContainer;
}

export const updateCellContent = (row, col, playerName, isOccupied) => {
   const cell = _getCellElement(row, col, playerName);
   console.log(cell);
   if (isOccupied) {
      cell.textContent = "H";
      cell.classList.remove("ship");
      cell.classList.add("hit");
   } else {
      cell.textContent = "X";
      cell.classList.add("miss");
   }
};

const _getCellElement = (row, col, playerName) => {
   const gameboard = document.getElementById(playerName);
   return gameboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
};
