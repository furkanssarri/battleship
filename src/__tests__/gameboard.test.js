import { Gameboard } from "../components/Gameboard";

describe("placeShip", () => {
   let board;
   beforeEach(() => {
      board = Gameboard(10);
   });

   test("should place a ship successfully for valid placement", () => {
      expect(() => board.placeShip(2, 3, 5, "horizontal")).not.toThrow();
      expect(() => board.placeShip(4, 6, 4, "vertical")).not.toThrow();
   });

   test("should throw an error for out-of-bounds horizontal placement", () => {
      expect(() => board.placeShip(2, 7, 5, "horizontal")).toThrow(
         "Invalid placement: Out of bounds or overlapping.",
      );
   });

   test("should throw an error for ocerlapping placement", () => {
      board.placeShip(2, 3, 5, "horizontal");
      expect(() => board.placeShip(2, 3, 4, "vertical")).toThrow(
         "Invalid placement: Out of bounds or overlapping.",
      );
   });
});

describe("hasShip", () => {
   let board;
   beforeEach(() => {
      board = Gameboard(10);
      board.placeShip(2, 3, 5, "horizontal");
   });

   test("should should return true for an occupied cell", () => {
      expect(board.hasShip(2, 3)).toBe(true);
      expect(board.hasShip(2, 7)).toBe(true);
   });

   test("should return false for an empty cell", () => {
      expect(board.hasShip(0, 0)).toBe(false);
      expect(board.hasShip(2, 8)).toBe(false);
   });
});

describe("getCell", () => {
   let board;
   beforeEach(() => {
      board = Gameboard(10);
      board.placeShip(2, 3, 5, "horizontal");
   });

   test("should should return null for an empty cell", () => {
      expect(board.getCell(0, 0)).toBeNull();
   });

   test("should should return the ship index for an occupied cell", () => {
      expect(typeof board.getCell(2, 3)).toBe("number"); // Ship index
   });

   test("should return 'H'for a hit cell", () => {
      board.receiveAttack(2, 3);
      expect(board.getCell(2, 3)).toBe("H");
   });

   test("should return 'X' for a miss cell", () => {
      board.receiveAttack(0, 3);
      expect(board.getCell(0, 3)).toBe("X");
   });
});

describe("receiveAttack", () => {
   let board;
   beforeEach(() => {
      board = Gameboard(10);
      board.placeShip(2, 3, 5, "horizontal");
   });

   test("should should mark a miss with 'X'", () => {
      board.receiveAttack(0, 1);
      expect(board.getCell(0, 1)).toBe("X");
   });

   test("should should mark a hit with 'H' and register the hit on the ship", () => {
      const ship = board.getShip(2, 3);

      board.receiveAttack(2, 3);
      expect(board.getCell(2, 3)).toBe("H");

      expect(ship.getHits()).toBe(1);

      board.receiveAttack(2, 4);

      expect(ship.getHits()).toBe(2);
   });

   test("should return a message already attacked cell", () => {
      board.receiveAttack(2, 3);
      expect(board.receiveAttack(2, 3)).toBe("Cell already attacked... Skipping...");
   });
});

describe("getShip", () => {
   let board;

   beforeEach(() => {
      board = Gameboard(10);
      board.placeShip(2, 3, 5, "horizontal");
      board.receiveAttack(2, 3);
   });

   test("should return the correct ship object for an occupied cell", () => {
      const ship = board.getShipIndex(2, 3);
      expect(ship).toBeDefined();
      expect(ship.length).toBe(5);
      expect(ship.direction).toBe("horizontal");
      expect(ship.getHits()).toBe(1);
   });

   test("should return undefined for an empty cell", () => {
      expect(board.getShip(0, 0)).toBeUndefined();
   });
});
