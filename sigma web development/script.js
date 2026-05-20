const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

function cellClicked() {
  const index = Array.from(cells).indexOf(this);
  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer); // X বা O এর রঙ যোগ করা

  checkWinner();
}

function checkWinner() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  let won = false;
  for (let condition of winConditions) {
    const [a,b,c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      running = false;
      won = true;
      break;
    }
  }

  if (!won) {
    if (!board.includes("")) {
      statusText.textContent = "It's a Draw!";
      running = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winner");
  });
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  running = true;
}

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);

