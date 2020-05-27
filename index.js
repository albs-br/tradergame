import './style.css';
// import { * } from './constants.js';
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;


const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#FFFFFF";


const TOTAL_DAYS = 10;

let x = 0;
let y = SCREEN_HEIGHT / 2;
let xPrev = x;
let yPrev= y;

let buyPoint = { };
let sellPoint = { };

let day = 1;
let cash = 1000;
let lastResult;

let running = false;

ClearScreen();
//DrawScore();


function gameLoop() {
  if(running) console.info('running');
  running = true;

  y += Math.floor((Math.random() * 11) + 1) - 6; // random number between -5 and +5
  if(y <= 0) y = 0;
  if(y >= SCREEN_HEIGHT) y = SCREEN_HEIGHT;
  
  //putPixel(x, y);
  DrawLine(xPrev, yPrev, x, y);
  // ctx.beginPath();
  // ctx.moveTo(xPrev, yPrev);
  // ctx.lineTo(x, y);
  // ctx.closePath();
  // ctx.stroke(); 

  // // Create gradient
  // var grd = ctx.createLinearGradient(0, 0, 0, SCREEN_HEIGHT);
  // grd.addColorStop(0, "#0000FF");
  // grd.addColorStop(1, "#000000");

  // // Fill with gradient
  // ctx.fillStyle = grd;
  // ctx.fillRect(xPrev, yPrev+1, x, SCREEN_HEIGHT); 

  // ctx.fillStyle = "#000000";

  xPrev = x;
  yPrev = y;
  x++;

  if(x >= SCREEN_WIDTH) { 
    console.info('day: ' + day);

    sell();

    x = 0;
    y = SCREEN_HEIGHT / 2;
    xPrev = x;
    yPrev = y;
    buyPoint = { };
    sellPoint = { };
    day++;

    if(day > TOTAL_DAYS) {
      window.clearInterval(gameLoopInterval);
    }
    else {
      ClearScreen();
    }

    btnBuy.disabled = false;
    btnSell.disabled = true;

  }

  running = false;
}

function putPixel(x, y) {
  ctx.fillStyle = "#FFFFFF"; 
  ctx.fillRect(x, y, 1, 1);
};


function ClearScreen() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  DrawScore();
  DrawLine(0, 450, SCREEN_WIDTH-1, 450);
  DrawLine(0, 450, 0, 460);
  DrawLine(320, 450, 320, 460);
}

function DrawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke(); 
}

function DrawScore() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT/4);

  ctx.font = '48px Verdana';

  if(cash != undefined) {
    ctx.fillStyle = "white";
    ctx.fillText('$' + cash.toFixed(2), 10, 50);
    //ctx.strokeText('$' + cash.toFixed(2), 10, 50);
  }

  if(lastResult != undefined) {
    let resultText = lastResult.toFixed(2) + '%'
    
    if(lastResult == 0) {
      ctx.fillStyle = "royalblue";
      resultText = '+' + resultText;
    }
    if(lastResult >= 0) {
      ctx.fillStyle = "lime";
      resultText = '+' + resultText;
    }
    else {
      ctx.fillStyle = "red";
    }

    ctx.fillText(resultText, 10, 100);
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 400, SCREEN_WIDTH/2, 440);
  
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '24px Verdana';
  ctx.fillText("day: " + day, 10, 440);
}

let btnBuy = document.getElementById('buy');
let btnSell = document.getElementById('sell');

btnBuy.onclick = function() {
  buyPoint = { x, y: SCREEN_HEIGHT - y };

  ctx.beginPath();
  ctx.moveTo(buyPoint.x, 0);
  ctx.lineTo(buyPoint.x, SCREEN_HEIGHT - 1);
  ctx.closePath();
  ctx.stroke(); 

  btnBuy.disabled = true;
  btnSell.disabled = false;
};

let sell = () => {
  console.log('sell');
  if(buyPoint.x == undefined) return;

  sellPoint = { x, y: SCREEN_HEIGHT - y };

  lastResult = (((sellPoint.y / buyPoint.y) - 1) * 100);

  cash = cash * (sellPoint.y / buyPoint.y);

  DrawScore();

  console.log(sellPoint.y + ' | ' 
    + buyPoint.y + ' | '
    + lastResult);

  ctx.beginPath();
  ctx.moveTo(sellPoint.x, 0);
  ctx.lineTo(sellPoint.x, SCREEN_HEIGHT - 1);
  ctx.stroke();
  ctx.closePath();

  buyPoint = { };
  
  btnBuy.disabled = true;
  btnSell.disabled = true;
};

btnSell.onclick = sell;


let gameLoopInterval = window.setInterval(gameLoop, 1);
