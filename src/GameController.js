import { Player } from "./components/Player";
import { gameOver } from "./AppController";

export const player1 = Player("Player-1");
// player1.ownBoard.placeShip(4, 3, 5, "horizontal");
// player1.ownBoard.placeShip(6, 4, 4, "vertical");
// player1.ownBoard.placeShip(2, 1, 3, "horizontal");
// player1.ownBoard.placeShip(1, 8, 2, "vertical");
// player1.ownBoard.placeShip(0, 4, 3, "horizontal");
player1.ownBoard.placeShip(8, 6, 3, "horizontal");

export const player2 = Player("Player-2");
player2.ownBoard.placeShip(0, 1, 5, "horizontal");
// player2.ownBoard.placeShip(3, 2, 4, "vertical");
// player2.ownBoard.placeShip(7, 5, 3, "vertical");
// player2.ownBoard.placeShip(5, 5, 3, "horizontal");
// player2.ownBoard.placeShip(2, 6, 2, "horizontal");
// player2.ownBoard.placeShip(2, 4, 2, "vertical");

export const runGame = (row, col, player) => {
   player.ownBoard.receiveAttack(row, col);
   takeTurns.swapTurns();
   console.log(takeTurns.getCurrentPlayer());
   if (player.ownBoard.isAllShipsSunken()) gameOver();
};

export const takeTurns = (() => {
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
