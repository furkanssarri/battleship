import { Gameboard } from "./Gameboard";

export const Player = (name) => {
   const ownBoard = Gameboard(10);

   return {
      name,
      ownBoard,
   };
};
