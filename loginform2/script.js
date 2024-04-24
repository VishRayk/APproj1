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


const games = [
  'Snake',
  'Rock Paper Scissors',
  'Tic Tac Toe',
  'Chrome Dinosaur',
  'Maze Game',
  'Word Scramble'
];


function updateSearchSuggestions(input) {
  const searchSuggestions = document.getElementById('searchSuggestions');

  searchSuggestions.innerHTML = '';

  
  const filteredGames = games.filter(game => game.toLowerCase().includes(input.toLowerCase()));


  for (let i = 0; i < Math.min(filteredGames.length, 5); i++) {
    const suggestion = document.createElement('div');
    suggestion.textContent = filteredGames[i];
    suggestion.classList.add('suggestion');
    suggestion.addEventListener('click', () => {
      document.getElementById('searchInput').value = filteredGames[i];
      searchSuggestions.innerHTML = '';
   
      redirectToGame(filteredGames[i]);
    });
    searchSuggestions.appendChild(suggestion);
  }
}


function redirectToGame(game) {
  const gameURLs = {
    'Snake': 'https://snake-iota-nine.vercel.app/',
    'Rock Paper Scissors': 'https://rock-paper-game-eta.vercel.app/',
    'Tic Tac Toe': 'https://tic-tac-toe-seven-ashen.vercel.app/',
    'Chrome Dinosaur': 'https://chrome-dino-game-blush.vercel.app/',
    'Maze Game': 'https://maze-game-six-rust.vercel.app/',
    'Word Scramble': 'https://word-scramble-url.com/'
  };


  if (gameURLs.hasOwnProperty(game)) {
  
    window.location.href = gameURLs[game];
  } else {
    console.log(`URL not found for ${game}`);
  }
}


const searchInput = document.getElementById('searchInput');


searchInput.addEventListener('input', function (event) {
  const inputValue = event.target.value.trim();
  if (inputValue) {

    updateSearchSuggestions(inputValue);
  } else {
  
    document.getElementById('searchSuggestions').innerHTML = '';
  }
});

function redirectSearch() {
  var searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  if (searchInput !== "") {
    
    var gameUrls = {
      'Snake': 'https://snake-iota-nine.vercel.app/',
      'Rock Paper Scissors': 'https://rock-paper-game-eta.vercel.app/',
      'Tic Tac Toe': 'https://tic-tac-toe-seven-ashen.vercel.app/',
      'Chrome Dinosaur': 'https://chrome-dino-game-blush.vercel.app/',
      'Maze Game': 'https://maze-game-six-rust.vercel.app/',
      'Word Scramble': 'https://word-scramble-url.com/'
    };

   
    for (var gameName in gameUrls) {
      if (searchInput === gameName.toLowerCase()) {
     
        window.location.href = gameUrls[gameName];
        return; 
      }
    }

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
 
  var modal = document.getElementById("myModal");


  var rulesContent = document.getElementById("rules-content");

  
  var rules = getRules(game);

  rulesContent.textContent = rules;

  modal.style.display = "block";
}


function closeModal() {

  var modal = document.getElementById("myModal");

l
  modal.style.display = "none";
}

function getRules(game) {

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







