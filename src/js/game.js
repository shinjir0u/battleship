import GameBoard from "./gameboard";
import Gameplay from "./gameplay";
import Player from "./player";
import ShipSetup from "./shipSetup";

class Game {
  playGame() {
    const continueButton = document.querySelector(".continue-button");
    continueButton.addEventListener("click", clickButtonEvent);

    const player1 = new Player("player1", new GameBoard());
    const player2 = new Player("player2", new GameBoard());
    const shipSetup = new ShipSetup(player1).displayBoard();

    function clickButtonEvent(event) {
      const player = shipSetup.getPlayer();
      if (!player.getBoard().isSetupDone()) return null;
      player.getBoard().setup();
      if (player.getName() === "player1")
        shipSetup
          .setPlayer(player2)
          .displayBoard()
          .displayMessage()
          .displayShips();
      else if (player.getName() === "player2") {
        const shipsSetupElement = document.querySelector(".ships-setup");
        const gameboardElement = document.querySelector(".gameboard");

        const gameBoard1 = document.createElement("div");
        gameBoard1.classList.add("gameboard1");
        shipsSetupElement.replaceWith(gameBoard1);

        const gameBoard2 = document.createElement("div");
        gameBoard2.classList.add("gameboard2");
        gameboardElement.replaceWith(gameBoard2);

        const game = new Gameplay(player1, player2).startGame();
      }
      return true;
    }
  }
}

export default Game;
