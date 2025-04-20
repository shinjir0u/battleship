import Ship from "./ship";

class GameBoard {
  #board = Array.from({ length: 10 }, () => Array(10).fill(0));

  #carrierLocation;

  #battleshipLocation;

  #destroyerLocation;

  #submarineLocation;

  #patrolboatLocation;

  #receivedAttacks;

  #ships;

  constructor({
    carrierLocation,
    battleshipLocation,
    destroyerLocation,
    submarineLocation,
    patrolboatLocation,
  }) {
    this.#carrierLocation = carrierLocation;
    this.#battleshipLocation = battleshipLocation;
    this.#destroyerLocation = destroyerLocation;
    this.#submarineLocation = submarineLocation;
    this.#patrolboatLocation = patrolboatLocation;
  }

  receiveAttack(x, y) {
    if (x >= 10 || this.#board[x][y] === undefined) return "invalid";
    if (this.#receivedAttacks.has(`${x}, ${y}`)) return "attacked";
    this.#receivedAttacks.add(`${x}, ${y}`);
    if (this.#board[x][y] === 0) return "miss";
    if (this.#ships.has(this.#board[x][y])) {
      const shipObject = this.#ships.get(this.#board[x][y]).ship;
      const numberOfTimesHit = shipObject.hit();
      return "attack";
    }
    return "invalid";
  }

  isAllShipsSunk() {
    return Array.from(this.#ships).every(
      (ship) => ship[1].ship.isSunk() === true,
    );
  }

  setup() {
    this.#ships = new Map([
      [
        "carrier",
        {
          ship: new Ship("Carrier", 5),
          location: this.#carrierLocation,
          symbol: "c",
        },
      ],
      [
        "battleship",
        {
          ship: new Ship("Battleship", 4),
          location: this.#battleshipLocation,
          symbol: "b",
        },
      ],
      [
        "destroyer",
        {
          ship: new Ship("Destroyer", 3),
          location: this.#destroyerLocation,
          symbol: "d",
        },
      ],
      [
        "submarine",
        {
          ship: new Ship("Submarine", 3),
          location: this.#submarineLocation,
          symbol: "s",
        },
      ],
      [
        "patrolboat",
        {
          ship: new Ship("Patrol Boat", 2),
          location: this.#patrolboatLocation,
          symbol: "p",
        },
      ],
    ]);
    this.#receivedAttacks = new Set();
    this.#board = this.#setShipsOnBoard(this.#ships, this.#board);
  }

  #setShipsOnBoard(ships, board) {
    const gameboard = board;
    ships.forEach((ship, shipName, map) => {
      const locations = ship.location;
      locations.forEach((location) => {
        gameboard[location[0]][location[1]] = shipName;
      });
    });
    return gameboard;
  }

  setCarrierLocation(carrierLocation) {
    this.#carrierLocation = carrierLocation;
  }

  setBattleshipLocation(battleshipLocation) {
    this.#battleshipLocation = battleshipLocation;
  }

  setDestroyerLocation(destroyerLocation) {
    this.#destroyerLocation = destroyerLocation;
  }

  setSubmarineLocation(submarineLocation) {
    this.#submarineLocation = submarineLocation;
  }

  setPatrolboatLocation(patrolboatLocation) {
    this.#patrolboatLocation = patrolboatLocation;
  }
}

export default GameBoard;
