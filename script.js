let gameBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var playerWin = false;
function board() {
  let p1_turn = true;

  return (turn, info) => {
    // place move
    info.textContent = "Player Turn"
    if(!playerWin){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (turn == gameBoard[i][j] && (gameBoard[i][j] !== 'X' && gameBoard[i][j] !== 'O')) {
                    gameBoard[i][j] = p1_turn ? 'X' : 'O';
                    console.log(gameBoard[i][j])
                    p1_turn = !p1_turn;
                }
            }
        }
    }

    // check for win
    if (checkWin()) {
      info.textContent = "Game Over!";
      playerWin = true;
    }   

    return p1_turn ? 'O' : 'X';
  };
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
      console.log("Player wins with row " + (i + 1));
      return true;
    }
  }

  for (let j = 0; j < 3; j++) {
    if (gameBoard[0][j] === gameBoard[1][j] && gameBoard[1][j] === gameBoard[2][j]) {
      console.log("Player wins with column " + (j + 1));
      return true;
    }
  }

  if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
    console.log("Player wins diagonally (\\)");
    return true;
  }
  if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
    console.log("Player wins diagonally (/)");
    return true;
  }

  return false;
}

let play = board();

const grid = document.querySelectorAll('span');
const info = document.querySelector('#info');
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
const firstP = document.querySelector('#firstP');
const secondP = document.querySelector('#secondP');


start.addEventListener('click', () => {
  if (firstP.textContent.trim().length > 0 && secondP.textContent.trim().length > 0) {
    console.log("Players ready!");

    grid.forEach(span => {
      if (!span.dataset.bound) {  // prevent multiple listeners
        span.addEventListener("click", () => {
          if (span.textContent === "X" || span.textContent === "O" || playerWin) {
            return; // block overwriting or moves after win
          }
          span.textContent = play(span.getAttribute('id'), info);
        });

        span.dataset.bound = true; // mark as already bound
      }
    });

    info.textContent = "Game Started! Player X first";
  }
});



reset.addEventListener('click', () => {
  grid.forEach(span => {
    span.textContent = '';
    gameBoard = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
    info.textContent = "Press Start to Begin!"
    playerWin = false;
    console.log(gameBoard)
  });
})


/**
 * - Get Two Player Names
 * / Get inputs one by one
 * / Write inputs in the gameBoard
 * / Check if the Gameboard has winning condition
 * / Check if input is repeated
 * / Complete a Game
 * / Reset Board
 */