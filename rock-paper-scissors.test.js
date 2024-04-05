const { randomInt, getComputerChoice, playRound } = require('./rock-paper-scissors');

test('randomInt returns a number between 0 and x-1', () => {
  for (let i = 0; i < 100; i++) {
    let x = randomInt(10);
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
  }
});

test('getComputerChoice returns "rock", "paper", or "scissors"', () => {
  for (let i = 0; i < 100; i++) {
    let choice = getComputerChoice();
    expect(['rock', 'paper', 'scissors']).toContain(choice);
  }
});

test('playRound returns "player", "computer", or "draw"', () => {
  // Create a mock history element
  const history = {
    append: jest.fn(),
  };

  let result = playRound('rock', 'scissors', history);
  expect(result).toBe('player');
  result = playRound('scissors', 'rock', history);
  expect(result).toBe('computer');
  result = playRound('rock', 'rock', history);
  expect(result).toBe('draw');
});
test('playRound is fairly balanced', () => {
  const history = {
    append: jest.fn(),
  };

  let playerWins = 0;
  let computerWins = 0;
  let draws = 0;

  for (let i = 0; i < 10000; i++) {
    let playerChoice = getComputerChoice();
    let computerChoice = getComputerChoice();
    let result = playRound(playerChoice, computerChoice, history);

    if (result === 'player') {
      playerWins++;
    } else if (result === 'computer') {
      computerWins++;
    } else {
      draws++;
    }
  }

  // Assert that the wins and draws are within an acceptable range
  expect(playerWins).toBeGreaterThan(3000);
  expect(playerWins).toBeLessThan(7000);
  expect(computerWins).toBeGreaterThan(3000);
  expect(computerWins).toBeLessThan(7000);
  expect(draws).toBeGreaterThan(2000);
  expect(draws).toBeLessThan(6000);
});
