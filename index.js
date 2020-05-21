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


let x = 0, y = SCREEN_HEIGHT / 2;
let xPrev = x, yPrev= y;
window.setInterval(function () {
  //for(let x=0; x<SCREEN_WIDTH; x++) {
  //}
  y += Math.floor((Math.random() * 11) + 1) - 6;
  putPixel(x, y);

  ctx.moveTo(xPrev, yPrev);
  ctx.lineTo(x, y);
  ctx.stroke(); 

  xPrev = x;
  yPrev= y;

  x++;
  if(x == SCREEN_WIDTH) { 
    x = 0;
    y = SCREEN_HEIGHT / 2;
    ClearScreen();
  }

}, 10);

function ClearScreen() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = "#FFFFFF"; 
}