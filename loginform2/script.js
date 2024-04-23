let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  if (value < 380) {
    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 1 + 'px';
  }
  console.log(value);
})

// List of available game names
const games = [
  'Snake',
  'Rock Paper Scissors',
  'Tic Tac Toe',
  'Chrome Dinosaur',
  'Maze Game',
  'Word Scramble'
];

// Function to update search suggestions based on input value
function updateSearchSuggestions(input) {
  const searchSuggestions = document.getElementById('searchSuggestions');
  // Clear previous suggestions
  searchSuggestions.innerHTML = '';

  // Filter games based on input value
  const filteredGames = games.filter(game => game.toLowerCase().includes(input.toLowerCase()));

  // Display up to 5 matching suggestions
  for (let i = 0; i < Math.min(filteredGames.length, 5); i++) {
    const suggestion = document.createElement('div');
    suggestion.textContent = filteredGames[i];
    suggestion.classList.add('suggestion');
    suggestion.addEventListener('click', () => {
      document.getElementById('searchInput').value = filteredGames[i];
      searchSuggestions.innerHTML = '';
      // Redirect to the appropriate URL for the selected game
      redirectToGame(filteredGames[i]);
    });
    searchSuggestions.appendChild(suggestion);
  }
}

// Function to redirect to the appropriate URL for the selected game
function redirectToGame(game) {
  const gameURLs = {
    'Snake': 'https://snake-iota-nine.vercel.app/',
    'Rock Paper Scissors': 'https://rock-paper-game-eta.vercel.app/',
    'Tic Tac Toe': 'https://tic-tac-toe-seven-ashen.vercel.app/',
    'Chrome Dinosaur': 'https://chrome-dino-game-blush.vercel.app/',
    'Maze Game': 'https://maze-game-six-rust.vercel.app/',
    'Word Scramble': 'https://word-scramble-url.com/'
  };

  // Check if the game is present in the URLs object
  if (gameURLs.hasOwnProperty(game)) {
    // Redirect to the game URL
    window.location.href = gameURLs[game];
  } else {
    console.log(`URL not found for ${game}`);
  }
}

// Get the input element
const searchInput = document.getElementById('searchInput');

// Add event listener for input event on search input
searchInput.addEventListener('input', function (event) {
  const inputValue = event.target.value.trim();
  if (inputValue) {
    // Update search suggestions based on input value
    updateSearchSuggestions(inputValue);
  } else {
    // Clear search suggestions if input is empty
    document.getElementById('searchSuggestions').innerHTML = '';
  }
});

function redirectSearch() {
  var searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  if (searchInput !== "") {
    // Define an object to map game names to their respective URLs
    var gameUrls = {
      'Snake': 'https://snake-iota-nine.vercel.app/',
      'Rock Paper Scissors': 'https://rock-paper-game-eta.vercel.app/',
      'Tic Tac Toe': 'https://tic-tac-toe-seven-ashen.vercel.app/',
      'Chrome Dinosaur': 'https://chrome-dino-game-blush.vercel.app/',
      'Maze Game': 'https://maze-game-six-rust.vercel.app/',
      'Word Scramble': 'https://word-scramble-url.com/'
    };

    // Check if the search input matches any of the game names
    for (var gameName in gameUrls) {
      if (searchInput === gameName.toLowerCase()) {
        // Redirect the user to the corresponding game URL
        window.location.href = gameUrls[gameName];
        return; // Exit the function early if a match is found
      }
    }

    // If no match is found, redirect to a generic search page or show an error message
    // Replace 'YOUR_GENERIC_SEARCH_URL' with the URL of your generic search page
    window.location.href = 'http://127.0.0.1:3000/main_website/index.html?q=' + searchInput;
  }
}



// Loop through each game container
games.forEach(function (game) {
  // Add click event listener to each game container
  game.addEventListener("click", function () {
    // Toggle the visibility of the play and rules buttons
    var playButton = this.querySelector(".play-button");
    var rulesButton = this.querySelector(".rules-button");
    playButton.style.display = playButton.style.display === "none" ? "" : "none";
    rulesButton.style.display = rulesButton.style.display === "none" ? "" : "none";
  });
});
function showButtons(element) {
  // Toggle visibility of play and rules buttons for the clicked game
  var playButton = element.querySelector(".play-button");
  var rulesButton = element.querySelector(".rules-button");

  playButton.style.display = "block";
  rulesButton.style.display = "block";
}

function scrollToAboutUs() {
  const aboutUsSection = document.querySelector(".about-us");
  aboutUsSection.scrollIntoView({ behavior: "smooth" });
}

function showRules(game) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the rules content element
  var rulesContent = document.getElementById("rules-content");

  // Fetch the rules based on the selected game (you can replace this with your own logic)
  var rules = getRules(game);

  // Set the rules content in the modal
  rulesContent.textContent = rules;

  // Display the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Hide the modal
  modal.style.display = "none";
}
// Function to get rules based on the selected game (replace this with your own logic)
function getRules(game) {
  // Example: returning hardcoded rules for different games
  switch (game) {
    case "snake":
      return " The player controls a snake that moves around a game board. The goal is to eat as many balls as possible without colliding with the walls of the game board or the snake's own body."
        + " The snake moves continuously in a specific direction (up, down, left, or right) controlled by the player's input (arrow keys or similar controls). "
        + "Each time the snake eats a ball, the player earns points. The score increases with each ball eaten. "
    case "rock-paper-scissors":
      return " The objective of the game is to defeat the opponent by selecting a gesture that defeats theirs." + " Each player simultaneously selects one of three gestures:Rock: Signified by a clenched fist.Paper: Signified by an open hand.Scissors: Signified by a fist with the index and middle fingers extended, forming a V shape.Rock crushes scissors (Rock wins against scissors). Scissors cut paper (Scissors win against paper).Paper covers rock (Paper wins against rock).";
    case "tic-tac-toe":
      return "A two-player game where each player takes turns marking spaces in a 3x3 grid, trying to get three of their symbols in a row.";
    case "chrome-dino-":
      return "The objective of the game is to control the T-Rex dinosaur character and guide it through obstacles for as long as possible while avoiding collisions."
    case "maze-game-":
      return "The objective of the maze game is to navigate a player-controlled character through a maze from a designated starting point to an endpoint or goal."
    default:
      return "No rules available for this game.";
  }
}







