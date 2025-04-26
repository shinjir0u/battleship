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

  #shipsLocation = [];

  constructor({
    carrierLocation = [],
    battleshipLocation = [],
    destroyerLocation = [],
    submarineLocation = [],
    patrolboatLocation = [],
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
    this.#ships.forEach((ship) => {
      this.#shipsLocation = [
        ...this.#shipsLocation,
        ...ship.location.map((location) => location.toString()),
      ];
    });
    this.#board = this.#setShipsOnBoard(this.#ships, this.#board);
  }

  #updateLocation(location) {
    this.#shipsLocation = [
      ...this.#shipsLocation,
      ...location.map((point) => point.toString()),
    ];
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

  clear() {
    this.#shipsLocation = [];
    this.#carrierLocation = [];
    this.#battleshipLocation = [];
    this.#destroyerLocation = [];
    this.#patrolboatLocation = [];
    this.#submarineLocation = [];
  }

  isLocationValid(location) {
    const locations = this.#shipsLocation;
    const loca = location;
    return (
      location.filter((point) => this.#shipsLocation.includes(point.toString()))
        .length === 0
    );
  }

  setCarrierLocation(carrierLocation) {
    if (!this.isLocationValid(carrierLocation)) return null;
    this.#carrierLocation = carrierLocation;
    this.#updateLocation(carrierLocation);
    return "set";
  }

  setBattleshipLocation(battleshipLocation) {
    if (!this.isLocationValid(battleshipLocation)) return null;
    this.#battleshipLocation = battleshipLocation;
    this.#updateLocation(battleshipLocation);
    return "set";
  }

  setDestroyerLocation(destroyerLocation) {
    if (!this.isLocationValid(destroyerLocation)) return null;
    this.#destroyerLocation = destroyerLocation;
    this.#updateLocation(destroyerLocation);
    return "set";
  }

  setSubmarineLocation(submarineLocation) {
    if (!this.isLocationValid(submarineLocation)) return null;
    this.#submarineLocation = submarineLocation;
    this.#updateLocation(submarineLocation);
    return "set";
  }

  setPatrolboatLocation(patrolboatLocation) {
    if (!this.isLocationValid(patrolboatLocation)) return null;
    this.#patrolboatLocation = patrolboatLocation;
    this.#updateLocation(patrolboatLocation);
    return "set";
  }

  getBoard() {
    return this.#board;
  }

  getFoggedBoard() {
    return this.#foggedBoard;
  }
}

export default GameBoard;
