import { Player } from "./components/Player";

const player1 = Player("Player 1");
const cpuPlayer = Player("CPU");

player1.ownBoard.placeShip(4, 3, 5, "horizontal");
player1.ownBoard.placeShip(6, 4, 4, "vertical");
player1.ownBoard.placeShip(2, 1, 3, "horizontal");
player1.ownBoard.placeShip(1, 8, 2, "vertical");
player1.ownBoard.placeShip(8, 6, 3, "horizontal");

export { player1, cpuPlayer };
