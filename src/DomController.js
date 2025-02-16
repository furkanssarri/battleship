import { player1, cpuPlayer } from "./GameController";

export const initializeGameboard = () => {
   const container = document.createElement("div");
   container.classList.add("container");

   const player1CellData = player1.ownBoard.getGrid().length;
   const player2CellData = cpuPlayer.ownBoard.getGrid().length;

   container.appendChild(_createGameBoardDOM(player1CellData));
   // container.appendChild(_createGameBoardDOM(player2CellData));
   document.getElementById("root").appendChild(container);

   const gameboardDOM = document.querySelector(".game-board");
   gameboardDOM.addEventListener("click", getEventCell);
};

function getEventCell(e) {
   const targetCell = e.target.dataset;
   const { row, col } = targetCell;
   player1.ownBoard.receiveAttack(row, col);
   const isOccupied = player1.ownBoard.getShip(row, col);
   console.log(isOccupied);
   // console.log(row, col);
   e.target.textContent = "X"; // Just mark an X for now, will come back and implement the hasShip() and isHit() mechanic
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
         cell.textContent = `${row}, ${col}`;
         const isOccupied = player1.ownBoard.hasShip(row, col);
         if (isOccupied) {
            cell.classList.add("ship");
         }
         rowElement.appendChild(cell);
      }

      gridContainer.appendChild(rowElement);
   }

   return gridContainer;
}
