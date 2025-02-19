import { Player } from "./components/Player";
import { ComputerPlayer } from "./components/ComputerPlayer";
import { gameOver, passCellDisplayInfo, passTurnInfo } from "./AppController";

const cpuPlayer = ComputerPlayer();
export const player1 = Player("player-1");
player1.ownBoard.placeShip(4, 3, 5, "horizontal");
player1.ownBoard.placeShip(6, 4, 4, "vertical");
player1.ownBoard.placeShip(2, 1, 3, "horizontal");
player1.ownBoard.placeShip(1, 8, 2, "vertical");
player1.ownBoard.placeShip(0, 4, 3, "horizontal");
player1.ownBoard.placeShip(8, 6, 3, "horizontal");

export const player2 = Player("player-2");
player2.ownBoard.placeShip(0, 1, 5, "horizontal");
player2.ownBoard.placeShip(3, 2, 4, "vertical");
player2.ownBoard.placeShip(7, 5, 3, "vertical");
player2.ownBoard.placeShip(5, 5, 3, "horizontal");
player2.ownBoard.placeShip(2, 6, 2, "horizontal");
player2.ownBoard.placeShip(2, 4, 2, "vertical");

export const handleCpuTurn = (cpuPlayer) => {
   const {
      getState,
      setState,
      setLastHit,
      addPotentialTargets,
      getNextTarget,
      getPotentialTargets,
      clearPotentialTargets,
   } = cpuPlayer;

   let randomRow, randomCol;

   if (getState() === "hunt") {
      do {
         ({ randomRow, randomCol } = _randomizeCoords());
      } while (_checkIfCellWasAttacked(randomRow, randomCol, player1));
      console.log(`attacking ${randomRow}, ${randomCol} with ${getState()} status...`);
      const result = runGame(randomRow, randomCol);

      if (result === "H") {
         setState("target");
         console.log(`the status has changed to ${getState()}.`);
         setLastHit(randomRow, randomCol);
         console.log(`saving the last successful hit's coords ${randomRow}, ${randomCol}...`);
         addPotentialTargets(_getAdjacentCells(randomRow, randomCol));
         console.log(
            `calculating the adjacent cells to the last hit, which was at coords: ${randomRow}, ${randomCol}...`,
         );
         console.log(`the potential targets are: `, getPotentialTargets());
         console.log(`and the status is: ${getState()}`);
      }
   } else if (getState() === "target") {
      console.log(`attacking with updated status of: ${getState()}`);
      console.log(`getting the new coords for the next attack...`);
      const nextTarget = getNextTarget();
      const nextRow = nextTarget.row;
      const nextCol = nextTarget.col;
      console.log("undestructed new coords: ", nextTarget);
      console.log(`the new coords to attack is: ${nextRow}, ${nextCol}.`);

      if (nextRow && nextCol) {
         console.log(
            `attacking the new coords ${nextRow}, ${nextCol} with the status of ${getState()}...`,
         );
         const result = runGame(nextRow, nextCol);

         if (result === "H") {
            console.log(
               `HIT AGAIN! adding the coords ${nextRow}, ${nextCol} to the adjacent cells...`,
            );
            addPotentialTargets(_getAdjacentCells(nextRow, nextCol));
            console.log(
               `the updated version of adjacent cells are: ${addPotentialTargets(_getAdjacentCells(nextRow, nextCol))}.`,
            );
         } else if (result === "X") {
            console.log(`thats a miss! waiting for next Computer player turn...`);
            // Continue targeting by moving to the next potential target
            // No action needed here; the loop will handle the next target
         }
      } else {
         console.log(`The ship's sunk! resetting the status of ${getState()}...`);
         setState("hunt");
         setLastHit(null);
         console.log(
            `resetting has been done. now we are back to the status of ${getState()}, and the last hit was reset bacj to null.`,
         );
         clearPotentialTargets();
         console.log(`cleared potential targets list: ${getPotentialTargets()}.`);
      }
   }
};

const _getAdjacentCells = (row, col) => {
   return [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
   ].filter(({ row, col }) => row >= 0 && row < 10 && col >= 0 && col < 10);
};

function _randomizeCoords() {
   const randomRow = Math.floor(Math.random() * 10);
   const randomCol = Math.floor(Math.random() * 10);
   return { randomRow, randomCol };
}
function _checkIfCellWasAttacked(row, col, player) {
   if (player.ownBoard.getCell(row, col) === "X" || player.ownBoard.getCell(row, col) === "H") {
      return true;
   }
   return false;
}

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
