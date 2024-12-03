const elements = document.querySelectorAll('.object');

// Elements
let startButton = document.getElementById("startButton")
let statusIcon = document.getElementById("statusIcon")
let statusText = document.getElementById("statusText")

let clicksCount = document.getElementById("clicksCount")
let highScoreShow = document.getElementById("highScore")
let currentClicksShow = document.getElementById("currentClicks")
let totalClicksShow = document.getElementById("totalClicks")

// Data Variables
let lastElement = null;
let randomElement = null;

let activeClass = "bg-blue-300";
let inactiveClass = "bg-base-100";

let clicks = 0;
let totalClicks = 0;
let highScore = 0;

function getRandomElement() {
    return elements[Math.floor(Math.random() * elements.length)];
}

function updateElementStyle(element, mode) {
    if (mode === "active") {
        element.classList.remove(inactiveClass)
        element.classList.add(activeClass)
        element.getElementsByClassName("object-text")[0].innerText = "Click me!"
    } else {
        element.classList.remove(activeClass)
        element.classList.add(inactiveClass)
        element.getElementsByClassName("object-text")[0].innerText = ""
    }
}

function updateRandomElement(oldElement) {
    updateElementStyle(oldElement, "inactive")
    randomElement = getRandomElement();
    while (randomElement === oldElement) {
        randomElement = getRandomElement();
    }
    updateElementStyle(randomElement, "active")
    return randomElement
}

function elementClicked(event) {
    if (event === randomElement) {
        lastElement = randomElement;
        randomElement = updateRandomElement(lastElement);
        clicks += 1;
        currentClicksShow.innerText = clicks
    } else {
        endGame()
    }
}

function switchButton() {

    if (statusText.innerText === "Start Game") {
        startButton.classList.remove("bg-blue-500")
        startButton.classList.remove("hover:bg-green-500")
        startButton.classList.remove("hover:shadow-green-500/50")
        startButton.classList.add("bg-red-500")
        startButton.classList.add("hover:bg-red-800")
        startButton.classList.add("hover:shadow-red-500/50")

        statusText.innerText = "Stop Game"
        
        startButton.setAttribute("onclick", "endGame()")

        statusIcon.classList.remove("fa-play")
        statusIcon.classList.add("fa-pause")
    } else {
        startButton.classList.remove("bg-red-500")
        startButton.classList.remove("hover:bg-red-800")
        startButton.classList.remove("hover:shadow-red-500/50")
        startButton.classList.add("bg-blue-500")
        startButton.classList.add("hover:bg-green-500")
        startButton.classList.add("hover:shadow-green-500/50")

        statusText.innerText = "Start Game"

        startButton.setAttribute("onclick", "startGame()")

        statusIcon.classList.remove("fa-pause")
        statusIcon.classList.add("fa-play")
    }
}

function startGame() {
    randomElement = getRandomElement();
    updateElementStyle(randomElement, "active")
    switchButton()
}

function endGame() {
    updateElementStyle(randomElement, "inactive")

    randomElement = null;
    lastElement = null;

    clicksCount.innerText = clicks

    gameover.showModal()
    totalClicks += clicks;

    if (clicks > highScore) {
        highScore = clicks;
        highScoreShow.innerText = highScore
    }

    clicks = 0;

    currentClicksShow.innerText = clicks
    totalClicksShow.innerText = totalClicks
    
    switchButton()
}