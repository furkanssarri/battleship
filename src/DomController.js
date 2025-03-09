import {
   handleCellClick,
   handleShipClick,
   callHighlightShipPlacement,
   isTouchDevice,
} from "./AppController";

export const renderGameBoards = (player1, player2) => {
   const container = document.createElement("div");
   container.classList.add("container");

   const player1GameboardDOM = _createGameBoardDOM(player1, handleCellClick);
   const player2GameboardDOM = _createGameBoardDOM(player2, handleCellClick);

   container.append(player1GameboardDOM, player2GameboardDOM);
   document.getElementById("root").appendChild(container);
};

export const renderShipPlacementBoard = (player) => {
   const overlay = document.createElement("div");
   overlay.classList.add("overlay");

   const popup = document.createElement("div");
   popup.classList.add("place-ships");

   const messageHeading = document.createElement("h3");
   messageHeading.textContent = "Place your ships";

   const messageBody = document.createElement("span");
   messageBody.classList.add("hint-span");

   messageBody.textContent = isTouchDevice()
      ? "Hint: You can right click to change your ship's orientation."
      : "Hint: You can press and hold to change your ship's orientation.";
   popup.append(messageHeading, messageBody);

   const gameBoardDOM = _createGameBoardDOM(
      player,
      (row, col, player, clickType) => handleShipClick(row, col, player, clickType),
      `${player.name}-popup`,
   );
   popup.appendChild(gameBoardDOM);

   const closeBtn = document.createElement("button");
   closeBtn.textContent = "Close";
   closeBtn.addEventListener("click", () => {
      document.getElementById("root").removeChild(overlay);
   });
   popup.appendChild(closeBtn);

   overlay.appendChild(popup);
   document.getElementById("root").appendChild(overlay);
};

export const getGridContainer = () => {
   return document.getElementById("player-1-popup");
};

export const addHighlight = (cell) => {
   cell.classList.add("highlight");
};

export const removeHighlights = (gridContainer) => {
   if (!gridContainer) return;

   const highlightedCells = gridContainer.querySelectorAll(".highlight");
   highlightedCells.forEach((cell) => {
      cell.classList.remove("highlight");
   });
};

export const UpdateGameboardDOM = (player) => {
   const originalGameboardElement = document.getElementById(player.name);
   const popupGameboardElement = document.getElementById(`${player.name}-popup`);
   const size = player.ownBoard.getGrid().length;

   const updateGameboardElement = (gameboardElement) => {
      if (!gameboardElement) return;
      for (let row = 0; row < size; row++) {
         for (let col = 0; col < size; col++) {
            const cell = gameboardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const isOccupied = player.ownBoard.hasShip(row, col);

            if (player.name != "player-2" && isOccupied) {
               cell.classList.add("ship");
            }
         }
      }
   };

   updateGameboardElement(originalGameboardElement);
   updateGameboardElement(popupGameboardElement);
};

export const updateCellContent = (row, col, playerName, isOccupied) => {
   const cell = _getCellElement(row, col, playerName);
   if (isOccupied === "H") {
      cell.classList.remove("ship");
      cell.classList.add("hit");
   } else if (isOccupied === "X") {
      cell.classList.add("miss");
   }
   cell.classList.add("disabled");
};

export const updateDomOnTurn = (turnInfo) => {
   const player1Board = document.querySelector("#player-1");
   const player2Board = document.querySelector("#player-2");

   if (turnInfo.name === "player-1") {
      player1Board.classList.add("disabled");
      player2Board.classList.remove("disabled");
   } else if (turnInfo.name === "player-2") {
      player2Board.classList.add("disabled");
      player1Board.classList.remove("disabled");
   }
};

export const removePlacementOverlay = () => {
   const overlay = document.querySelector(".overlay");
   setTimeout(() => {
      document.getElementById("root").removeChild(overlay);
   }, 1000);
};

export const updateGameOver = () => {
   _displayGameOver();
};

const _getCellElement = (row, col, playerName) => {
   const gameboard = document.getElementById(playerName);
   return gameboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
};

const _displayGameOver = () => {
   const overlay = document.createElement("div");
   overlay.classList.add("overlay");

   const announcementCard = document.createElement("div");
   announcementCard.classList.add("announcement-card");

   const announcement = document.createElement("h2");
   announcement.textContent = "Game Over";

   const closeButton = document.createElement("button");
   closeButton.textContent = "Close";
   closeButton.addEventListener("click", () => {
      // document.getElementById("root").removeChild(overlay);
      location.reload();
   });

   announcementCard.appendChild(announcement);
   announcementCard.appendChild(closeButton);
   overlay.appendChild(announcementCard);
   document.getElementById("root").appendChild(overlay);
};

const _createGameBoardDOM = (player, callback, customId = null) => {
   const size = player.ownBoard.getGrid().length;
   const playerName = customId || player.name;
   const gridContainer = document.createElement("div");
   gridContainer.classList.add("game-board");
   gridContainer.id = playerName;

   let longPressTimer = null;

   for (let col = 0; col < size; col++) {
      const colElement = document.createElement("div");
      colElement.classList.add("column");

      for (let row = 0; row < size; row++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.dataset.row = row;
         cell.dataset.col = col;
         const isOccupied = player.ownBoard.hasShip(row, col);
         if (player.name !== "player-2" && isOccupied) {
            cell.classList.add("ship");
         }
         cell.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
               callback(row, col, player, "left");
            } else if (event.button === 2) {
               callback(row, col, player, "right");
            }
         });

         // Touch events for press-and-hold (simulate right click)
         cell.addEventListener("touchstart", (event) => {
            // Prevent default behavior (e.g., scrolling)
            event.preventDefault();

            // Start a timer for long press
            longPressTimer = setTimeout(() => {
               callback(row, col, player, "right"); // Simulate right click
               longPressTimer = null; // Reset the timer
            }, 500); // 500ms delay for long press
         });

         cell.addEventListener("touchend", (event) => {
            // Clear the timer if the touch ends before the long press duration
            if (longPressTimer) {
               clearTimeout(longPressTimer);
               longPressTimer = null;
               callback(row, col, player, "left"); // Simulate left click
            }
         });

         cell.addEventListener("touchmove", (event) => {
            // Clear the timer if the user moves their finger
            if (longPressTimer) {
               clearTimeout(longPressTimer);
               longPressTimer = null;
            }
         });

         cell.addEventListener("mouseover", () => {
            callHighlightShipPlacement(row, col, player);
         });

         cell.addEventListener("mouseleave", () => {
            removeHighlights(gridContainer);
         });

         cell.addEventListener("contextmenu", (event) => {
            event.preventDefault();
         });

         colElement.appendChild(cell);
      }
      gridContainer.appendChild(colElement);
   }

   return gridContainer;
};
