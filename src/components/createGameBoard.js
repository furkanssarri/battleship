import { createShip } from "./createShip";

export const createGameBoard = (size) => {
   const board = Array.from({ length: size }, () => Array(size).fill(null));
   const ships = [];

   function isValidPlacement(board, size, row, col, length, direction) {
      if (direction === "horizontal") {
         // Ship goes outside of the game board boundries
         if (row + length > size) return false;
      } else if (direction === "vertical") {
         if (col + length > size) return false;
      }

      for (let i = 0; i < length; i++) {
         let newRow = direction === "horizontal" ? row + i : row;
         let newCol = direction === "vertical" ? col + i : col;

         if (board[newCol][newRow] !== null) return false; // Ship overlaps
      }

      return true;
   }

   function placeShip(row, col, length, direction) {
      if (!isValidPlacement(board, size, row, col, length, direction)) {
         throw new Error("Invalid placement: Out of the bounds or overlapping.");
      }

      const ship = createShip(length, direction);
      ships.push(ship);

      for (let i = 0; i < length; i++) {
         let newRow = direction === "horizontal" ? row + i : row;
         let newCol = direction === "vertical" ? col + i : col;
         board[newCol][newRow] = ship; // Store the ship object
      }
   }

   function receiveAttack(row, col) {
      if (board[col][row] === null) {
         // Attack misses
         board[col][row] = "X";
      } else if (typeof board[col][row] === "object") {
         // Successful hit
         board[col][row] = "H";
      } else {
         // A previously attacked cell
         throw new Error("This cell was already attacked.");
      }
   }

   return {
      createBoard: () => board,
      getCell: (row, col) => board[col][row],
      placeShip,
      hasShip: (row, col) => board[col][row] !== null,
      getShip: (row, col) => board[col][row],
      receiveAttack,
   };
};
