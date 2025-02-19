export const ComputerPlayer = () => {
   let state = "hunt";
   let lastHit = null;
   let potentialTargets = [];

   const getState = () => state;
   const setState = (newState) => (state = newState);
   const setLastHit = (coords) => (lastHit = coords);
   const addPotentialTargets = (targets) => potentialTargets.push(...targets);
   const clearPotentialTargets = () => (potentialTargets = []);
   const getNextTarget = () => potentialTargets.shift();
   const getPotentialTargets = () => [...potentialTargets];

   return {
      getState,
      setState,
      setLastHit,
      addPotentialTargets,
      getNextTarget,
      clearPotentialTargets,
      getPotentialTargets,
   };
};
