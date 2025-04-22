class Player {
  #name;

  #gameboard;

  constructor(name, gameboard) {
    this.#name = name;
    this.#gameboard = gameboard;
  }

  isGameOver() {
    return this.#gameboard.isAllShipsSunk();
  }

  getBoard() {
    return this.#gameboard;
  }

  getName() {
    return this.#name;
  }
}

export default Player;