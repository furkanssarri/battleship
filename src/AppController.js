import {
   player1,
   player2,
   runGame,
   placeShips,
   vesselOrientation,
   randomlyPlaceCpuPlayerShips,
} from "./GameController";
import {
   renderGameBoards,
   renderShipPlacementBoard,
   updateCellContent,
   updateGameOver,
   updateDomOnTurn,
   UpdateGameboardDOM,
   removePlacementOverlay,
} from "./DomController";

export const initApp = () => {
   renderGameBoards(player1, player2);
   renderShipPlacementBoard(player1);
   randomlyPlaceCpuPlayerShips();
};

export const handleShipClick = (row, col, player, clickType) => {
   if (clickType === "right") {
      vesselOrientation.swapVesselOrientation();
   } else {
      placeShips(row, col);
      UpdateGameboardDOM(player);
   }
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

export const updatePlacementUI = () => removePlacementOverlay();

export const passTurnInfo = (turnInfo) => updateDomOnTurn(turnInfo);
