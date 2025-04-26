import "./css/style.css";
import Game from "./js/game";
import ShipSetup from "./js/shipSetup";
import GameBoard from "./js/gameboard";
import Player from "./js/player";

const shipSetup = new ShipSetup(
  new Player("Player1",
    new GameBoard(),
  ),
).displayBoard();
