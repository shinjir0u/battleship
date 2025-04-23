import Ship from "./ship";

class GameBoard {
  #board = Array.from({ length: 10 }, () => Array(10).fill(0));

  #foggedBoard = Array.from({ length: 10 }, () => Array(10).fill(null));

  #carrierLocation;

  #battleshipLocation;

  #destroyerLocation;

  #submarineLocation;

  #patrolboatLocation;

  #ships;

  constructor({
    carrierLocation,
    battleshipLocation,
    destroyerLocation,
    submarineLocation,
    patrolboatLocation,
  } = {}) {
    this.#carrierLocation = carrierLocation;
    this.#battleshipLocation = battleshipLocation;
    this.#destroyerLocation = destroyerLocation;
    this.#submarineLocation = submarineLocation;
    this.#patrolboatLocation = patrolboatLocation;
    this.setup();
  }

  receiveAttack(x, y) {
    const foggedBoard = this.#foggedBoard;
    if (x >= 10 || this.#board[x] === undefined) return "invalid";
    if (this.#foggedBoard[x][y]) return "attacked";
    if (this.#board[x][y] === 0) {
      this.#foggedBoard[x][y] = 0;
      return "miss";
    }
    const value = this.#board[x][y];
    if (this.#ships.has(this.#board[x][y])) {
      const shipObject = this.#ships.get(this.#board[x][y]);
      this.#foggedBoard[x][y] = shipObject.symbol;
      const numberOfTimesHit = shipObject.ship.hit();
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
        "Carrier",
        {
          ship: new Ship("Carrier", 5),
          location: this.#carrierLocation,
          symbol: "c",
        },
      ],
      [
        "Battleship",
        {
          ship: new Ship("Battleship", 4),
          location: this.#battleshipLocation,
          symbol: "b",
        },
      ],
      [
        "Destroyer",
        {
          ship: new Ship("Destroyer", 3),
          location: this.#destroyerLocation,
          symbol: "d",
        },
      ],
      [
        "Submarine",
        {
          ship: new Ship("Submarine", 3),
          location: this.#submarineLocation,
          symbol: "s",
        },
      ],
      [
        "Patrol Boat",
        {
          ship: new Ship("Patrol Boat", 2),
          location: this.#patrolboatLocation,
          symbol: "p",
        },
      ],
    ]);
    this.#board = this.#setShipsOnBoard(this.#ships, this.#board);
  }

  #setShipsOnBoard(ships, board) {
    const gameboard = board;
    ships.forEach((ship, shipName, map) => {
      const locations = ship.location;
      locations.forEach((location) => {
        gameboard[location[0]][location[1]] = ship.ship.name();
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

  getBoard() {
    return this.#board;
  }

  getFoggedBoard() {
    return this.#foggedBoard;
  }
}

export default GameBoard;
