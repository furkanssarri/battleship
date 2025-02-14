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
});
