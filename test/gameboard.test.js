import GameBoard from "../src/js/gameboard";

describe("gameboard test", () => {
  const gameboard = new GameBoard({
    carrierLocation: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
    ],
    battleshipLocation: [
      [5, 5],
      [6, 5],
      [7, 5],
      [8, 5],
    ],
    destroyerLocation: [
      [2, 8],
      [3, 8],
      [4, 8],
    ],
    submarineLocation: [
      [7, 8],
      [8, 8],
      [9, 8],
    ],
    patrolboatLocation: [
      [7, 1],
      [7, 2],
    ],
  });
  gameboard.setup();

  test("miss ship", () => {
    expect(gameboard.receiveAttack(4, 4)).toBe("miss");
  });
  test("out of range", () => {
    expect(gameboard.receiveAttack(10, 2)).toBe("invalid");
  });
  test("correct ship", () => {
    expect(gameboard.receiveAttack(7, 1)).toBe("attack");
  });
  test("sink ship", () => {
    expect(gameboard.receiveAttack(7, 1)).toBe("attacked");
    expect(gameboard.receiveAttack(7, 2)).toBe("attack");
    expect(gameboard.receiveAttack(3, 0)).toBe("attack");
    expect(gameboard.receiveAttack(3, 1)).toBe("attack");
    expect(gameboard.receiveAttack(3, 2)).toBe("attack");
    expect(gameboard.receiveAttack(3, 3)).toBe("attack");
    expect(gameboard.receiveAttack(3, 4)).toBe("attack");
    expect(gameboard.receiveAttack(5, 5)).toBe("attack");
    expect(gameboard.receiveAttack(6, 5)).toBe("attack");
    expect(gameboard.receiveAttack(7, 5)).toBe("attack");
    expect(gameboard.receiveAttack(8, 5)).toBe("attack");
    expect(gameboard.receiveAttack(1, 8)).toBe("miss");
    expect(gameboard.receiveAttack(2, 8)).toBe("attack");
    expect(gameboard.receiveAttack(3, 8)).toBe("attack");
    expect(gameboard.receiveAttack(4, 8)).toBe("attack");
    expect(gameboard.receiveAttack(7, 8)).toBe("attack");
    expect(gameboard.receiveAttack(8, 8)).toBe("attack");
    expect(gameboard.receiveAttack(9, 8)).toBe("attack");
    expect(gameboard.isAllShipsSunk()).toBeTruthy();
  });
});
