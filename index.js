// import './style.css';
// import 'https://www.w3schools.com/w3css/4/w3.css';
// import { * } from './constants.js';
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const RULER_HEIGHT = 30;

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext("2d");

// ctx.imageSmoothingEnabled = false;
// ctx.translate(0.5, 0.5);

ctx.strokeStyle = "#FFFFFF";

let grd = ctx.createLinearGradient(0, 0, 0, SCREEN_HEIGHT-RULER_HEIGHT);
grd.addColorStop(0, "rgb(9,113,142)");
grd.addColorStop(1, "rgb(0,5,38)");

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

clearScreen();
//DrawScore();

function randomNumber(min, max) {
  // console.info((max-min)+1);
  let rnd = Math.floor((Math.random() * (max-min+1)) + min); // random number between min and max
  // let rnd = Math.floor((Math.random() * 11) - 5); // random number between -5 and +5
  // if(rnd >= max) console.debug(rnd);
  // if(rnd <= min) console.debug(rnd);
  // console.info(rnd);
  return rnd;
}

function gameLoop() {
  if(running) console.info('running');
  running = true;

  // Update vars
  y += randomNumber(-5, 5);
  if(y <= 0) y = 0;
  if(y >= SCREEN_HEIGHT-RULER_HEIGHT) y = SCREEN_HEIGHT-RULER_HEIGHT;
  

  // Draw objects
  //putPixel(x, y);
  drawLine(xPrev, yPrev, x, y, 2);

  ctx.fillStyle = grd;
  ctx.fillRect(x, y+1, 1, SCREEN_HEIGHT-y-RULER_HEIGHT-2); 

  ctx.fillStyle = "#000000";

  if(buyPoint.x != undefined) { 
    drawLine(buyPoint.x, 0, buyPoint.x, SCREEN_HEIGHT - 1, 1, '#808080');
  };

  if(sellPoint.x != undefined) { 
    drawLine(sellPoint.x, 0, sellPoint.x, SCREEN_HEIGHT - 1, 1, '#808080');
  };

  drawScore();

  // Set vars to next iteration
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
      clearScreen();
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


function clearScreen() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  drawScore();
  drawRuler();  
}

function drawRuler() {
  // ruler with hours on the bottom of screen
  drawLine(0, 450, SCREEN_WIDTH-1, 450);
  let hour = 10;
  for(let i=0; i<=SCREEN_WIDTH; i+=SCREEN_WIDTH/7) {
    drawLine(i, 450, i, 460);
    
    ctx.font = '12px Verdana';
    ctx.fillStyle = "#808080";
    ctx.fillText(hour + ':00', i, 470);
    
    hour++;
  }
  // drawLine(0, 450, 0, 460);
  // drawLine(320, 450, 320, 460);
}

function drawLine(x1, y1, x2, y2, lineWidth = 1, strokeStyle = "#FFFFFF") {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke(); 
}

function drawScore() {
  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, 250, 110);

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
      resultText = resultText;
    }
    else if(lastResult >= 0) {
      ctx.fillStyle = "lime";
      resultText = '+' + resultText;
    }
    else {
      ctx.fillStyle = "red";
    }

    ctx.fillText(resultText, 10, 100);
  }

  // ctx.fillStyle = "#000000";
  // ctx.fillRect(0, 440, 120, 50);
  
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '24px Verdana';
  ctx.fillText("day: " + day, 10, 440);
}

let btnBuy = document.getElementById('buy');
let btnSell = document.getElementById('sell');

btnBuy.onclick = function() {
  buyPoint = { x, y: SCREEN_HEIGHT - y };

  //drawLine(buyPoint.x, 0, buyPoint.x, SCREEN_HEIGHT - 1);

  btnBuy.disabled = true;
  btnSell.disabled = false;
};

let sell = () => {
  console.log('sell');
  if(buyPoint.x == undefined) return;

  sellPoint = { x, y: SCREEN_HEIGHT - y };

  lastResult = (((sellPoint.y / buyPoint.y) - 1) * 100);

  cash = cash * (sellPoint.y / buyPoint.y);

  drawScore();

  console.log(sellPoint.y + ' | ' 
    + buyPoint.y + ' | '
    + lastResult);

  // drawLine(sellPoint.x, 0, sellPoint.x, SCREEN_HEIGHT - 1);

  buyPoint = { };
  
  btnBuy.disabled = true;
  btnSell.disabled = true;
};

btnSell.onclick = sell;


let gameLoopInterval = window.setInterval(gameLoop, 1);

function resizeWindow() {
  let inside = this.document.getElementsByClassName('inside')[0];
  
  // Get the smaller between width and height of the screen
  let smaller = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
  
  inside.style.width = smaller;
  inside.style.height = smaller;
}

window.onresize = resizeWindow;

window.onload = () => {
  // Register service worker
  if ('serviceWorker' in navigator) {

    // navigator.serviceWorker.register('/app/service-worker.js', {
    //   scope: '/app'
    // });

    navigator.serviceWorker
              .register('./service-worker.js')
              .then(function(registration) {

      //console.log('Service Worker Registered'); 
      console.log('Registration successful, scope is:', registration.scope);
      
      // $('#version').click(() => {
      //   // Force reload of all files
      //   console.info('Unregistering service worker and reloading page')
      //   registration.unregister().then(function() { 
      //     window.location.reload(true); 
      //   });
      // });
    });
  }

  resizeWindow();
}