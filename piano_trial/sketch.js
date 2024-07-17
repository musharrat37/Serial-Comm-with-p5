let c;
let d;
let e;
let f;
let g;
let a;
let b;

let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
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
}

function preload(){
  c = loadSound('do.mp3');
  d = loadSound('re.mp3');
  e = loadSound('mi.mp3');
  f = loadSound('fa.mp3');
  g = loadSound('sol.mp3');
  a = loadSound('la.mp3');
  b = loadSound('si.mp3');
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
  
  text(latestData, 10, 10); // print the data to the sketch

  if (latestData == 1) {
    fill(255,0,0);
    rect(width / 8, height / 3, 50, 200);
    c.play();
  } else if (latestData == 2){
    fill(255, 165, 0);
    rect(width*2 / 8, height / 3, 50, 200);
    d.play();
  }else if (latestData == 3){
    fill(255,255,0);
    rect(width*3 / 8, height / 3, 50, 200);
    e.play();
  }else if (latestData == 4){
    fill(144, 238, 144);
    rect(width*4 / 8, height / 3, 50, 200);
    f.play();
  }else if (latestData == 5){
    fill(0,255,0);
    rect(width*5 / 8, height / 3, 50, 200);
    g.play();
  }else if (latestData == 6){
    fill(0,0,255);
    rect(width*6 / 8, height / 3, 50, 200);
    a.play();
  }else if (latestData == 7){
    fill(255,0,255);
    rect(width*7 / 8, height / 3, 50, 200);
    b.play();
  }
  else {
    fill(255,255,255);
    rect(width / 8, height / 3, 50, 200);
    rect(width*2 / 8, height / 3, 50, 200);
    rect(width*3 / 8, height / 3, 50, 200);
    rect(width*4 / 8, height / 3, 50, 200);
    rect(width*5 / 8, height / 3, 50, 200);
    rect(width*6 / 8, height / 3, 50, 200);
    rect(width*7 / 8, height / 3, 50, 200);
  }
}