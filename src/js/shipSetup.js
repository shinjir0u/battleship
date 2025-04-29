class ShipSetup {
  #player;

  #message = document.querySelector(".result-message");

  #gameboardElement = document.querySelector(".gameboard");

  #rotateButton = document.querySelector(".rotate-button");

  #resetButton = document.querySelector(".reset-button");

  #shipSetupData;

  constructor(player) {
    this.#player = player;
    this.#resetButton.addEventListener("click", () => this.#resetButtonEvent());
    this.#rotateButton.addEventListener("click", () =>
      this.#rotateButtonEvent(),
    );
    this.displayMessage();
    this.#addDragEffects();
    this.#shipSetupData = new Map([
      [
        "carrier",
        (location) => this.#player.getBoard().setCarrierLocation(location),
      ],
      [
        "battleship",
        (location) => this.#player.getBoard().setBattleshipLocation(location),
      ],
      [
        "destroyer",
        (location) => this.#player.getBoard().setDestroyerLocation(location),
      ],
      [
        "submarine",
        (location) => this.#player.getBoard().setSubmarineLocation(location),
      ],
      [
        "patrol-boat",
        (location) => this.#player.getBoard().setPatrolboatLocation(location),
      ],
    ]);
  }

  displayBoard() {
    this.#gameboardElement.textContent = "";
    const gameboard = this.#player.getBoard();
    gameboard.getBoard().forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const squareButton = document.createElement("div");
        squareButton.dataset.rowIndex = rowIndex;
        squareButton.dataset.columnIndex = columnIndex;
        squareButton.classList.add("square");
        this.#gameboardElement.appendChild(squareButton);
      });
    });
    return this;
  }

  displayShips() {
    const hiddenShips = document.querySelectorAll(".ship");
    hiddenShips.forEach((ship) => (ship.hidden = false));
    return this;
  }

  displayMessage() {
    this.#message.textContent = `${this.#player.getName()}'s turn to setup.`;
    return this;
  }

  #rotateButtonEvent(event) {
    const ships = document.querySelectorAll(".ships-setup .ship");
    ships.forEach((ship) => {
      if (ship.classList.contains("vertical"))
        ship.classList.remove("vertical");
      else ship.classList.add("vertical");
    });
    return this;
  }

  #resetButtonEvent(event) {
    const shipsElement = document.querySelectorAll(".ship");
    shipsElement.forEach((ship) => (ship.hidden = false));

    this.displayBoard();
  }

  #setShipOnBoard(ship, location) {
    const setShip = this.#shipSetupData.get(ship);
    return setShip(location);
  }

  getPlayer() {
    return this.#player;
  }

  setPlayer(player) {
    this.#player = player;
    return this;
  }

  #addDragEffects() {
    let draggedShip;
    const ships = document.querySelectorAll(".ships-setup .ship");
    this.#gameboardElement.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    ships.forEach((ship) =>
      ship.addEventListener("dragstart", (event) => {
        draggedShip = ship;
      }),
    );

    this.#gameboardElement.addEventListener("drop", (event) => {
      event.preventDefault();
      const cellSize = 50;
      const boardRect = this.#gameboardElement.getBoundingClientRect();
      const shipRect = event.target.getBoundingClientRect();

      const x = Math.floor((shipRect.x - boardRect.x) / cellSize);
      const y = Math.floor((shipRect.y - boardRect.y) / cellSize);
      const { length } = draggedShip.dataset;
      const isVertical = draggedShip.classList.contains("vertical");
      const shipType = draggedShip.classList[1];
      let shipLocation = [];
      if (isVertical) {
        for (let i = 0; i < length; i++) {
          shipLocation = [...shipLocation, [y + i, x]];
        }
      } else {
        for (let i = 0; i < length; i++) {
          shipLocation = [...shipLocation, [y, x + i]];
        }
      }
      const result = this.#setShipOnBoard(shipType, shipLocation);
      if (result === null) return null;

      const newShip = document.createElement("div");
      newShip.classList.add("placed-ship");

      if (isVertical) {
        newShip.style.width = `${cellSize}px`;
        newShip.style.height = `${cellSize * length}px`;
      } else {
        newShip.style.height = `${cellSize}px`;
        newShip.style.width = `${cellSize * length}px`;
      }

      newShip.style.left = `${x * cellSize + x * 2}px`;
      newShip.style.top = `${y * cellSize + y * 2}px`;
      if (
        Number(newShip.style.width.split("px")[0]) +
          Number(newShip.style.left.split("px")[0]) >
          boardRect.right - boardRect.left ||
        Number(newShip.style.height.split("px")[0]) +
          Number(newShip.style.top.split("px")[0]) >
          boardRect.bottom - boardRect.top
      )
        return null;
      this.#gameboardElement.appendChild(newShip);
      draggedShip.hidden = true;
    });
  }
}

export default ShipSetup;
