export const createShip = (length, direction) => {
   function getHit() {
      return (this.length -= 1);
   }

   function hits() {
      return this.length;
   }

   function isSunk() {
      return this.length === 0 ? true : false;
   }

   return {
      length,
      direction,
      hits,
      isSunk,
      getHit,
   };
};
