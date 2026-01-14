const repeatMove = [{},{},{},{}];
const size = 500;
const cell = size / 15;
const playingField = document.getElementById("field");
const ctx = playingField.getContext("2d");
let isGameOver = false;
function fillRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cell, y * cell, w * cell, h * cell);
}
function drawPersonalLine(line, color) {
    for (let i = 1; i < line.length; i++) {
        const cell = line[i];
        fillRect(cell.x, cell.y, 1, 1, color);
    }
}
function drawPlayer(gamer) {
    const { x, y } = gamer.currentCoord;
    fillRect(x, y, 1, 1, gamer.color);
}


const greenLine = [
    {x: 7, y: 0}, {x:8, y:1}, {x:7, y:1}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}
];

const redLine = [
    {x: 0, y: 7}, {x:1, y:6}, {x:1, y:7}, {x:2, y:7}, {x:3, y:7}, {x:4, y:7}, {x:5, y:7}
];

const blueLine = [
    {x: 7, y: 14}, {x:6, y:13}, {x:7, y:13}, {x:7, y:12}, {x:7, y:11}, {x:7, y:10}, {x:7, y:9}
];

const yellowLine = [
    {x: 14, y: 7}, {x:13, y:8}, {x:13, y:7}, {x:12, y:7}, {x:11, y:7}, {x:10, y:7}, {x:9, y:7}
];

const commonLine = [
    {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 8, y: 1}, {x: 8, y: 2},
    {x: 8, y: 3}, {x: 8, y: 4}, {x: 8, y: 5}, {x: 9, y: 6}, {x: 10, y: 6},
    {x: 11, y: 6}, {x: 12, y: 6}, {x: 13, y: 6}, {x: 14, y: 6}, {x: 14, y: 7},
    {x: 14, y: 8}, {x: 13, y: 8}, {x: 12, y: 8}, {x: 11, y: 8}, {x: 10, y: 8},
    {x: 9, y: 8}, {x: 8, y: 9}, {x: 8, y: 10}, {x: 8, y: 11}, {x: 8, y: 12},
    {x: 8, y: 13}, {x: 8, y: 14}, {x: 7, y: 14}, {x: 6, y: 14}, {x: 6, y: 13},
    {x: 6, y: 12}, {x: 6, y: 11}, {x: 6, y: 10}, {x: 6, y: 9}, {x: 5, y: 8},
    {x: 4, y: 8}, {x: 3, y: 8}, {x: 2, y: 8}, {x: 1, y: 8}, {x: 0, y: 8},
    {x: 0, y: 7}, {x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6},
    {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 5}, {x: 6, y: 4}, {x: 6, y: 3},
    {x: 6, y: 2}, {x: 6, y: 1}
]

drawPersonalLine(greenLine, 'green');
drawPersonalLine(redLine, 'red');
drawPersonalLine(blueLine, 'blue');
drawPersonalLine(yellowLine, 'yellow');

let currentGamer;
let currentGamerIndex = 0;

const redGamer = {
    startCoord: {x: 1, y: 6},
    winCoord: {x: 6, y: 7},
    currentCoord: {},
    startOfPersonalLine: {x: 0, y: 7},
    isOnPersonalLine: false,
    personalLine: redLine,
    color: 'red',
}

const blueGamer = {
    startCoord: {x: 6, y: 13},
    winCoord: {x: 6, y: 7},
    currentCoord: {},
    startOfPersonalLine: {x: 7, y: 14},
    isOnPersonalLine: false,
    personalLine: blueLine,
    color: 'blue',
}

const greenGamer = {
    startCoord: {x: 8, y: 1},
    winCoord: {x: 6, y: 7},
    currentCoord: {},
    startOfPersonalLine: {x: 7, y: 0},
    isOnPersonalLine: false,
    personalLine: greenLine,
    color: 'green',
}

const yellowGamer = {
    startCoord: {x: 13, y: 8},
    winCoord: {x: 6, y: 7},
    currentCoord: {},
    startOfPersonalLine: {x: 14, y: 7},
    isOnPersonalLine: false,
    personalLine: yellowLine,
    color: 'yellow',
}
let gamersList = ['red', 'blue', 'green', 'yellow'];

window.onload = function playingField() {
    playingField.width = size;
    playingField.height = size;

    for (let i = 0; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cell, 0);
        ctx.lineTo(i * cell, size);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cell);
        ctx.lineTo(size, i * cell);
        ctx.stroke();
    }

    fillRect(0, 0, 6, 6, "red");
    fillRect(9, 0, 6, 6, "green");
    fillRect(0, 9, 6, 6, "blue");
    fillRect(9, 9, 6, 6, "yellow");

    ctx.fillStyle = "#ddd";

    ctx.beginPath();
    ctx.moveTo(6 * cell, 6 * cell);
    ctx.lineTo(9 * cell, 6 * cell);
    ctx.lineTo(7.5 * cell, 7.5 * cell);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(9 * cell, 6 * cell);
    ctx.lineTo(9 * cell, 9 * cell);
    ctx.lineTo(7.5 * cell, 7.5 * cell);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(9 * cell, 9 * cell);
    ctx.lineTo(6 * cell, 9 * cell);
    ctx.lineTo(7.5 * cell, 7.5 * cell);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(6 * cell, 9 * cell);
    ctx.lineTo(6 * cell, 6 * cell);
    ctx.lineTo(7.5 * cell, 7.5 * cell);
    ctx.fill();
};

function chooseCurrentGamer() {
    const color = gamersList[currentGamerIndex];

    switch(color) {
        case 'red':
            currentGamer = redGamer;
            break;
        case 'blue':
            currentGamer = blueGamer;
            break;
        case 'green':
            currentGamer = greenGamer;
            break;
        case 'yellow':
            currentGamer = yellowGamer;
            break;
    }

    if (!currentGamer.currentCoord || Object.keys(currentGamer.currentCoord).length === 0) {
        currentGamer.currentCoord = { ...currentGamer.startCoord };
    }

    currentGamerIndex++;
    if (currentGamerIndex >= gamersList.length) currentGamerIndex = 0;

    return currentGamer;
}

function calculateNextPosition(currentCoord, step) {
    if(currentGamer.isOnPersonalLine){
        moveOnPersonalLine(currentCoord, step);
    }
    if (!currentGamer.isOnPersonalLine) {
        let currentIndex = commonLine.findIndex(
            c => c.x === currentCoord.x && c.y === currentCoord.y
        );

        if (currentIndex === -1) {
            currentIndex = commonLine.findIndex(
                c =>
                    c.x === currentGamer.startCoord.x &&
                    c.y === currentGamer.startCoord.y
            );
        }

        while (step > 0) {
            currentIndex++;

            if (currentIndex >= commonLine.length) {
                currentIndex = 0;
            }

            const cell = commonLine[currentIndex];
            currentCoord.x = cell.x;
            currentCoord.y = cell.y;

            step--;

            if (
                cell.x === currentGamer.startOfPersonalLine.x &&
                cell.y === currentGamer.startOfPersonalLine.y
            ) {
                currentGamer.isOnPersonalLine = true;
                moveOnPersonalLine(currentCoord, step);
                break;
            }
        }
    }
}

function moveOnPersonalLine(currentCoord, step) {
    const line = currentGamer.personalLine;
    let index = line.findIndex(c => c.x === currentCoord.x && c.y === currentCoord.y);

    index += step;
    if (index >= line.length) index = line.length - 1;
    const cell = line[index];
    currentCoord.x = cell.x;
    currentCoord.y = cell.y;
    fillRect(cell.x, cell.y, 1, 1, 'black');
    if (index === line.length - 1) {
        showLog(`${currentGamer.color.toUpperCase()} WINS!`);
        isGameOver = true;
    }
}

function move(currentCoord, step) {
    if (
        currentCoord.x !== currentGamer.startCoord.x ||
        currentCoord.y !== currentGamer.startCoord.y
    ) {
        fillRect(currentCoord.x, currentCoord.y, 1, 1, 'white');
    }


    calculateNextPosition(currentCoord, step);
    drawPlayer(currentGamer);
}

function diceValue() {
    return Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
}

function gameLogic() {
    if (isGameOver) return;
    chooseCurrentGamer();
    const step = diceValue();
    showLog(`Step: ${step}, Player: ${currentGamer.color}, Coord: (${currentGamer.currentCoord.x}, ${currentGamer.currentCoord.y})`);
    move(currentGamer.currentCoord, step);
}


function showLog(message) {
    const log = document.getElementById('game-log');
    log.textContent = message;
}

