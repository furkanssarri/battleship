import { player1, player2, attackCell } from "./GameController";
import { renderGameBoards, updateCellContent } from "./DomController";

export const initApp = () => {
   renderGameBoards(player1, player2);
};

export const handleCellClick = (row, col, player) => {
   row = Number(row);
   col = Number(col);
   const isOccupied = player.ownBoard.hasShip(row, col) ? true : false;
   updateCellContent(row, col, isOccupied);
   attackCell(row, col, player, isOccupied);
};
