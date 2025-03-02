export const ShipPlacer = (player) => {
   const size = player.ownBoard.getGrid().length;
   const placeShipManually = (row, col, length, direction) => {
      try {
         player.ownBoard.placeShip(row, col, length, direction);
         return true;
      } catch (error) {
         console.log(error.message);
         return false;
      }
   };

   const placeShipsRandomly = (armada) => {
      const maxAttempts = 100; // Maximum number of attempts to place a ship
      armada.forEach((vessel) => {
         let placed = false;
         let attempts = 0;

         while (!placed && attempts < maxAttempts) {
            const randomDirection = Math.random() < 0.5 ? "horizontal" : "vertical";
            const randomRow = Math.floor(Math.random() * size); // Random row within board size
            const randomCol = Math.floor(Math.random() * size); // Random column within board size

            try {
               player.ownBoard.placeShip(randomRow, randomCol, vessel.ship.length, randomDirection);
               placed = true; // Mark as placed if successful
            } catch (error) {
               attempts++; // Increment attempt counter
               if (attempts >= maxAttempts) {
                  console.log(
                     `Failed to place ${vessel.type} after ${maxAttempts} attempts. Skipping...`,
                  );
               }
            }
         }
      });
   };

   return {
      placeShipManually,
      placeShipsRandomly,
   };
};
