export const ComputerPlayer = () => {
   let state = "hunt";
   let lastHit = null;
   let potentialTargets = [];
   const attackedCells = new Set();
   let shipOrientation = null;

   const getState = () => state;
   const setState = (newState) => (state = newState);
   const getLastHit = () => lastHit;
   const setLastHit = (coords) => (lastHit = coords);
   const addPotentialTargets = (targets) => potentialTargets.push(...targets);
   const clearPotentialTargets = () => (potentialTargets = []);
   const getNextTarget = () => (potentialTargets.length > 0 ? potentialTargets.shift() : null);
   const getPotentialTargets = () => [...potentialTargets];
   const markCellAsAttacked = (row, col) => attackedCells.add(`${row}, ${col}`);
   const hasCellBeenAttacked = (row, col) => attackedCells.has(`${row}, ${col}`);
   const getShipOrientation = () => shipOrientation;
   const setShipOrientation = (orientation) => (shipOrientation = orientation);

   return {
      getState,
      setState,
      getLastHit,
      setLastHit,
      addPotentialTargets,
      getNextTarget,
      clearPotentialTargets,
      getPotentialTargets,
      markCellAsAttacked,
      hasCellBeenAttacked,
      getShipOrientation,
      setShipOrientation,
   };
};
