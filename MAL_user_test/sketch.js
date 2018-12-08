var modules = []
var moduleW = 40;
var moduleH = 150;
var button; //start/reset button
var stage; //activation or deactivation
var numOfActivated; //number of activated modules
var showSequence = false;
var fullyDeactivated = false;
// var modulePosition;  //clicked module position vector for calculating index
// var index; //index of clicked module
var lastTime; //timer for urging
var uploadLastTime;  //uploading stage voice timer
var counter;   //counter for uploading stage voice
var seqLastTime; //for blinking deactivating sequence
var seqLit = false;
//voice:
var a1, a3, a5, a7, a9, a10, urg1, urg2; //activation stage + urging voice
var uploadingVoice = []; //uploading stage voice array
var u1, u2, u3, u4, u5, u6; //uploading stage voice
var uploadingSound = []; //uploading stage sound track array
var d1, d3, d5, d7, d9; //deactivation stage voice

//sound:
//activation
var s1 = new Tone.Player("./SoundTest/activation/wave.mp3").toMaster();
s1.volume.value = -2;
s1.loop = true;
var s2 = new Tone.Player("./SoundTest/activation/meditation.mp3").toMaster();
s2.volume.value = -10;
s2.loop = true;
var s3 = new Tone.Player("./SoundTest/activation/rain.mp3").toMaster();
s3.volume.value = -15;
s3.loop = true;
var s4 = new Tone.Player("./SoundTest/activation/bell.mp3").toMaster();
s4.volume.value = -30;
s4.loop = true;
var s5 = new Tone.Player("./SoundTest/activation/Sound bowl.mp3").toMaster();
s5.volume.value = -20;
s5.loop = true;
var s6 = new Tone.Player("./SoundTest/activation/sequence.mp3").toMaster();
s6.volume.value = -10;
s6.loop = true;
var s7 = new Tone.Player("./SoundTest/activation/drone loop.mp3").toMaster();
s7.volume.value = -20;
s7.loop = true;
// var s10 = new Tone.Player("./SoundTest/deactivation/eflat pulse.mp3").toMaster();
var s10 = new Tone.Player("./SoundTest/activation/tension synths.mp3").toMaster();
s10.volume.value = -5;
s10.loop = true;

//deactivation:
ampEnv = new Tone.AmplitudeEnvelope({
  "attack": 0.05,
  "decay": 0.05,
  "sustain": 0.05,
  "release": 0.05
}).toMaster();
var noise = new Tone.Noise("white").connect(ampEnv).start(); //noise for interrupting uploading

//pulse sound
var autoFilter2 = new Tone.AutoFilter("8n").toMaster().start();
var autoFilter1 = new Tone.AutoFilter("4n").toMaster().start();
var s11 = new Tone.Oscillator(300, "triangle").connect(autoFilter1).connect(autoFilter2).toMaster();
s11.volume.value = -25;

var s12 = new Tone.Player("./SoundTest/deactivation/upload.mp3").toMaster();
s12.volume.value = -10;
s12.loop = true;
var s13 = new Tone.Player("./SoundTest/deactivation/analog extreme.mp3").toMaster();
s13.volume.value = -10;
s13.loop = true;
var s14 = new Tone.Player("./SoundTest/deactivation/mri2.mp3").toMaster();
s14.volume.value = -10;
s14.loop = true;
var osc1 = new Tone.Oscillator(300, "square").toMaster();
osc1.volume.value = -30;
var osc2 = new Tone.Oscillator(340, "sine").toMaster();
osc2.volume.value = -30;
var osc3 = new Tone.Oscillator(500, "triangle").toMaster();
osc3.volume.value = -30;

function preload() {
  a0 = loadSound("./ActivationV3/a0.mp3");
  a1 = loadSound("./ActivationV3/a1.mp3");
  a3 = loadSound("./ActivationV3/a3.mp3");
  a5 = loadSound("./ActivationV3/a5.mp3");
  a7 = loadSound("./ActivationV3/a7.mp3");
  a9 = loadSound("./ActivationV3/a9.mp3");
  a10 = loadSound("./ActivationV3/a10.mp3");
  urg1 = loadSound("./ActivationV3/urging 1.mp3");
  urg2 = loadSound("./ActivationV3/urging 2.mp3");
  d9 = loadSound("./Deactivation/d9.mp3");
  d7 = loadSound("./Deactivation/d7.mp3");
  d5 = loadSound("./Deactivation/d5.mp3");
  d3 = loadSound("./Deactivation/d3.mp3");
  d1 = loadSound("./Deactivation/d1.mp3");
  d0 = loadSound("./Deactivation/d0.mp3");

  u1 = loadSound("./Uploading/1initialize.mp3");
  u2 = loadSound("./Uploading/2scanning.mp3");
  u3 = loadSound("./Uploading/3mapping.mp3");
  u4 = loadSound("./Uploading/4reestablishing.mp3");
  u5 = loadSound("./Uploading/5uploading.mp3");
  u6 = loadSound("./Uploading/Congratulations.mp3");

  // // //testing voice files
  // a0 = loadSound("./ActivationTest/a0.mp3");
  // a1 = loadSound("./ActivationTest/a1.mp3");
  // a3 = loadSound("./ActivationTest/a3.mp3");
  // a5 = loadSound("./ActivationTest/a5.mp3");
  // a7 = loadSound("./ActivationTest/a7.mp3");
  // a9 = loadSound("./ActivationTest/a9.mp3");
  // a10 = loadSound("./ActivationTest/a10.mp3");
  // urg1 = loadSound("./ActivationV3/urging 1.mp3");
  // urg2 = loadSound("./ActivationV3/urging 2.mp3");
  // d9 = loadSound("./DeactivationTest/d9.mp3");
  // d7 = loadSound("./DeactivationTest/d7.mp3");
  // d5 = loadSound("./DeactivationTest/d5.mp3");
  // d3 = loadSound("./DeactivationTest/d3.mp3");
  // d1 = loadSound("./DeactivationTest/d1.mp3");
  // d0 = loadSound("./DeactivationTest/d0.mp3");
}

function setup() {
  uploadingVoice = [u1, u2, u3, u4, u5, u6];
  uploadingSound = [s11, s12, s13, s14];
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
  showSequence = false;
  fullyDeactivated = false;
  seqLit = false;

  //deactivate all modules to start/reset
  for (i = 0; i < 10; i++) {
    modules[i].isActivated = false;
  }
  lastTime = millis();
}


function draw() {
  background(0);
  for (i = 0; i < 10; i++) {
    modules[i].display();
  }

  //module numbers
  for (i = 0; i < 10; i++) {
    fill(255);
    if (i < 5) {
      text(i + 1, windowWidth / 2 - moduleW * 9 / 2 + i * 2 * moduleW + 15, windowHeight / 2 - moduleH + 20);
    } else {
      text(i + 1, windowWidth / 2 - moduleW * 9 / 2 + (i - 5) * 2 * moduleW + 15, windowHeight / 2 + moduleH + 20);
    }
  }

  //waiver
  textSize(20);
  fill(255, 0, 0);
  text("waiver:", 10, windowHeight * 5 / 6 - 60);
  fill(255);
  text("Warning: never take off your headset when the session is in progress, as it might cause irreversible brain damage.", 10, windowHeight * 5 / 6 - 30);
  text("In case of any detected discomfort or malfunction, emergency instruction will light up.", 10, windowHeight * 5 / 6);
  if (showSequence) {   //blink white and red
    if (millis() - seqLastTime > 1000) {
      seqLit = !seqLit
      seqLastTime = millis();
    }
    if (seqLit) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    text("To shut down the program, deactivate the modules in the following sequence: 1, 7, 3, 5, 9, 2, 10, 4, 6, 8", 10, windowHeight * 5 / 6 + 30);
  }
  // console.log(millis() - seqLastTime);

  //track number of activated modules
  numOfActivated = modules.filter(_module => {
    return _module.isActivated === true
  }).length;



  if (stage == "ACTIVATION") {
    if (numOfActivated > 0 && numOfActivated < 9) {
      startUrgingTimer();
    }
    if (numOfActivated == 10) {
      stage = "DEACTIVATION";
    }
  }

  //when deactivation stage + a10 stops, trigger uploading voice timer, blink deactivation sequence text
  if (stage == "DEACTIVATION" && !a10.isPlaying()) {
    startUploadingTimer();
    showSequence = true;
  }

  for (i = 0; i < 10; i++) {
    modules[i].wasActivated = modules[i].isActivated;
  }
  if (fullyDeactivated && !d0.isPlaying()) {
    console.log('shutdown');
    showSequence = false;
    osc1.stop();
    osc2.stop();
    osc3.stop();
  }
}


class Module {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = moduleW;
    this.h = moduleH;
    this.isActivated = false;
    this.wasActivated = false;
  }
  display() {
    if (stage == "ACTIVATION") {
      if (numOfActivated < 9) {
        if (!this.isActivated) {
          fill(255, 255, 255); //starting color
        } else {
          fill(0, 255, 0); //activated color
        }
      } else if (numOfActivated == 9) {
        if (!this.isActivated) {
          fill(255, 255, 255)
        } else {
          fill(random(255), random(255), random(255));
        }
      }
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
    if (this.mouseClickedOnModule(_mx, _my)) {
      if (!this.isActivated) {
        this.isActivated = true;
      }
    }
  }

  deactivate(_mx, _my) {
    if (this.mouseClickedOnModule(_mx, _my)) {
      if (this.isActivated) {
        this.isActivated = false;
      }
    }
  }

  mouseClickedOnModule(_mx, _my) {
    if (_mx > this.x && _mx < (this.x + this.w) && _my > this.y && _my < (this.y + this.h)) {
      return true;
    } else {
      return false;
    }
  }

  // moduleClicked(_mx, _my) {
  //   if (_mx > this.x && _mx < (this.x + this.w) && _my > this.y && _my < (this.y + this.h)) {
  //     let _modulePosition = createVector(this.x, this.y);
  //     return _modulePosition;
  //   } else {
  //     return false;
  //   }
  // }
}

function mousePressed() {
  for (i = 0; i < 10; i++) {
    //if mouse is clicked on the module
    if (modules[i].mouseClickedOnModule(mouseX, mouseY)) {

      //activating stage:
      if (stage == "ACTIVATION") {
        if (numOfActivated == 1 - 1 && !modules[i].isActivated && !a0.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          Tone.Transport.start();
          s1.start();
          a1.play(3);
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 2 - 1 && !modules[i].isActivated && !a1.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          s2.start();
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 3 - 1 && !modules[i].isActivated && !a1.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          s3.start();
          a3.play(1);
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 4 - 1 && !modules[i].isActivated && !a3.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          s4.start();
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 5 - 1 && !modules[i].isActivated && !a3.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          a5.play(2);
          s5.start();
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 6 - 1 && !modules[i].isActivated && !a5.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          s6.start();
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 7 - 1 && !modules[i].isActivated && !a5.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          s7.start();
          a7.play(1);
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 8 - 1 && !modules[i].isActivated && !a7.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          lastTime = millis(); //urging timer

        } else if (numOfActivated == 9 - 1 && !modules[i].isActivated && !a7.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          a9.play();
        } else if (numOfActivated == 10 - 1 && !modules[i].isActivated && !a9.isPlaying()) {
          modules[i].activate(mouseX, mouseY);
          a10.play(3);
          s10.start();
          s1.stop();
          s2.stop();
          s3.stop();
          s4.stop();
          s5.stop();
          s6.stop();
          s7.stop();
          uploadLastTime = millis();
          counter = 0;
          seqLastTime = millis();
        }



      }
      else if (stage == "DEACTIVATION") {  //13579 246810

        // // track which module is clicked
        // for (i = 0; i < 10; i++) {
        //   modulePosition = modules[i].moduleClicked(mouseX, mouseY);
        //     if (modulePosition) {
        //       if (modulePosition.y == windowHeight / 2 - 2 * moduleH) {
        //         index = (modulePosition.x - windowWidth / 2 + moduleW * 9 / 2) / (2 * moduleW);
        //       } else if (modulePosition.y == windowHeight / 2) {
        //         index = (modulePosition.x - windowWidth / 2 + moduleW * 9 / 2) / (2 * moduleW) + 5;
        //       }
        //       console.log(index + 1);
        //     }
        // }

        if (numOfActivated == 10 && !a10.isPlaying() && modules[0].isActivated && modules[0].mouseClickedOnModule(mouseX, mouseY) && modules[0].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[0].deactivate(mouseX, mouseY);
          d9.play();
        } else if (numOfActivated == 9 && modules[6].isActivated && modules[6].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[6].deactivate(mouseX, mouseY);
          if (d9.isPlaying()) {
            d9.stop();
            ampEnv.triggerAttackRelease("0.3");
          }
        } else if (numOfActivated == 8 && modules[2].isActivated && modules[2].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[2].deactivate(mouseX, mouseY);
          d7.play();
        } else if (numOfActivated == 7 && modules[4].isActivated && modules[4].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[4].deactivate(mouseX, mouseY);
          if (d7.isPlaying()) {
            d7.stop();
            ampEnv.triggerAttackRelease("0.3");
          }
        } else if (numOfActivated == 6 && modules[8].isActivated && modules[8].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[8].deactivate(mouseX, mouseY);
          d5.play();
        } else if (numOfActivated == 5 && modules[1].isActivated && modules[1].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[1].deactivate(mouseX, mouseY);
          if (d5.isPlaying()) {
            d5.stop();
            ampEnv.triggerAttackRelease("0.3");
          }
        } else if (numOfActivated == 4 && modules[9].isActivated && modules[9].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[9].deactivate(mouseX, mouseY);
          d3.play();
        } else if (numOfActivated == 3 && modules[3].isActivated && modules[3].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[3].deactivate(mouseX, mouseY);
          if (d3.isPlaying()) {
            d3.stop();
            ampEnv.triggerAttackRelease("0.3");
          }
        } else if (numOfActivated == 2 && modules[5].isActivated && modules[5].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          d1.play();
          modules[5].deactivate(mouseX, mouseY);
        } else if (numOfActivated == 1 && !d1.isPlaying() && modules[7].isActivated && modules[7].mouseClickedOnModule(mouseX, mouseY) && !uploadingVoiceIsPlaying()) {
          modules[7].deactivate(mouseX, mouseY);
          fullyDeactivated = true;
          s11.stop();
          s12.stop();
          s13.stop();
          s14.stop();
          s10.stop();
          ampEnv.triggerAttackRelease("0.3");
          osc1.start();
          osc2.start();
          osc3.start();
          d0.play(1);
        }
      }
    }
  }
}

function startUrgingTimer() {
  // console.log("urging timer starts");
  // console.log(millis() - lastTime);
  if (millis() - lastTime > 5000 && !fullyDeactivated) {
    urg1.play();
    lastTime = millis();
  } else if (a1.isPlaying() || a3.isPlaying() || a5.isPlaying() || a7.isPlaying() || a9.isPlaying() || a10.isPlaying()) {
    lastTime = millis();
  }
}

function startUploadingTimer() {
  // console.log("Uploading timer starts");
  // console.log(millis() - uploadLastTime);
  if (millis() - uploadLastTime > 7000 && counter < uploadingVoice.length && !fullyDeactivated) {
    console.log("uploading in progess")
    s10.stop();
    uploadingVoice[counter].play();
    if (counter < uploadingSound.length) {
      uploadingSound[counter].start();
    }
    counter++;
    uploadLastTime = millis();
  } else if (d9.isPlaying() || d7.isPlaying() || d5.isPlaying() || d3.isPlaying() || d1.isPlaying()) {
    uploadLastTime = millis();
  } 
  else if (counter == 6) {
    showSequence = false;
    s10.stop();
    s11.stop();
    s12.stop();
    s13.stop();
    s14.stop();
  }
}


function uploadingVoiceIsPlaying() {
  let numOfUploadingVoices = uploadingVoice.filter(_voice => _voice.isPlaying() == true).length;
  if (numOfUploadingVoices == 1) {
    return true;
  } else if (numOfUploadingVoices == 0) {
    return false;
  }
}





