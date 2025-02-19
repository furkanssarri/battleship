import { Player } from "./components/Player";
import { ComputerPlayer } from "./components/ComputerPlayer";
import { gameOver, passCellDisplayInfo, passTurnInfo } from "./AppController";

const cpuPlayer = ComputerPlayer();
export const player1 = Player("player-1");
// player1.ownBoard.placeShip(4, 3, 2, "horizontal");
player1.ownBoard.placeShip(4, 3, 5, "horizontal");
player1.ownBoard.placeShip(6, 4, 4, "vertical");
player1.ownBoard.placeShip(2, 1, 3, "horizontal");
player1.ownBoard.placeShip(1, 8, 2, "vertical");
player1.ownBoard.placeShip(0, 4, 3, "horizontal");
player1.ownBoard.placeShip(8, 6, 3, "horizontal");
// // additional ships for testing...
// player1.ownBoard.placeShip(0, 0, 3, "horizontal");
// player1.ownBoard.placeShip(1, 1, 6, "horizontal");
// player1.ownBoard.placeShip(3, 1, 6, "horizontal");

export const player2 = Player("player-2");
player2.ownBoard.placeShip(0, 1, 5, "horizontal");
player2.ownBoard.placeShip(3, 2, 4, "vertical");
player2.ownBoard.placeShip(7, 5, 3, "vertical");
player2.ownBoard.placeShip(5, 5, 3, "horizontal");
player2.ownBoard.placeShip(2, 6, 2, "horizontal");
player2.ownBoard.placeShip(2, 4, 2, "vertical");

// export const handleCpuTurn = (cpuPlayer) => {
//    let currentPlayer = takeTurns.getCurrentPlayer();
//    let opponent = currentPlayer === player1 ? player2 : player1;
//    const {
//       getState,
//       setState,
//       getLastHit,
//       setLastHit,
//       addPotentialTargets,
//       getNextTarget,
//       getPotentialTargets,
//       clearPotentialTargets,
//       hasCellBeenAttacked,
//       markCellAsAttacked,
//       getShipOrientation,
//       setShipOrientation,
//    } = cpuPlayer;

//    let randomRow, randomCol;

//    if (getState() === "hunt") {
//       do {
//          ({ randomRow, randomCol } = _randomizeCoords());
//       } while (hasCellBeenAttacked(randomRow, randomCol));
//       const result = runGame(randomRow, randomCol);

//       markCellAsAttacked(randomRow, randomCol);

//       if (result === "H") {
//          const shipToCheck = opponent.ownBoard.getShipIndex(randomRow, randomCol);
//          if (shipToCheck && shipToCheck.isSunk()) {
//             console.log(`Ship at (${randomRow}, ${randomCol}) is sunk! Resetting to hunt mode...`);
//             setState("hunt");
//             setLastHit(null);
//             setShipOrientation(null);
//             clearPotentialTargets();
//          } else {
//             setState("target");
//             setLastHit(randomRow, randomCol);
//             addPotentialTargets(_getAdjacentCells(randomRow, randomCol));
//          }
//       }
//    } else if (getState() === "target") {
//       let nextTarget = getNextTarget();
//       do {
//          nextTarget = getNextTarget();
//       } while (nextTarget !== null && hasCellBeenAttacked(nextTarget.row, nextTarget.col));

//       if (nextTarget !== null) {
//          const { row: nextRow, col: nextCol } = nextTarget;
//          const result = runGame(nextRow, nextCol);
//          markCellAsAttacked(nextRow, nextCol);

//          if (result === "H") {
//             const shipToCheck = opponent.ownBoard.getShipIndex(nextRow, nextCol);
//             if (shipToCheck && shipToCheck.isSunk()) {
//                console.log(`Ship at (${nextRow}, ${nextCol}) is sunk! Resetting to hunt mode...`);
//                setState("hunt");
//                setLastHit(null);
//                setShipOrientation(null);
//                clearPotentialTargets();
//             } else {
//                if (getShipOrientation() === null) {
//                   const { row: lastRow, col: lastCol } = getLastHit();
//                   if (nextRow === lastRow) {
//                      setShipOrientation("horizontal");
//                   } else if (nextCol === lastCol) {
//                      setShipOrientation("vertical");
//                   }
//                   console.log(`detected ship orientation: ${getShipOrientation()}.`);
//                }

//                // Add more targets along the detected orientation
//                if (getShipOrientation() === "horizontal") {
//                   const left = { row: nextRow, col: nextCol - 1 };
//                   const right = { row: nextRow, col: nextCol + 1 };
//                   [left, right].forEach((cell) => {
//                      if (
//                         cell.row >= 0 &&
//                         cell.row < 10 &&
//                         cell.col >= 0 &&
//                         cell.col < 10 &&
//                         !hasCellBeenAttacked(cell.row, cell.col)
//                      ) {
//                         addPotentialTargets([cell]);
//                      }
//                   });
//                } else if (getShipOrientation() === "vertical") {
//                   const up = { row: nextRow - 1, col: nextCol };
//                   const down = { row: nextRow + 1, col: nextCol };
//                   [up, down].forEach((cell) => {
//                      if (
//                         cell.row >= 0 &&
//                         cell.row < 10 &&
//                         cell.col >= 0 &&
//                         cell.col < 10 &&
//                         !hasCellBeenAttacked(cell.row, cell.col)
//                      ) {
//                         addPotentialTargets([cell]);
//                      }
//                   });
//                }
//             }
//          } else if (result === "X") {
//             console.log(`that's a miss! waiting for next Computer player turn...`);
//          }
//       } else {
//          console.log("No more valid targets! Resetting to hunt mode...");
//          setState("hunt");
//          setLastHit(null);
//          setShipOrientation(null);
//          clearPotentialTargets();
//          console.log(`cleared potential targets list: ${JSON.stringify(getPotentialTargets())}.`);
//       }
//    }
// };

// export const handleCpuTurn = (cpuPlayer) => {
//    let currentPlayer = takeTurns.getCurrentPlayer();
//    let opponent = currentPlayer === player1 ? player2 : player1;
//    const {
//       getState,
//       setState,
//       getLastHit,
//       setLastHit,
//       addPotentialTargets,
//       getNextTarget,
//       getPotentialTargets,
//       clearPotentialTargets,
//       hasCellBeenAttacked,
//       markCellAsAttacked,
//       getShipOrientation,
//       setShipOrientation,
//    } = cpuPlayer;

//    let randomRow, randomCol;

//    if (getState() === "hunt") {
//       do {
//          ({ randomRow, randomCol } = _randomizeCoords());
//       } while (hasCellBeenAttacked(randomRow, randomCol));
//       const result = runGame(randomRow, randomCol);

//       markCellAsAttacked(randomRow, randomCol);

//       if (result === "H") {
//          const shipTocheck = opponent.ownBoard.getShipIndex(randomRow, randomCol);
//          if (shipTocheck) {
//             console.log(`ship at (${randomRow}, ${randomCol}) is sunk?`, shipTocheck.isSunk());
//          }
//          setState("target");
//          setLastHit(randomRow, randomCol);
//          addPotentialTargets(_getAdjacentCells(randomRow, randomCol));
//       }
//    } else if (getState() === "target") {
//       let nextTarget = getNextTarget();
//       do {
//          nextTarget = getNextTarget();
//       } while (nextTarget !== null && hasCellBeenAttacked(nextTarget.row, nextTarget.col));

//       if (nextTarget !== null) {
//          const { row: nextRow, col: nextCol } = nextTarget;
//          const result = runGame(nextRow, nextCol);
//          markCellAsAttacked(nextRow, nextCol);

//          if (result === "H") {
//             if (getShipOrientation() === null) {
//                const { row: lastRow, col: lastCol } = getLastHit();
//                if (nextRow === lastRow) {
//                   setShipOrientation("horizontal");
//                } else if (nextCol === lastCol) {
//                   setShipOrientation("vertical");
//                }
//                console.log(`detected ship orientatio: ${getShipOrientation()}.`);
//             }
//             // Add more targets along the detected orientation
//             if (getShipOrientation() === "horizontal") {
//                const left = { row: nextRow, col: nextCol - 1 };
//                const right = { row: nextRow, col: nextCol + 1 };
//                [left, right].forEach((cell) => {
//                   if (
//                      cell.row >= 0 &&
//                      cell.row < 10 &&
//                      cell.col >= 0 &&
//                      cell.col < 10 &&
//                      !hasCellBeenAttacked(cell.row, cell.col)
//                   ) {
//                      addPotentialTargets([cell]);
//                   }
//                });
//             } else if (getShipOrientation() === "vertical") {
//                const up = { row: nextRow - 1, col: nextCol };
//                const down = { row: nextRow + 1, col: nextCol };
//                [up, down].forEach((cell) => {
//                   if (
//                      cell.row >= 0 &&
//                      cell.row < 10 &&
//                      cell.col >= 0 &&
//                      cell.col < 10 &&
//                      !hasCellBeenAttacked(cell.row, cell.col)
//                   ) {
//                      addPotentialTargets([cell]);
//                   }
//                });
//             }
//          } else if (result === "X") {
//             console.log(`thats a miss! waiting for next Computer player turn...`);
//             // Continue targeting by moving to the next potential target
//             // No action needed here; the loop will handle the next target
//          }
//       } else {
//          console.log("Normally reset. But NOT now.");

//          // if (opponent.ownBoard.hasShip(randomRow, randomCol)) {
//          //    console.log(randomRow, randomCol);
//          // }
//          // console.log(`The ship's sunk! resetting the status of ${getState()}...`);
//          // setState("hunt");
//          // setLastHit(null);
//          // setShipOrientation(null);
//          // console.log(
//          //    `resetting has been done. now we are back to the status of ${getState()}, and the last hit was reset back to null.`,
//          // );
//          // clearPotentialTargets();
//          // console.log(`cleared potential targets list: ${JSON.stringify(getPotentialTargets())}.`);
//       }
//    }
//    // const currentPlayer = takeTurns.getCurrentPlayer();
//    // console.log(player2.ownBoard.getShip(randomRow, randomCol));
//    // console.log(currentPlayer.ownBoard.getShip(randomRow, randomCol));
//    // console.log(player1.ownBoard.getShip(randomRow, randomCol));
//    // if (currentPlayer === player1) {
//    // const currentShip = currentPlayer.ownBoard.getShip(randomRow, randomCol);
//    // if (currentShip) {
//    //    console.log(currentShip.isSunk());
//    // }
//    // }
// };

// Helper function to reset the computer player's state

/* REFACTORING handleCpuTurn BEGINS */

const resetComputerPlayer = (cpuPlayer) => {
   const { setState, setLastHit, setShipOrientation, clearPotentialTargets } = cpuPlayer;
   setState("hunt");
   setLastHit(null);
   setShipOrientation(null);
   clearPotentialTargets();
   console.log("Computer player reset to hunt mode.");
};

const addTargetsAlongOrientation = (cpuPlayer, row, col) => {
   const { addPotentialTargets, getShipOrientation, hasCellBeenAttacked } = cpuPlayer;

   if (getShipOrientation() === "horizontal") {
      const left = { row, col: col - 1 };
      const right = { row, col: col + 1 };
      [left, right].forEach((cell) => {
         if (
            cell.row >= 0 &&
            cell.row < 10 &&
            cell.col >= 0 &&
            cell.col < 10 &&
            !hasCellBeenAttacked(cell.row, cell.col)
         ) {
            addPotentialTargets([cell]);
         }
      });
   } else if (getShipOrientation() === "vertical") {
      const up = { row: row - 1, col };
      const down = { row: row + 1, col };
      [up, down].forEach((cell) => {
         if (
            cell.row >= 0 &&
            cell.row < 10 &&
            cell.col >= 0 &&
            cell.col < 10 &&
            !hasCellBeenAttacked(cell.row, cell.col)
         ) {
            addPotentialTargets([cell]);
         }
      });
   }
};

const handleHuntMode = (cpuPlayer, opponent) => {
   const { setState, setLastHit, addPotentialTargets, hasCellBeenAttacked, markCellAsAttacked } =
      cpuPlayer;

   let randomRow, randomCol;
   do {
      ({ randomRow, randomCol } = _randomizeCoords());
   } while (hasCellBeenAttacked(randomRow, randomCol));

   const result = runGame(randomRow, randomCol);
   markCellAsAttacked(randomRow, randomCol);

   if (result === "H") {
      const shipToCheck = opponent.ownBoard.getShipIndex(randomRow, randomCol);
      if (shipToCheck && shipToCheck.isSunk()) {
         console.log(`Ship at (${randomRow}, ${randomCol}) is sunk! Resetting to hunt mode...`);
         resetComputerPlayer(cpuPlayer);
      } else {
         setState("target");
         setLastHit(randomRow, randomCol);
         addPotentialTargets(_getAdjacentCells(randomRow, randomCol));
      }
   }
};

const handleTargetMode = (cpuPlayer, opponent) => {
   const {
      getNextTarget,
      getLastHit,
      setShipOrientation,
      getShipOrientation,
      hasCellBeenAttacked,
      markCellAsAttacked,
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
            console.log(`Ship at (${nextRow}, ${nextCol}) is sunk! Resetting to hunt mode...`);
            resetComputerPlayer(cpuPlayer);
         } else {
            if (getShipOrientation() === null) {
               const { row: lastRow, col: lastCol } = getLastHit();
               if (nextRow === lastRow) {
                  setShipOrientation("horizontal");
               } else if (nextCol === lastCol) {
                  setShipOrientation("vertical");
               }
               console.log(`Detected ship orientation: ${getShipOrientation()}.`);
            }
            addTargetsAlongOrientation(cpuPlayer, nextRow, nextCol);
         }
      } else if (result === "X") {
         console.log("That's a miss! Waiting for the next computer player turn...");
      }
   } else {
      console.log("No more valid targets! Resetting to hunt mode...");
      resetComputerPlayer(cpuPlayer);
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

/* REFACTORING handleCpuTurn ENDS */

const _getAdjacentCells = (row, col) => {
   return [
      { row: row - 1, col }, // Up
      { row: row + 1, col }, // Down
      { row, col: col - 1 }, // Left
      { row, col: col + 1 }, // Right
   ].filter(({ row, col }) => row >= 0 && row < 10 && col >= 0 && col < 10); // Filter out-of-bounds cells
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
