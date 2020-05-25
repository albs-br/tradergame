import './style.css';
// import { * } from './constants.js';
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;


const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#FFFFFF";


let x = 0;
let y = SCREEN_HEIGHT / 2;
let xPrev = x;
let yPrev= y;

let buyPoint = { };
let sellPoint = { };

let cash = 1000;
let lastResult;

ClearScreen();
DrawScore();


function gameLoop() {
  //for(let x=0; x<SCREEN_WIDTH; x++) {
  //}
  y += Math.floor((Math.random() * 11) + 1) - 6;
  putPixel(x, y);

  // if(buyPoint) {
  // }

  x++;
  xPrev = x;
  yPrev = y;

  if(x >= SCREEN_WIDTH) { 

    sell();

    x = 0;
    y = SCREEN_HEIGHT / 2;
    xPrev = x;
    yPrev = y;
    buyPoint = { };
    sellPoint = { };
    ClearScreen();

    btnBuy.disabled = false;
    btnSell.disabled = true;

  }
}

function putPixel(x, y) {
  ctx.fillStyle = "#FFFFFF"; 
  ctx.fillRect(x, y, 1, 1);
};


function ClearScreen() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  DrawScore();
}

function DrawScore() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT/4);

  //fillStyle
  //strokeStyle
  ctx.font = '48px Verdana';
  //ctx.fillText('Hello world', 10, 50);

  if(cash != undefined) {
    ctx.strokeText('$' + cash.toFixed(2), 10, 50);
  }

  if(lastResult != undefined) {
    ctx.strokeText(lastResult, 10, 100);
  }
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

  lastResult = (((sellPoint.y / buyPoint.y) - 1) * 100).toFixed(2) + '%';
  if(lastResult > 0) {
    lastResult = '+' + lastResult;
  }

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


window.setInterval(gameLoop, 1);
