import { Ship } from "./Ship";

export const Gameboard = (size) => {
   const board = Array.from({ length: size }, () => Array(size).fill(null));
   const ships = [];

   const getCell = (row, col) => board[row][col];
   const hasShip = (row, col) => getCell(row, col) !== null;
   const getAllShips = () => [...ships];
   const isAllShipsSunken = () => getAllShips().every((ship) => ship.isSunk());
   const getGrid = () => board;
   const getShipPositions = () => {
      return ships.map((ship) => ({
         startRow: ship.startRow,
         startCol: ship.startCol,
         length: ship.length,
         direction: ship.direction,
      }));
   };

   const getShip = (row, col) => {
      for (const ship of ships) {
         const { startRow, startCol, length, direction } = ship;

         if (direction === "horizontal") {
            if (row === startRow && col >= startCol && col < startCol + length) {
               return ship;
            }
         } else if (direction === "vertical") {
            if (col === startCol && row >= startRow && row < startRow + length) {
               return ship;
            }
         }
      }

      return undefined; // No ship found at coords
   };

   function _isValidPlacement(size, row, col, length, direction) {
      if (direction === "horizontal") {
         // Check if the ship goes out of bounds horizontally
         if (col + length > size) return false;
      } else if (direction === "vertical") {
         // Check if the ship goes out of bounds vertically
         if (row + length > size) return false;
      }

      // Check for overlapping ships
      for (let i = 0; i < length; i++) {
         let newRow = direction === "vertical" ? row + i : row;
         let newCol = direction === "horizontal" ? col + i : col;

         if (hasShip(newRow, newCol)) return false; // Ship overlaps
      }

      return true;
   }

   const placeShip = (row, col, length, direction) => {
      if (!_isValidPlacement(size, row, col, length, direction)) {
         throw new Error("Invalid placement: Out of the bounds or overlapping.");
      }

      const ship = Ship(length, direction, row, col);
      const shipIndex = ships.length;
      ships.push(ship);

      for (let i = 0; i < length; i++) {
         let newRow = direction === "vertical" ? row + i : row;
         let newCol = direction === "horizontal" ? col + i : col;
         board[newRow][newCol] = shipIndex; // Store the ship index
      }
   };

   const receiveAttack = (row, col) => {
      const cell = getCell(row, col);
      if (cell === null) {
         // Attack misses
         board[row][col] = "X";
         return "X";
      } else if (typeof cell === "number") {
         // Successful hit
         const ship = getShip(row, col);
         ship.hit();
         board[row][col] = "H";
         return "H";
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
      getGrid,
      getShipPositions,
   };
};
