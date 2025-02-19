export const ComputerPlayer = () => {
   let state = "hunt";
   let lastHit = null; // Stores the last hit coordinates as { row, col }
   let potentialTargets = [];
   const attackedCells = new Set();
   let shipOrientation = null;
   let attackDirection = null; // "left", "right", "up", or "down"
   let currentShipLength = 0; // Track the length of the current ship

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
   const getAttackDirection = () => attackDirection;
   const setAttackDirection = (direction) => (attackDirection = direction);
   const getCurrentShipLength = () => currentShipLength;
   const setCurrentShipLength = (length) => (currentShipLength = length);
   const resetCurrentShipLength = () => (currentShipLength = 0);

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
      getAttackDirection,
      setAttackDirection,
      getCurrentShipLength,
      setCurrentShipLength,
      resetCurrentShipLength,
   };
};
