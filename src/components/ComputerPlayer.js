export const ComputerPlayer = () => {
   let state = "hunt";
   let lastHit = null;
   let potentialTargets = [];
   const attackedCells = new Set();

   const getState = () => state;
   const setState = (newState) => (state = newState);
   const setLastHit = (coords) => (lastHit = coords);
   const addPotentialTargets = (targets) => potentialTargets.push(...targets);
   const clearPotentialTargets = () => (potentialTargets = []);
   const getNextTarget = () => potentialTargets.shift();
   const getPotentialTargets = () => [...potentialTargets];
   const markCellAsAttacked = (row, col) => attackedCells.add(`${row}, ${col}`);
   const hasCellBeenAttacked = (row, col) => attackedCells.has(`${row}, ${col}`);

   return {
      getState,
      setState,
      setLastHit,
      addPotentialTargets,
      getNextTarget,
      clearPotentialTargets,
      getPotentialTargets,
      markCellAsAttacked,
      hasCellBeenAttacked,
   };
};
