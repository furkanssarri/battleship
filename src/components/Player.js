import { Gameboard } from "./Gameboard";

export const Player = () => {
   const ownBoard = Gameboard(10);

   return {
      ownBoard,
   };
};
