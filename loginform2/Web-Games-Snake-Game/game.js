import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood, getScore } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
const currentScoreEl = document.getElementById('current-score');
const highScoreEl = document.getElementById('high-score');

let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreEl.textContent = 'High Score: ' + highScore;

function main(currentTime) {
    if (gameOver) {
        if (getScore() > highScore) {
            highScore = getScore();
            highScoreEl.textContent = 'High Score: ' + highScore;
            localStorage.setItem('highScore', highScore.toString());
            alert('New high score!');
        }
        if (confirm('You lost. Press OK to restart.')) {
            window.location = 'index.html';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    updateScore(getScore()); // Update score based on the score returned by the food module
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function updateScore(currentScore) {
    currentScoreEl.textContent = 'Score: ' + currentScore;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreEl.textContent = 'High Score: ' + highScore;
        localStorage.setItem('highScore', highScore.toString());
    }

    // Only show the alert if the game is over
    if (gameOver && currentScore > highScore) {
        alert('New high score!');
    }
}
