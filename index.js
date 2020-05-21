import './style.css';
// import { * } from './constants.js';
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;


const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext("2d");


ClearScreen();


let putPixel = (x, y) => {
  ctx.fillRect(x, y, 1, 1);
};


let x = 0;
let y = SCREEN_HEIGHT / 2;
let xPrev = x;
let yPrev= y;

let buyPoint = { };
let sellPoint = { };

ctx.strokeStyle = "#FFFFFF";

window.setInterval(function () {
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
    x = 0;
    y = SCREEN_HEIGHT / 2;
    xPrev = x;
    yPrev = y;
    buyPoint = { };
    sellPoint = { };
    ClearScreen();
  }

}, 1);



function ClearScreen() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = "#FFFFFF"; 
}

let btnBuy = document.getElementById('buy');
let btnSell = document.getElementById('sell');

btnBuy.onclick = function() {
  buyPoint = { x, y };

  ctx.moveTo(buyPoint.x, 0);
  ctx.lineTo(buyPoint.x, SCREEN_HEIGHT - 1);
  ctx.stroke(); 

  btnBuy.disable = true;
};