import { Ship } from "../components/Ship";
import { initializeGameboard } from "../DomController";

describe.skip("Ship", () => {
   let ship;
   beforeAll(() => {
      ship = Ship(4, "horizontal");
   });
   test("should return ship length", () => {
      expect(ship.length).toBe(4);
   });
   test("should should return ship direction", () => {
      expect(ship.direction).toBe("horizontal");
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.hit();

      expect(ship.hits).toBe(1);
   });
   test("should return false since the ship is not sunk", () => {
      expect(ship.isSunk()).toBeFalsy();
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.hit();

      expect(ship.hits).toBe(2);
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.hit();

      expect(ship.hits).toBe(3);
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.hit();

      expect(ship.hits).toBe(4);
   });
   test("should return false since the ship is not sunk", () => {
      expect(ship.isSunk()).toBeTruthy();
   });
});
