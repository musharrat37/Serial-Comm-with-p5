//background ambient music that goes with the piano tunes

//music used: https://www.youtube.com/watch?v=DZpPhCGoPLg

//holdkey button: piano holds tune of keys until pressed again

//can use both keyboard (keys 1 to 7) and capacitive touch external piano

//for visuals, moving through wormhole - circle moving slowly along screen - lines extending from it moving with it 

//refernce tutorial https://www.youtube.com/watch?v=17WoOqgXsRM

let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data


var holdKey = 0;

var songplay = 1;

var amb_song;

var points = [];

var rate = 0;

let h = 10;

function setup() {
  createCanvas(600,600);
  //background(200);
  frameRate(10);
  
  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('COM6');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
  
  wave = new p5.Oscillator('sine');
  wave.amp(0,0);
  wave.start();
  textAlign(CENTER);
  amb_song.play();
  
  for (var i = 0; i < 600; i++) {
    points[i] = new Points();
  }
}

function preload(){
  amb_song = loadSound('ambient.mp3');
}

function serverConnected() {
  console.log("Connected to Server");
}

// list the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose() {
  console.log("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  console.log(theerror);
}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable
}

function draw() {
  background(200);
  
  
  if(rate > 300){
    rate = 100;
  }else{
    rate ++;
  }
  
  push();
  fill(0);
  circle(width/2,height/2,500);
  pop();
  
  
    for(var i = 1; i < 40; i++){
    noFill();
    stroke(255*(i/80));
    strokeWeight(2);
    push();
    circle(width/2, height/2, noise(h)*width/8*i);
    pop();
  }
  
  //keyHold button
  push();
  noStroke();
  if(holdKey === 0){
    fill(150);
    circle(39,height-56,35);
    fill(255,100,50);
    circle(33,height-60,35);
  }else{
    fill(30);
    circle(35,height-58,35);
    fill(50,255,50);
    circle(34,height-60,35);
  }
  fill(0);
  textSize(10);
  text("Hold",33,height-58);
  pop();
  
  //background music on and off button
  push();
  noStroke();
  if( songplay === 0){
    fill(150);
    circle(39,height-116,35);
    fill(255,100,50);
    circle(33,height-120,35);
  }else{
    fill(30);
    circle(35,height-118,35);
    fill(50,255,50);
    circle(34,height-120,35);
  }
  fill(0);
  textSize(10);
  text("BGM",33,height-118);
  pop();
  
  
  
  if (latestData == 1) {
    
    drawKeys(1,255,0,0);
    wave.amp(2,0.3);
    wave.freq(261.63);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  } else if (latestData == 2){
    
    drawKeys(2,255,165,0);
    wave.amp(2,0.3);
    wave.freq(293.66);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }else if (latestData == 3){
    
    drawKeys(3,255,255,0);
    wave.amp(2,0.3);
    wave.freq(329.63);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }else if (latestData == 4){
    
    drawKeys(4,144,238,144);
    wave.amp(2,0.3);
    wave.freq(349.23);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }else if (latestData == 5){
    
    drawKeys(5,0,255,0);
    wave.amp(2,0.3);
    wave.freq(392.00);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }else if (latestData == 6){
    
    drawKeys(6,0,0,255);
    wave.amp(2,0.3);
    wave.freq(440.00);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }else if (latestData == 7){
    
    drawKeys(7,255,0,255);
    wave.amp(2,0.7);
    wave.freq(493.88);
    if(holdKey == 0){
      wave.amp(0,2);
    }

  }
  else{
    drawKeys(0);
  }
  if(holdKey == 0){
    latestData = 0;
  }
  
  translate(width/2, height/2); 
  
  for (var j = 0; j < points.length; j++) {
    points[j].update();
    points[j].show();
  } 
  
  h += 0.005;
  if (h > 20){
    h = 1;
  }

}

function keyTyped() {
  if (key > 0 && key < 8 ){
    latestData = key;
    //console.log(key);
  } 
}



function mousePressed() {
     let d1 = dist(mouseX,mouseY,33,height-58);
      if(d1 < 25){
       if (holdKey === 0) {
         holdKey = 1;
       } else {
         holdKey = 0;
         wave.amp(0,2);
       }
     }
  
  let d2 = dist(mouseX,mouseY,33,height-120);
  if(d2 < 25){
       if (songplay === 0) {
         songplay = 1;
         amb_song.play();
       } else {
         songplay = 0;
         amb_song.pause();
       }
     }
}

function drawKeys(num,r,g,b){
  noStroke();
  //rectMode(CENTER);
  for (var i = 1; i < 8; i++){
    if (i === num){
      fill(r,g,b);
      rect(width*i / 8, height*0.75, 70, 200);
    }else{
      fill(255,100);
      rect(width*i / 8, height*0.85, 70, 200);
    }
  }
}