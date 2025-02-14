import { createShip } from "../components/createShip";

describe("Ship", () => {
   let ship;
   beforeAll(() => {
      ship = createShip(4, "horizontal");
   });
   test("should return ship length", () => {
      expect(ship.length).toBe(4);
   });
   test("should should return ship direction", () => {
      expect(ship.direction).toBe("horizontal");
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.getHit();

      expect(ship.length).toBe(3);
   });
   test("should return false since the ship is not sunk", () => {
      expect(ship.isSunk()).toBeFalsy();
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.getHit();

      expect(ship.length).toBe(2);
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.getHit();

      expect(ship.length).toBe(1);
   });
   test("should get hit and lose 1 unit of length appropriately", () => {
      ship.getHit();

      expect(ship.length).toBe(0);
   });
   test("should return false since the ship is not sunk", () => {
      expect(ship.isSunk()).toBeTruthy();
   });
});
