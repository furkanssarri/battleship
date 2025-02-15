import { player1, cpuPlayer } from "./GameController";

export const initializeGameboard = () => {
   const container = document.createElement("div");
   container.classList.add("container");

   const player1CellData = player1.ownBoard.getGrid().length;
   const player2CellData = cpuPlayer.ownBoard.getGrid().length;

   container.appendChild(_createGameBoardDOM(player1CellData));
   container.appendChild(_createGameBoardDOM(player2CellData));
   document.getElementById("root").appendChild(container);

   const gameboardDOM = document.querySelector(".game-board");
   gameboardDOM.addEventListener("click", getEventCell);
};

function getEventCell(e) {
   const targetCell = e.target.dataset;
   const { row, col } = targetCell;
   player1.ownBoard.receiveAttack(row, col);
   e.target.textContent = "X"; // Just mark an X for now, will come back and implement the hasShip() and isHit() mechanic
}

function _createGameBoardDOM(data) {
   const gridContainer = document.createElement("div");
   gridContainer.classList.add("game-board");

   for (let col = 0; col < data; col++) {
      const colElement = document.createElement("div");
      colElement.classList.add("column");

      for (let row = 0; row < data; row++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.dataset.row = row;
         cell.dataset.col = col;
         colElement.appendChild(cell);
      }

      gridContainer.appendChild(colElement);
   }

   return gridContainer;
}
