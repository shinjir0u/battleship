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

  #player1GameBoardEventHandler;

  #player2GameBoardEventHandler;

  #gameboardEvents;

  constructor(
    player1 = new Player("Player1", new GameBoard(defaultGameboard)),
    player2 = new Player("Player2", new GameBoard(defaultGameboard)),
  ) {
    this.#player1 = player1;
    this.#player2 = player2;
  }

  #playRound(playerToGetAttacked, attackLocationX, attackLocationY) {
    const result = playerToGetAttacked
      .getBoard()
      .receiveAttack(attackLocationX, attackLocationY);
    return result;
  }

  #displayGameBoard(player, gameboardElement) {
    gameboardElement.textContent = "";
    const gameboard = player.getBoard();
    const foggedBoard = gameboard.getFoggedBoard();
    gameboard.getFoggedBoard().forEach((row, rowIndex) => {
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
    this.#gameboardEvents = {
      one: {
        currentPlayer: this.#player2,
        attackedPlayer: this.#player1,
        boardElement: this.#player1GameBoard,
        currentHandler: this.#player1GameBoardEventHandler,
        addNextHandler: () => this.#addGameBoard2ClickEventHandler(),
      },
      two: {
        currentPlayer: this.#player1,
        attackedPlayer: this.#player2,
        boardElement: this.#player2GameBoard,
        currentHandler: this.#player2GameBoardEventHandler,
        addNextHandler: () => this.#addGameBoard1ClickEventHandler(),
      },
    };
    this.#addEventsHandlers();
    this.#displayGameBoard(this.#player1, this.#player1GameBoard);
    this.#displayGameBoard(this.#player2, this.#player2GameBoard);
    return this;
  }

  #addEventsHandlers() {
    this.#player1GameBoardEventHandler = this.#gameBoardClickEvent(
      this.#player1.getBoard(),
      "one",
    );
    this.#player2GameBoardEventHandler = this.#gameBoardClickEvent(
      this.#player2.getBoard(),
      "two",
    );
    this.#addGameBoard2ClickEventHandler();
  }

  #gameBoardClickEvent(gameBoard, key) {
    return (event) => {
      if (event.target.rowIndex === null) return null;

      const attackLocationX = event.target.dataset.rowIndex;
      const attackLocationY = event.target.dataset.columnIndex;
      const result = gameBoard.receiveAttack(attackLocationX, attackLocationY);

      const gameBoardEventObject = this.#gameboardEvents[key];
      if (result === "miss") {
        gameBoardEventObject.boardElement.removeEventListener(
          "click",
          gameBoardEventObject.currentHandler,
        );
        gameBoardEventObject.addNextHandler();
      }
      this.#displayGameBoard(
        gameBoardEventObject.attackedPlayer,
        gameBoardEventObject.boardElement,
      );

      return this;
    };
  }

  #addGameBoard1ClickEventHandler() {
    this.#player1GameBoard.addEventListener(
      "click",
      this.#player1GameBoardEventHandler,
    );
    this.#player2GameBoard.removeEventListener(
      "click",
      this.#player2GameBoardEventHandler,
    );
  }

  #addGameBoard2ClickEventHandler() {
    this.#player2GameBoard.addEventListener(
      "click",
      this.#player2GameBoardEventHandler,
    );
    this.#player1GameBoard.removeEventListener(
      "click",
      this.#player1GameBoardEventHandler,
    );
  }

  setPlayer1(player) {
    this.#player1 = player;
  }

  setPlayer2(player2) {
    this.#player2 = player2;
  }
}

export default Game;
