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

class Gameplay {
  #player1;

  #player2;

  #player1GameBoard = document.querySelector(".gameboard1");

  #player2GameBoard = document.querySelector(".gameboard2");

  #gameBoardMessage = document.querySelector(".result-message");

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
        if (column === 0) squareButton.classList.add("missed-square");
        else if (column === null) {
        } else squareButton.classList.add("attacked-square");
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
        otherBoardElement: this.#player2GameBoard,
        currentHandler: this.#player1GameBoardEventHandler,
        addNextHandler: () => this.#addGameBoard2ClickEventHandler(),
      },
      two: {
        currentPlayer: this.#player1,
        attackedPlayer: this.#player2,
        boardElement: this.#player2GameBoard,
        otherBoardElement: this.#player1GameBoard,
        currentHandler: this.#player2GameBoardEventHandler,
        addNextHandler: () => this.#addGameBoard1ClickEventHandler(),
      },
    };
    this.#gameBoardMessage.textContent = "Game Start. Player 1's turn.";
    this.#addEventsHandlers();
    this.#displayGameBoard(this.#player1, this.#player1GameBoard);
    this.#displayGameBoard(this.#player2, this.#player2GameBoard);
    const whiteMask = this.#createWhiteMask();
    this.#player1GameBoard.appendChild(whiteMask);
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
      const isGameOver = gameBoard.isAllShipsSunk();

      const gameBoardEventObject = this.#gameboardEvents[key];
      this.#gameBoardMessage.textContent = `${result}. `;
      let nextPlayer = gameBoardEventObject.currentPlayer.getName();
      const whiteMask = this.#createWhiteMask();

      this.#displayGameBoard(
        gameBoardEventObject.attackedPlayer,
        gameBoardEventObject.boardElement,
      );
      this.#displayGameBoard(
        gameBoardEventObject.currentPlayer,
        gameBoardEventObject.otherBoardElement,
      );
      if (isGameOver) {
        this.#gameBoardMessage.textContent = `Game Over. ${gameBoardEventObject.currentPlayer.getName()} wins.`;
        return this;
      }
      if (result === "miss") {
        nextPlayer = gameBoardEventObject.attackedPlayer.getName();
        gameBoardEventObject.boardElement.removeEventListener(
          "click",
          gameBoardEventObject.currentHandler,
        );
        nextPlayer = gameBoardEventObject.attackedPlayer.getName();
        gameBoardEventObject.addNextHandler();
        gameBoardEventObject.boardElement.appendChild(whiteMask);
      } else {
        gameBoardEventObject.otherBoardElement.appendChild(whiteMask);
      }
      this.#gameBoardMessage.textContent += `${nextPlayer}'s turn.`;
      return this;
    };
  }

  #createWhiteMask() {
    const whiteMask = document.createElement("div");
    whiteMask.classList.add("white-mask");
    return whiteMask;
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

export default Gameplay;
