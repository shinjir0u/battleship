import Ship from "../src/js/ship";

describe("test ship", () => {
  const ship = new Ship("crusader", 3);
  test("ship hit", () => {
    expect(ship.name()).toBe("crusader");
    expect(ship.length()).toBe(3);
    ship.hit();
    expect(ship.hit()).toBe(2);
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
