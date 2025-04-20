import GameBoard from "./gameboard";
import Player from "./player";

const defaultGameboard = {
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
};

class Game {
  #player1;

  #player2;

  #player1GameBoard = document.querySelector(".gameboard1");

  #player2GameBoard = document.querySelector(".gameboard2");

  #playerToGetAttacked;

  constructor(
    player1 = new Player("Player1", new GameBoard(defaultGameboard)),
    player2 = new Player("Player2", new GameBoard(defaultGameboard)),
  ) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#playerToGetAttacked = player2;
  }

  #playRound(playerToGetAttacked, attackLocationX, attackLocationY) {
    const result = playerToGetAttacked
      .getBoard()
      .receiveAttack(attackLocationX, attackLocationY);
    return result;
  }

  #displayGameBoard(player, gameboardElement) {
    gameboardElement.textContext = "";
    const gameboard = player.getBoard();
    gameboard.getBoard().forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const squareButton = document.createElement("button");
        squareButton.dataset.rowIndex = rowIndex;
        squareButton.dataset.columnIndex = columnIndex;
        squareButton.classList.add("square");
        squareButton.textContent = column;
        gameboardElement.appendChild(squareButton);
      });
    });
  }

  startGame() {
    this.#playerToGetAttacked = this.#player2;
    this.#displayGameBoard(this.#player1, this.#player1GameBoard);
    this.#displayGameBoard(this.#player2, this.#player2GameBoard);
    return this;
  }

  #switchPlayer() {
    if (this.#playerToGetAttacked.name === this.#player1.name)
      return this.#player2;
    return this.#player1;
  }

  setPlayer1(player) {
    this.#player1 = player;
  }

  setPlayer2(player2) {
    this.#player2 = player2;
  }
}

export default Game;
