import { Player } from "./components/Player";
import { ComputerPlayer } from "./components/ComputerPlayer";
import {
   gameOver,
   passCellDisplayInfo,
   passTurnInfo,
   callUpdateGameboardDOM,
   updatePlacementUI,
   passGridContainer,
   callAddHighlight,
   callRemoveHighlights,
} from "./AppController";
import { ShipPlacer } from "./ShipPlacer";
import { Ship } from "./components/Ship";

const cpuPlayer = ComputerPlayer();
export const player1 = Player("player-1");

export const player2 = Player("player-2");

export const vesselOrientation = (() => {
   let vesselOrientation = "horizontal";

   const getVesselOrientation = () => vesselOrientation;
   const setVesselOrientation = (orientation) => (vesselOrientation = orientation);
   const swapVesselOrientation = () =>
      (vesselOrientation = vesselOrientation === "horizontal" ? "vertical" : "horizontal");

   return { getVesselOrientation, setVesselOrientation, swapVesselOrientation };
})();

let currentShipIndex = 0;
const armada = [
   { type: "Battleship", ship: Ship(5) },
   { type: "Destroyer", ship: Ship(4) },
   { type: "Submarine", ship: Ship(4) },
   { type: "Carrier", ship: Ship(3) },
   { type: "Boat", ship: Ship(2) },
];

export const placeShips = (row, col) => {
   let theShipOrientation = vesselOrientation.getVesselOrientation();
   const shipPlacer = ShipPlacer(player1);

   if (currentShipIndex < armada.length) {
      const vessel = armada[currentShipIndex];
      const placementSuccessful = shipPlacer.placeShipManually(
         row,
         col,
         vessel.ship.length,
         theShipOrientation,
      );

      if (placementSuccessful) {
         callUpdateGameboardDOM(player1);
         currentShipIndex++;
      }
   }

   if (currentShipIndex === armada.length) {
      updatePlacementUI();
   }
};

export const highlightShipPlacement = (row, col, player) => {
   const gridContainer = passGridContainer();
   const shipLength = armada[currentShipIndex]?.ship.length || 0;
   const orientation = vesselOrientation.getVesselOrientation();

   callRemoveHighlights(gridContainer); // Clear previous highlights

   if (shipLength === 0) return;

   for (let i = 0; i < shipLength; i++) {
      let targetRow = row;
      let targetCol = col;

      if (orientation === "horizontal") {
         targetCol = col + i;
      } else if (orientation === "vertical") {
         targetRow = row + i;
      }

      if (
         targetRow < player.ownBoard.getGrid().length &&
         targetCol < player.ownBoard.getGrid().length
      ) {
         const cell = gridContainer.querySelector(
            `.cell[data-row="${targetRow}"][data-col="${targetCol}"]`,
         );
         if (cell) {
            callAddHighlight(cell);
         }
      }
   }
};

export const randomlyPlaceCpuPlayerShips = () => {
   const randomShipPlacer = ShipPlacer(player2);
   randomShipPlacer.placeShipsRandomly(armada);
};

export const resetComputerPlayer = (cpuPlayer) => {
   const { setState, setLastHit, setShipOrientation, clearPotentialTargets } = cpuPlayer;
   setState("hunt");
   setLastHit(null);
   setShipOrientation(null);
   clearPotentialTargets();
};

export const addTargetsAlongOrientation = (cpuPlayer, row, col) => {
   const { addPotentialTargets, getShipOrientation, hasCellBeenAttacked } = cpuPlayer;

   if (getShipOrientation() === "horizontal") {
      // Add all valid cells to the left, skipping already-attacked cells
      let leftCol = col - 1;
      while (leftCol >= 0 && !hasCellBeenAttacked(row, leftCol)) {
         addPotentialTargets([{ row, col: leftCol }]);
         leftCol--;
      }

      // Add all valid cells to the right, skipping already-attacked cells
      let rightCol = col + 1;
      while (rightCol < 10 && !hasCellBeenAttacked(row, rightCol)) {
         addPotentialTargets([{ row, col: rightCol }]);
         rightCol++;
      }
   } else if (getShipOrientation() === "vertical") {
      // Add all valid cells above, skipping already-attacked cells
      let upRow = row - 1;
      while (upRow >= 0 && !hasCellBeenAttacked(upRow, col)) {
         addPotentialTargets([{ row: upRow, col }]);
         upRow--;
      }

      // Add all valid cells below, skipping already-attacked cells
      let downRow = row + 1;
      while (downRow < 10 && !hasCellBeenAttacked(downRow, col)) {
         addPotentialTargets([{ row: downRow, col }]);
         downRow++;
      }
   }
};

export const handleHuntMode = (cpuPlayer, opponent) => {
   const {
      setState,
      setLastHit,
      getLastHit,
      addPotentialTargets,
      hasCellBeenAttacked,
      markCellAsAttacked,
   } = cpuPlayer;

   let randomRow, randomCol;
   do {
      ({ randomRow, randomCol } = _randomizeCoords());
   } while (hasCellBeenAttacked(randomRow, randomCol));

   const result = runGame(randomRow, randomCol);
   markCellAsAttacked(randomRow, randomCol);

   if (result === "H") {
      const shipToCheck = opponent.ownBoard.getShipIndex(randomRow, randomCol);
      if (shipToCheck && shipToCheck.isSunk()) {
         resetComputerPlayer(cpuPlayer);
      } else {
         setState("target");
         setLastHit({ row: randomRow, col: randomCol });
         addPotentialTargets(_getAdjacentCells(randomRow, randomCol));
      }
   }
};

export const handleTargetMode = (cpuPlayer, opponent) => {
   const {
      getNextTarget,
      getLastHit,
      setShipOrientation,
      getShipOrientation,
      hasCellBeenAttacked,
      markCellAsAttacked,
      getAttackDirection,
      setAttackDirection,
      getCurrentShipLength,
      setCurrentShipLength,
      resetCurrentShipLength,
   } = cpuPlayer;

   let nextTarget;
   do {
      nextTarget = getNextTarget();
   } while (nextTarget !== null && hasCellBeenAttacked(nextTarget.row, nextTarget.col));

   if (nextTarget !== null) {
      const { row: nextRow, col: nextCol } = nextTarget;
      const result = runGame(nextRow, nextCol);
      markCellAsAttacked(nextRow, nextCol);

      if (result === "H") {
         const shipToCheck = opponent.ownBoard.getShipIndex(nextRow, nextCol);
         if (shipToCheck && shipToCheck.isSunk()) {
            resetComputerPlayer(cpuPlayer);
            resetCurrentShipLength();
         } else {
            if (getShipOrientation() === null) {
               const { row: lastRow, col: lastCol } = getLastHit();

               if (nextRow === lastRow) {
                  setShipOrientation("horizontal");
               } else if (nextCol === lastCol) {
                  setShipOrientation("vertical");
               }
            }

            // Increment the current ship length
            setCurrentShipLength(getCurrentShipLength() + 1);

            // Add all valid targets along the ship's orientation
            addTargetsAlongOrientation(cpuPlayer, nextRow, nextCol);
         }
      } else if (result === "X") {
         const currentDirection = getAttackDirection();
         const newDirection =
            currentDirection === "right"
               ? "left"
               : currentDirection === "left"
                 ? "right"
                 : currentDirection === "up"
                   ? "down"
                   : "up";
         setAttackDirection(newDirection);
         addTargetsAlongOrientation(cpuPlayer, nextRow, nextCol);
      }
   } else {
      resetComputerPlayer(cpuPlayer);
      resetCurrentShipLength();
   }
};

export const handleCpuTurn = (cpuPlayer) => {
   const currentPlayer = takeTurns.getCurrentPlayer();
   const opponent = currentPlayer === player1 ? player2 : player1;
   const { getState } = cpuPlayer;

   if (getState() === "hunt") {
      handleHuntMode(cpuPlayer, opponent);
   } else if (getState() === "target") {
      handleTargetMode(cpuPlayer, opponent);
   }
};

const _getAdjacentCells = (row, col) => {
   return [
      { row: row - 1, col }, // Up
      { row: row + 1, col }, // Down
      { row, col: col - 1 }, // Left
      { row, col: col + 1 }, // Right
   ].filter(({ row, col }) => row >= 0 && row < 10 && col >= 0 && col < 10); // Filter out-of-bounds cells
};

const _randomizeCoords = () => {
   const randomRow = Math.floor(Math.random() * 10);
   const randomCol = Math.floor(Math.random() * 10);
   return { randomRow, randomCol };
};
const _checkIfCellWasAttacked = (row, col, player) => {
   if (player.ownBoard.getCell(row, col) === "X" || player.ownBoard.getCell(row, col) === "H") {
      return true;
   }
   return false;
};

export const runGame = (row, col) => {
   const currentPlayer = takeTurns.getCurrentPlayer();
   const opponent = currentPlayer === player1 ? player2 : player1;
   const result = opponent.ownBoard.receiveAttack(row, col);

   passCellDisplayInfo(row, col, opponent.name, result);

   if (opponent.ownBoard.isAllShipsSunken()) gameOver();

   takeTurns.swapTurns();
   const nextTurn = takeTurns.getCurrentPlayer();
   passTurnInfo(nextTurn);

   if (nextTurn === player2) {
      setTimeout(() => {
         handleCpuTurn(cpuPlayer);
      }, 50);
   }
   return result;
};

const takeTurns = (() => {
   let currentPlayer = player1;

   const swapTurns = () => (currentPlayer = currentPlayer === player1 ? player2 : player1);
   const getCurrentPlayer = () => currentPlayer;
   const isPlayerTurn = (player) => player === currentPlayer;

   return {
      swapTurns,
      getCurrentPlayer,
      isPlayerTurn,
   };
})();
