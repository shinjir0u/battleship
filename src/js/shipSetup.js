class ShipSetup {
  #player;

  #gameboardElement = document.querySelector(".gameboard");

  #rotateButton = document.querySelector(".rotate-button");

  constructor(player) {
    this.#player = player;
    this.#rotateButton.addEventListener("click", this.#rotateButtonEvent);
  }

  displayBoard() {
    this.#gameboardElement.textContent = "";
    const gameboard = this.#player.getBoard();
    gameboard.getBoard().forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const squareButton = document.createElement("button");
        squareButton.dataset.rowIndex = rowIndex;
        squareButton.dataset.columnIndex = columnIndex;
        squareButton.style.cursor = "default";
        squareButton.classList.add("square");
        this.#gameboardElement.appendChild(squareButton);
      });
    });
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
}

export default ShipSetup;
