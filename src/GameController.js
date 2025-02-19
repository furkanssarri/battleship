import { Player } from "./components/Player";
import { gameOver, passCellDisplayInfo, passTurnInfo } from "./AppController";

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

export const handleCpuTurn = () => {
   let randomRow, randomCol;

   do {
      ({ randomRow, randomCol } = _randomizeCoords());
   } while (_checkIfCellWasAttacked(randomRow, randomCol, player1)); // 🔄 Keep generating until we get a valid cell

   runGame(randomRow, randomCol);
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
   const isOccupied = opponent.ownBoard.receiveAttack(row, col);

   passCellDisplayInfo(row, col, opponent.name, isOccupied);

   if (opponent.ownBoard.isAllShipsSunken()) gameOver();

   takeTurns.swapTurns();
   const nextTurn = takeTurns.getCurrentPlayer();
   passTurnInfo(nextTurn);

   if (nextTurn === player2) {
      setTimeout(handleCpuTurn, 200);
   }
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
