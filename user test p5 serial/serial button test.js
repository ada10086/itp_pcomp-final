var btnPressed;


//serial variables:
var serial;
var portName = '/dev/cu.usbmodem1461'; //!!!change to your port

var inData;


function setup() {
    createCanvas(400, 400);
    //serial communication:
    serial = new p5.SerialPort();
    serial.on('connected', serverConnected);
    serial.on('open', portOpen);
    serial.on('data', serialEvent);
    serial.on('error', serialError);
    serial.on('close', portClose);
    serial.list();
    serial.open(portName);
}


function draw() {
    background(0);
    fill(255);
    console.log(btnPressed);
    // if (btnPressed) {
    //   //call buttonPressed function  (mousePressed)
    // }
}





//serial communication:
function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialError(err) {
    console.log('Something went wrong with the serial port.' + err);
}

function portClose() {
    console.log('The serial port closed.');
}

function serialEvent() {
    inData = Number(serial.read());
    // var inString = serial.readStringUntil('\r\n');
    // if (inString.length > 0) {
    //     var buttons = split(inString, ','); 
    //     if (buttons.length > 2) {
    //         for(i=1;i<=3;i++){
    //             btnState[i] = buttons[i-1];
    //         }
    //     }
    // }
}


// function keyPressed() {
//     if (key === 'H' || key === 'L') { // if the user presses H or L
//         serial.write(key); // send it out the serial port
//     }
// }