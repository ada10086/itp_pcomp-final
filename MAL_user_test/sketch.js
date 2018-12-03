var modules = []
var moduleW = 40;
var moduleH = 100;
var button; //start/reset button
var stage; //activation or deactivation
var numOfActivated;
var modulePosition;
var counter, timer; //to set interval for playing uploading voice 
var time;
var timerStarted = false;
var lastTime, currentTime;
var j; //detect clicked module
//voice:
var a1, a3, a5, a7, a9, a10, urg1, urg2; //activation stage + urging voice
var uploadingVoice = []; //uploading stage voice array
var u1, u2, u3, u4, u5, u6; //uploading stage voice
var d1, d3, d5, d7, d9; //deactivation stage voice

//sound:
var s1 = new Tone.Player("./SoundTest/bell.mp3").toMaster();
s1.volume.value = -30;
s1.loop = true;
var s2 = new Tone.Player("./SoundTest/meditation.mp3").toMaster();
s2.volume.value = -20;
s2.loop = true;
var s3 = new Tone.Player("./SoundTest/rain.mp3").toMaster();
s3.volume.value = -15;
s3.loop = true;
var s4 = new Tone.Player("./SoundTest/wave.mp3").toMaster();
s4.volume.value = -10;
s4.loop = true;
var s5 = new Tone.Player("./SoundTest/Sound bowl.mp3").toMaster();
s5.volume.value = -10;
s5.loop = true;
var s6 = new Tone.Player("./SoundTest/sequence.mp3").toMaster();
s6.volume.value = -10;
s6.loop = true;

function preload() {
  // a0 = loadSound("./Activation/a0.mp3");
  // a1 = loadSound("./Activation/a1.mp3");
  // a3 = loadSound("./Activation/a3.mp3");
  // a5 = loadSound("./Activation/a5.mp3");
  // a7 = loadSound("./Activation/a7.mp3");
  // a9 = loadSound("./Activation/a9.mp3");
  // a10 = loadSound("./Activation/a10.mp3");
  urg1 = loadSound("./Activation/urging 1.mp3");
  urg2 = loadSound("./Activation/urging 2.mp3");
  // d9 = loadSound("./Deactivation/d9.mp3");
  // d7 = loadSound("./Deactivation/d7.mp3");
  // d5 = loadSound("./Deactivation/d5.mp3");
  // d3 = loadSound("./Deactivation/d3.mp3");
  // d1 = loadSound("./Deactivation/d1.mp3");
  u1 = loadSound("./Uploading/1initialize.mp3");
  u2 = loadSound("./Uploading/2scanning.mp3");
  u3 = loadSound("./Uploading/3mapping.mp3");
  u4 = loadSound("./Uploading/4reestablishing.mp3");
  u5 = loadSound("./Uploading/5uploading.mp3");
  u6 = loadSound("./Uploading/Congratulations.mp3");

  //testing voice files
  a0 = loadSound("./ActivationTest/a0.mp3");
  a1 = loadSound("./ActivationTest/a1.mp3");
  a3 = loadSound("./ActivationTest/a3.mp3");
  a5 = loadSound("./ActivationTest/a5.mp3");
  a7 = loadSound("./ActivationTest/a7.mp3");
  a9 = loadSound("./ActivationTest/a9.mp3");
  a10 = loadSound("./ActivationTest/a10.mp3");
  d9 = loadSound("./DeactivationTest/d9.mp3");
  d7 = loadSound("./DeactivationTest/d7.mp3");
  d5 = loadSound("./DeactivationTest/d5.mp3");
  d3 = loadSound("./DeactivationTest/d3.mp3");
  d1 = loadSound("./DeactivationTest/d1.mp3");
}

function setup() {
  uploadingVoice = [u1, u2, u3, u4, u5, u6];
  createCanvas(windowWidth, windowHeight);
  button = createButton("start session");
  button.position(20, 20);
  button.mousePressed(startSession);
  //initialize modules
  for (i = 0; i < 10; i++) {
    if (i < 5) { //1st row
      modules[i] = new Module(windowWidth / 2 - moduleW * 9 / 2 + i * 2 * moduleW, windowHeight / 2 - 2 * moduleH);
    } else {     //2nd row
      modules[i] = new Module(windowWidth / 2 - moduleW * 9 / 2 + (i - 5) * 2 * moduleW, windowHeight / 2);
    }
  }
}


function startSession() {
  console.log("start session");
  a0.play();
  stage = "ACTIVATION";
  //deactivate all modules to start/reset
  for (i = 0; i < 10; i++) {
    modules[i].isActivated = false;
  }
  //!!!NOT STOPPING 
  Tone.Transport.stop();
}



function draw() {
  background(0);
  for (i = 0; i < 10; i++) {
    modules[i].display();
  }

  //track number of activated modules
  numOfActivated = modules.filter(_module => {
    return _module.isActivated === true
  }).length;
  // console.log("numOfActivated:" + numOfActivated);

  if (stage == "ACTIVATION") {
    if (numOfActivated == 10) {
      stage = "DEACTIVATION";
    }
  }
  // console.log("stage = " + stage);

  if (stage == "DEACTIVATION") {
    startUploadingTimer();
    // let len = a10.duration();
    // a10.addCue(len - 0.5, startUploadingTimer);
  }
  // console.log(uploadingVoiceIsPlaying());

}

// function startUploadingTimer() {
//   counter = 0;
//   timer = setInterval(playUploadingVoice, 10000);
//   console.log("Uploading timer starts");
// }

// //play uploading voices at 5 sec interval
// function playUploadingVoice() {
//   uploadingVoice[counter].play();
//   counter++;
//   if (counter == uploadingVoice.length) {
//     clearInterval(timer);
//   }
//   console.log("uploading")
// }


function startUploadingTimer() {
  console.log(millis()-lastTime);
  if (millis() - lastTime > 7000 && counter < uploadingVoice.length) {
    console.log("uploading")
    uploadingVoice[counter].play();
    counter++;
    lastTime = millis();
  }else if (d9.isPlaying() || d7.isPlaying() || d5.isPlaying() || d3.isPlaying() || d1.isPlaying()) {
    lastTime = millis();
  }
  console.log("Uploading timer starts");
}


function uploadingVoiceIsPlaying() {
  let numOfUploadingVoices = uploadingVoice.filter(_voice => _voice.isPlaying() == true).length;
  if (numOfUploadingVoices == 1) {
    return true;
  } else if (numOfUploadingVoices == 0) {
    return false;
  }
}

class Module {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = moduleW;
    this.h = moduleH;
    this.isActivated = false;
  }
  display() {
    if (numOfActivated < 9) {
      if (stage == "ACTIVATION") {
        if (!this.isActivated) {
          fill(255, 255, 255);
        } else {
          fill(0, 255, 0)
        }
      }
    } else if (numOfActivated == 9) {
      fill(random(255), random(255), random(255));
    }

    if (stage == "DEACTIVATION") {
      if (!this.isActivated) {
        fill(255, 0, 0);
      } else {
        fill(random(255), random(255), random(255));
      }
    }
    rect(this.x, this.y, this.w, this.h);
  }

  activate(_mx, _my) {
    if (_mx > this.x && _mx < (this.x + this.w) && _my > this.y && _my < (this.y + this.h)) {
      if (!this.isActivated) {
        this.isActivated = true;
        // console.log("activated");
        //console.log(???"module"+i+"is activated");
      }
    }
  }

  deactivate(_mx, _my) {
    if (_mx > this.x && _mx < (this.x + this.w) && _my > this.y && _my < (this.y + this.h)) {
      if (this.isActivated) {
        this.isActivated = false;
        // console.log("deactivated");
      }
    }
  }

  moduleClicked(_mx, _my) {
    if (_mx > this.x && _mx < (this.x + this.w) && _my > this.y && _my < (this.y + this.h)) {
      // let _modulePosition = { x: this.x, y: this.y }
      let _modulePosition = createVector(this.x, this.y);
      return _modulePosition;
    }
    return false
  }

}

function mousePressed() {
  //activating stage:
  if (stage == "ACTIVATION") {

    if (numOfActivated == 1 - 1 && !a0.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      Tone.Transport.start();
      s1.start();
      a1.play();
    } else if (numOfActivated == 2 - 1 && !a1.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      s2.start();
    } else if (numOfActivated == 3 - 1 && !a1.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      s3.start();
      a3.play();
    } else if (numOfActivated == 4 - 1 && !a3.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      s4.start();
    } else if (numOfActivated == 5 - 1 && !a3.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      a5.play();
      s5.start();
    } else if (numOfActivated == 6 - 1 && !a5.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      s6.start();
    } else if (numOfActivated == 7 - 1 && !a5.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      a7.play();
    } else if (numOfActivated == 8 - 1 && !a7.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
    } else if (numOfActivated == 9 - 1 && !a7.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      a9.play();
    } else if (numOfActivated == 10 - 1 && !a9.isPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].activate(mouseX, mouseY);
      }
      a10.play();

      lastTime = millis();
      counter = 0
      //add a delay of duration(a10) before starting uploading timer
      let len = a10.duration();
      a10.addCue(len - 0.5, timerStarted());
    }


    // let index = modules.findIndex(module => module.isActivated);
    // console.log(index);
  }
  else if (stage == "DEACTIVATION") {  //13579 246810
    for (i = 0; i < 10; i++) {
      modulePosition = modules[i].moduleClicked(mouseX, mouseY);
      if (modulePosition) {
        // console.log(modulePosition);
        // console.log(modulePosition.y)
        if (modulePosition.y == windowHeight / 2 - 2 * moduleH) {
          j = (modulePosition.x - windowWidth / 2 + moduleW * 9 / 2) / (2 * moduleW);
        } else if (modulePosition.y == windowHeight / 2) {
          j = (modulePosition.x - windowWidth / 2 + moduleW * 9 / 2) / (2 * moduleW) + 5;
        }
        console.log(j + 1);
      }
    }


    if (numOfActivated == 10 && !a10.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
      d9.play();
    } else if (numOfActivated == 9 && !d9.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
    } else if (numOfActivated == 8 && !d9.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
      d7.play();
    } else if (numOfActivated == 7 && !d7.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
    } else if (numOfActivated == 6 && !d7.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
      d5.play();
    } else if (numOfActivated == 5 && !d5.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
    } else if (numOfActivated == 4 && !d5.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
      d3.play();
    } else if (numOfActivated == 3 && !d3.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
    } else if (numOfActivated == 2 && !d3.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
      d1.play();
    } else if (numOfActivated == 1 && !d1.isPlaying() && !uploadingVoiceIsPlaying()) {
      for (i = 0; i < 10; i++) {
        modules[i].deactivate(mouseX, mouseY);
      }
    }

  }

}

function timerStarted(){
  return true;
}