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
   if (!e.target.classList.contains("cell")) return;
   const targetCell = e.target.dataset;
   const row = Number(targetCell.row);
   const col = Number(targetCell.col);

   const isOccupied = player1.ownBoard.hasShip(row, col);
   if (isOccupied) {
      e.target.textContent = "H";
      e.target.classList.remove("ship");
      e.target.classList.add("hit");
      const ship = player1.ownBoard.getShip(row, col);
      player1.ownBoard.receiveAttack(row, col);
      console.log(ship.isSunk());
   } else {
      e.target.textContent = "X";
      e.target.classList.add("miss");
      player1.ownBoard.receiveAttack(row, col);
   }
}

function _createGameBoardDOM(size) {
   const gridContainer = document.createElement("div");
   gridContainer.classList.add("game-board");

   for (let col = 0; col < size; col++) {
      // Change row -> col
      const colElement = document.createElement("div"); // Treat it as a column
      colElement.classList.add("column");

      for (let row = 0; row < size; row++) {
         // Change col -> row
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.dataset.row = row;
         cell.dataset.col = col;
         // cell.textContent = `${row}, ${col}`;

         // Check if the cell is occupied by a ship
         const isOccupied = player1.ownBoard.hasShip(row, col);
         if (isOccupied) {
            cell.classList.add("ship");
         }

         colElement.appendChild(cell); // Append cells to columns
      }

      gridContainer.appendChild(colElement); // Append columns to the grid
   }

   return gridContainer;
}
