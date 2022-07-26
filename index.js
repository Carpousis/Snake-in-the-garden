let grid = document.querySelector(".grid")

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay)
})

const createBoard = () => {
    popup.style.display = "none";
        for (let i = 0; i < 100; i++) {
            let div = document.createElement("div");
            grid.appendChild(div);
        }
}

let popup = document.querySelector(".popup")

let playAgain = document.querySelector(".playAgain")
let scoreDisplay = document.querySelector(".scoreDisplay")

let top = document.querySelector(".top")
let right = document.querySelector(".right")
let  bottom= document.querySelector(".bottom")
let left = document.querySelector(".left")

let width = 10;
let currentIndex = 0; 
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1; 
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

const startGame = () => {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
        currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutome, intervalTime);
}

const moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("Hit Something");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

const moveSnake = (squares) => {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] = direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

const checkForHits = (squares) => {
    if(
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classlist.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

const eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = interval * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

const randomApple = (squares) => {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

const control = (e) => {
    if (e.keycode === 39) {
        direction = 1;
    } else if (e.keycode === 38) {
        direction = -width;
    } else if (e.keycode === 37) {
        direction = -1;
    } else if (e.keycode === 40) {
        direciton = +width;
    }
}