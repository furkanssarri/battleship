import { createGameBoard } from "../components/createGameBoard";

describe("Board", () => {
   let board;
   beforeAll(() => {
      board = createGameBoard(10);
   });

   test("should initialize a 10x10 grid with all cells empty", () => {
      for (let col = 0; col < 10; col++) {
         for (let row = 0; row < 10; row++) {
            expect(board.getCell(col, row)).toBeNull();
         }
      }
   });

   test("should place a ship horizontally and store the ship object", () => {
      board.placeShip(2, 3, 5, "horizontal");

      const ship = board.getShip(2, 3);
      expect(ship).toBeDefined();
      expect(ship.length).toBe(5);
      expect(ship.direction).toBe("horizontal");
   });

   test("should place a ship vertically", () => {
      board.placeShip(2, 4, 5, "vertical");

      for (let i = 0; i < 5; i++) {
         expect(board.hasShip(2, 4 + i)).toBeTruthy();
      }
   });

   test("should place a ship vertically", () => {
      board.placeShip(6, 5, 3, "vertical");

      for (let i = 0; i < 3; i++) {
         expect(board.hasShip(6, 5 + i)).toBeTruthy();
      }
   });

   test("should throw an error when overlapping a ship with another one", () => {
      expect(() => board.placeShip(6, 5, 3, "vertical")).toThrow(
         "Invalid placement: Out of the bounds or overlapping.",
      );
   });

   test("should throw an error when placing a ship out of bounds", () => {
      expect(() => board.placeShip(8, 3, 5, "horizontal")).toThrow(
         "Invalid placement: Out of the bounds or overlapping.",
      );
   });

   test("should should mark a missed attack with 'X'", () => {
      board.receiveAttack(9, 8);

      const cell = board.getCell(9, 8);
      expect(cell).toBe("X");
   });

   test("should mark a hit 'H' when attack hits a ship", () => {
      board.receiveAttack(6, 5);

      const cell = board.getCell(6, 5);
      expect(cell).toBe("H");
   });

   test("should throw an error when attacking an already attacked cell", () => {
      expect(() => board.receiveAttack(9, 8)).toThrow("This cell was already attacked.");
   });

   test("should return an array of ships placed on the board", () => {
      const ships = board.getAllShips();

      expect(ships.length).toBe(3);

      expect(ships[0].length).toBe(5);
      expect(ships[0].direction).toBe("horizontal");

      expect(ships[1].length).toBe(5);
      expect(ships[1].direction).toBe("vertical");
   });
   test("should return an empty array if no ships are present", () => {
      () => {
         const newBoard = createGameBoard(10);
         const newSetofShips = newBoard.getAllShips();
         expect(newSetofShips.lenth).toBe(0);
      };
   });

   test("should return all ships at once if they are present", () => {
      const newBoard = createGameBoard(10);

      newBoard.placeShip(2, 4, 5, "horizontal");
      newBoard.placeShip(5, 7, 3, "vertical");
      newBoard.placeShip(0, 0, 4, "horizontal");

      const ships = newBoard.getAllShips();

      expect(ships[0].length).toBe(5);
      expect(ships[0].direction).toBe("horizontal");

      expect(ships[1].length).toBe(3);
      expect(ships[1].direction).toBe("vertical");

      expect(ships[2].length).toBe(4);
      expect(ships[2].direction).toBe("horizontal");
   });

   describe("sinking logic", () => {
      let sinkingLogicBoard;
      beforeAll(() => {
         sinkingLogicBoard = createGameBoard(10);
         sinkingLogicBoard.placeShip(1, 1, 3, "horizontal");
         sinkingLogicBoard.receiveAttack(1, 1);
         sinkingLogicBoard.receiveAttack(2, 1);
      });
      test("should return true if all ships are sunken", () => {
         expect(sinkingLogicBoard.isAllShipsSunken()).toBeFalsy();
      });

      test("should return the last remaining cell of the only ship in this describe's scope", () => {
         const cell = sinkingLogicBoard.getCell(3, 1);
         expect(cell).toBeFalsy();
      });

      test("should sink the only ship, thus, allowing the isAllShipsSunken method to return true", () => {
         sinkingLogicBoard.receiveAttack(3, 1);

         const cell = sinkingLogicBoard.getCell(3, 1);

         expect(cell).toBe("H");
         expect(sinkingLogicBoard.isAllShipsSunken()).toBeTruthy();
      });
   });
});
