import { Ship } from "./Ship";

export const Gameboard = (size) => {
   const board = Array.from({ length: size }, () => Array(size).fill(null));
   const ships = [];

   const getCell = (row, col) => board[col][row];
   const hasShip = (row, col) => getCell(row, col) !== null;
   const getShip = (row, col) => ships[board[col][row]];
   const getAllShips = () => [...ships];
   const isAllShipsSunken = () => getAllShips().every((ship) => ship.isSunk());

   function _isValidPlacement(size, row, col, length, direction) {
      if (direction === "horizontal") {
         // Ship goes outside of the game board boundriess
         if (row + length > size) return false;
      } else if (direction === "vertical") {
         if (col + length > size) return false;
      }

      for (let i = 0; i < length; i++) {
         let newRow = direction === "horizontal" ? row + i : row;
         let newCol = direction === "vertical" ? col + i : col;

         if (hasShip(newRow, newCol)) return false; // Ship overlaps
      }

      return true;
   }

   const placeShip = (row, col, length, direction) => {
      if (!_isValidPlacement(size, row, col, length, direction)) {
         throw new Error("Invalid placement: Out of the bounds or overlapping.");
      }

      const ship = Ship(length, direction);
      const shipIndex = ships.length;
      ships.push(ship);

      for (let i = 0; i < length; i++) {
         let newRow = direction === "horizontal" ? row + i : row;
         let newCol = direction === "vertical" ? col + i : col;
         board[newCol][newRow] = shipIndex; // Store the ship index reference
      }
   };

   const receiveAttack = (row, col) => {
      const cell = getCell(row, col);
      if (cell === null) {
         // Attack misses
         board[col][row] = "X";
      } else if (typeof cell === "number") {
         // Successful hit
         const ship = getShip(row, col);
         ship.hit();
         board[col][row] = "H";
      } else {
         // A previously attacked cell
         throw new Error("This cell was already attacked.");
      }
   };

   return {
      placeShip,
      getCell,
      hasShip,
      getShip,
      getAllShips,
      receiveAttack,
      isAllShipsSunken,
   };
};
