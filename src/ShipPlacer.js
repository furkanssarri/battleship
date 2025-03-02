export const ShipPlacer = (player) => {
   const placeShipManually = (row, col, length, direction) => {
      try {
         player.ownBoard.placeShip(row, col, length, direction);
         return true;
      } catch (error) {
         console.log(error.message);
         return false;
      }
   };

   const placeShipsRandomly = (ships) => {
      ships.forEach((ship) => {
         let placed = false;
         while (!placed) {
            const randomRow = Math.floor(Math.random() * player.ownBoard.size);
            const randomCol = Math.floor(Math.random() * player.ownBoard.size);
            const randomDirection = Math.random() < 0.5 ? "horizontal" : "vertical";

            try {
               player.ownBoard.placeShip(randomRow, randomCol, ship.length, randomDirection);
            } catch (error) {
               // Retry with random coords
            }
         }
      });
   };

   return {
      placeShipManually,
      placeShipsRandomly,
   };
};
