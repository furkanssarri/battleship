export const Ship = (length, direction) => {
   return {
      length,
      direction,
      hits: 0,
      hit() {
         this.hits++;
      },
      isSunk() {
         if (this.hits >= this.length) {
            return true;
         }
         // return false;
      },
   };
};
