import "./css/style.css";
import Game from "./js/game";
import ShipSetup from "./js/shipSetup";
import GameBoard from "./js/gameboard";
import Player from "./js/player";

const shipSetup = new ShipSetup(
  new Player("Player1",
    new GameBoard({
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
    }),
  ),
).displayBoard();
