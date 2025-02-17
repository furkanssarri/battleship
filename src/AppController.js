import { player1, player2, runGame } from "./GameController";
import {
   renderGameBoards,
   updateCellContent,
   updateGameOver,
   updateDomOnTurn,
} from "./DomController";

export const initApp = () => {
   renderGameBoards(player1, player2);
};

export const handleCellClick = (row, col) => {
   row = Number(row);
   col = Number(col);
   runGame(row, col);
};

export const passCellDisplayInfo = (row, col, player, isOccupied) =>
   updateCellContent(row, col, player, isOccupied);

export const gameOver = () => {
   updateGameOver();
};

export const passTurnInfo = (turnInfo) => updateDomOnTurn(turnInfo);
