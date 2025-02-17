import { Ship } from "./Ship";

export const Gameboard = (size) => {
   const board = Array.from({ length: size }, () => Array(size).fill(null));
   const ships = [];

   const getCell = (row, col) => board[row][col];
   const hasShip = (row, col) => getCell(row, col) !== null;
   const getAllShips = () => [...ships];
   const isAllShipsSunken = () => ships.every((ship) => ship.isSunk());
   const getGrid = () => board;

   const getShipPositions = () =>
      ships.map(({ startRow, startCol, length, direction }) => ({
         startRow,
         startCol,
         length,
         direction,
      }));

   const getShipIndex = (row, col) => {
      return (
         ships.find((ship) => {
            const { startRow, startCol, length, direction } = ship;
            if (direction === "horizontal") {
               return row === startRow && col >= startCol && col < startCol + length;
            } else {
               return col === startCol && row >= startRow && row < startRow + length;
            }
         }) || undefined
      );
   };

   const getShip = (row, col) => {
      const index = board[row][col];
      return Number.isInteger(index) ? ships[index] : undefined;
   };

   const _isValidPlacement = (row, col, length, direction) => {
      if (direction === "horizontal" && col + length > size) return false;
      if (direction === "vertical" && row + length > size) return false;

      for (let i = 0; i < length; i++) {
         const newRow = direction === "vertical" ? row + i : row;
         const newCol = direction === "horizontal" ? col + i : col;
         if (hasShip(newRow, newCol)) return false;
      }
      return true;
   };

   const placeShip = (row, col, length, direction) => {
      if (!_isValidPlacement(row, col, length, direction)) {
         throw new Error("Invalid placement: Out of bounds or overlapping.");
      }

      const ship = Ship(length, direction, row, col);
      const shipIndex = ships.length;
      ships.push(ship);

      for (let i = 0; i < length; i++) {
         const newRow = direction === "vertical" ? row + i : row;
         const newCol = direction === "horizontal" ? col + i : col;
         board[newRow][newCol] = shipIndex;
      }
   };

   const receiveAttack = (row, col) => {
      const cell = getCell(row, col);
      if (cell === null) {
         board[row][col] = "X"; // Missed shot
         return "X";
      }
      if (Number.isInteger(cell)) {
         const ship = getShip(row, col);
         if (ship) {
            ship.hit();
            board[row][col] = "H";
            return "H";
         }
      }
      // throw new Error("This cell was already attacked.");
      console.log("Cell already attacked... Skipping...");
      return "Cell already attacked... Skipping...";
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
      getShipIndex,
   };
};
