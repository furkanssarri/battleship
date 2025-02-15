import { player1, cpuPlayer } from "./GameController";

export const initializeGameboard = () => {
   const cellData = player1.ownBoard.getGrid().length;
   document.getElementById("root").appendChild(_createGameBoardDOM(cellData));

   const gameboardDOM = document.querySelector(".game-board");
   gameboardDOM.addEventListener("click", getEventCell);
};

function getEventCell(e) {
   // Attack to cell logic will be here
}

function _createGameBoardDOM(data) {
   const gridContainer = document.createElement("div");
   gridContainer.classList.add("game-board");

   for (let row = 0; row < data; row++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");

      for (let col = 0; col < data; col++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.dataset.row = row;
         cell.dataset.col = col;
         rowElement.appendChild(cell);
      }

      gridContainer.appendChild(rowElement);
   }

   return gridContainer;
}
