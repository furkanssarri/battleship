export const createShip = (length, direction) => {
   return {
      length,
      direction,
      hits: 0,
      hit() {
         this.hits++;
      },
      isSunk() {
         return this.hits >= this.length;
      },
   };
};
