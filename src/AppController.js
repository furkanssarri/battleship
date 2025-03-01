import { player1, player2, runGame, placeShips } from "./GameController";
import { ShipPlacer } from "./ShipPlacer";
import {
   renderGameBoards,
   renderShipPlacementBoard,
   updateCellContent,
   updateGameOver,
   updateDomOnTurn,
   UpdateGameboardDOM,
} from "./DomController";

export const initApp = () => {
   renderGameBoards(player1, player2);
   renderShipPlacementBoard(player1);
};

export const handleShipClick = (row, col, player) => {
   placeShips(row, col, player);
   UpdateGameboardDOM(player);
};

export const callUpdateGameboardDOM = (player) => UpdateGameboardDOM(player);

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
