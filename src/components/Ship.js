export const Ship = (length, direction, startRow, startCol) => {
   let hits = 0;

   const getHits = () => hits;
   const hit = () => hits++;
   const isSunk = () => (hits >= length ? true : false);
   return {
      length,
      direction,
      startRow,
      startCol,
      getHits,
      hit,
      isSunk,
   };
};
