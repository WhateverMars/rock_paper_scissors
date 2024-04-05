/**
 * Plays the rock-paper-scissors game.
 */
document.addEventListener("DOMContentLoaded", () => {
  playGame();
});

/**
 * Generates a random integer between 0 and x-1.
 * @param {number} x - The upper bound (exclusive) for the random number.
 * @returns {number} The random integer.
 */
function randomInt(x) {
  return Math.floor(Math.random() * x);
}

/**
 * Generates a random choice for the computer player.
 * @returns {string} The computer's choice.
 */
function getComputerChoice() {
  var options = ["rock", "paper", "scissors"];
  var index = randomInt(3);
  return options[index];
}

/**
 * Plays a single round of the game.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {string} The winner of the round: "player", "computer", or "draw".
 */
function playRound(playerChoice, computerChoice, history) {

  if (computerChoice === playerChoice) {
    var li = document.createElement("li");
    li.textContent = `It's a draw! You both picked ${playerChoice}.`;
    history.append(li);
    return "draw";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    var li = document.createElement("li");
    li.textContent = `You Win! ${playerChoice} beats ${computerChoice}.`;
    history.append(li);
    return "player";
  }
  var li = document.createElement("li");
  li.textContent = `You Lose! ${computerChoice} beats ${playerChoice}.`;
  history.append(li);
  return "computer";
}

/**
 * Starts the game and handles user interactions.
 */
function playGame() {
  let buttons = document.querySelectorAll(".choice");
  let history = document.querySelector("#history");
  let round = 1;
  let playerPoints = 0;
  let computerPoints = 0;

  buttons.forEach((button) => {
    button.onclick = () => {
      let playerChoice = button.dataset.choice.toLowerCase();
      console.log("You picked: " + playerChoice);

      let computerChoice = getComputerChoice();
      console.log("Computer picked: " + computerChoice);

      var winner = playRound(playerChoice, computerChoice, history);
      if (winner == "player") {
        playerPoints++;
      } else if (winner == "computer") {
        computerPoints++;
      }
      console.log({ playerPoints });
      console.log({ computerPoints });
      if (round >= 5) {
        endGame(playerPoints, computerPoints);
      }
      round++;
    };
  });

  document.querySelector("#replay-btn").onclick = () => {
    resetGame();
  };

  /**
   * Ends the game and displays the result.
   * @param {number} playerPoints - The player's total points.
   * @param {number} computerPoints - The computer's total points.
   */
  function endGame(playerPoints, computerPoints) {
    let result = document.querySelector("#result");
    let buttons = document.querySelectorAll(".choice");

    buttons.forEach((button) => {
      button.disabled = true;
    });

    if (playerPoints > computerPoints) {
      result.innerHTML = `You Win! You won ${Math.floor(playerPoints)} out of 5.`;
    } else if (playerPoints < computerPoints) {
      result.innerHTML = `You lost! You won ${Math.floor(playerPoints)} out of 5.`;
    } else {
      result.innerHTML = `It was a draw! You won ${Math.floor(playerPoints)} out of 5.`;
    }

    document.querySelector("#replay-btn").hidden = false;
  }

  /**
   * Resets the game to its initial state.
   */
  function resetGame() {
    let buttons = document.querySelectorAll(".choice");
    let history = document.querySelector("#history");
    let result = document.querySelector("#result");

    buttons.forEach((button) => {
      button.disabled = false;
    });

    history.innerHTML = "";
    document.querySelector("#replay-btn").hidden = true;
    result.innerHTML = "";

    // Reset game values to initial
    round = 1;
    playerPoints = 0;
    computerPoints = 0;
  }
}

module.exports = { randomInt, getComputerChoice, playRound };