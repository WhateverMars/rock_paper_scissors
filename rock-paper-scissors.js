document.addEventListener("DOMContentLoaded", () => {
  playGame()
});

function randomInt(x) {
  return Math.floor(Math.random() * x);
}

function getComputerChoice() {
  var options = ["rock", "paper", "scissors"];
  var index = randomInt(3);
  return options[index];
}

function playRound(playerChoice, computerChoice) {
  let history = document.querySelector("#history");
  if (computerChoice === playerChoice) {
    var li = document.createElement("li");
    li.innerHTML = `It's a draw you both picked ${playerChoice}.`;
    history.append(li);
    return "draw";
  }
  if (
    (playerChoice == "rock" && computerChoice == "scissors") ||
    (playerChoice == "scissors" && computerChoice == "paper") ||
    (playerChoice == "paper" && computerChoice == "rock")
  ) {
    var li = document.createElement("li");
    li.innerHTML = `You Win! ${playerChoice} beats ${computerChoice}.`;
    history.append(li);
    return "player";
  }
  var li = document.createElement("li");
  li.innerHTML = `You Lose! ${computerChoice} beats ${playerChoice}.`;
  history.append(li);
  return "computer";
}

function playGame() {
  let buttons = document.querySelectorAll(".choice");
  let result = document.querySelector("#result");
  let round = 1;
  let playerPoints = 0;
  let computerPoints = 0;
  buttons.forEach((button) => {
    button.onclick = () => {
      let playerChoice = button.dataset.choice.toLowerCase();
      console.log("You picked: " + playerChoice);

      let computerChoice = getComputerChoice();
      console.log("Computer picked: " + computerChoice);
      var winner = playRound(playerChoice, computerChoice);
      if (winner == "player") {
        playerPoints++;
      } else if (winner == "computer") {
        computerPoints++;
      }
      console.log({ playerPoints });
      if (round >= 5) {
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
      round++;
    };
  });
  document.querySelector("#replay-btn").onclick = () => {
    document.querySelector("#history").innerHTML = "";
    document.querySelector("#replay-btn").hidden = true;
    buttons.forEach((button) => {
      button.disabled = false;
    });
    round = 1;
    playerPoints = 0;
    computerPoints = 0;
    result.innerHTML = "";
  };
}
