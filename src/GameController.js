import { Player } from "./components/Player";

const player1 = Player("Player 1");
const cpuPlayer = Player("CPU");

player1.ownBoard.placeShip(0, 0, 5, "horizontal");

export { player1, cpuPlayer };
