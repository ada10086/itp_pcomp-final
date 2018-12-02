var modules = []
var moduleW = 40;
var moduleH = 100;
var button;
var stage; //0 = start/reset, 1 = activation, 2 = enter next stage?, 3 = deactivation
var numOfActivated;

//voice:
var a1, a3, a5, a7, a9, a10, urg1, urg2; //activation stage + urging
var u1, u2, u3, u4, u5, u6; //uploading stage
var d1, d3, d5, d7, d9; //deactivation stage


function preload() {
  a0 = loadSound("./Activation/0.mp3");
  a1 = loadSound("./Activation/1st.mp3");
  a3 = loadSound("./Activation/3rd.mp3");
  a5 = loadSound("./Activation/5th.mp3");
  a7 = loadSound("./Activation/7th.mp3");
  a9 = loadSound("./Activation/9th.mp3");
  a10 = loadSound("./Activation/10th.mp3");
  urg1 = loadSound("./Activation/urging 1.mp3");
  urg2 = loadSound("./Activation/urging 2.mp3");
  d9 = loadSound("./Deactivation/9.mp3");
  d7 = loadSound("./Deactivation/7.mp3");
  d5 = loadSound("./Deactivation/5.mp3");
  d3 = loadSound("./Deactivation/3.mp3");
  d1 = loadSound("./Deactivation/1.mp3");
  u1 = loadSound("./Uploading/1initialize.mp3");
  u2 = loadSound("./Uploading/2scanning.mp3");
  u3 = loadSound("./Uploading/3mapping.mp3");
  u4 = loadSound("./Uploading/4reestablishing.mp3");
  u5 = loadSound("./Uploading/5uploading.mp3");
  u6 = loadSound("./Uploading/Congratulations.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //initialize modules
  for (i = 0; i < 10; i++) {
    if (i < 5) { //1st row
      modules[i] = new Module(windowWidth / 2 - moduleW * 9 / 2 + i * 2 * moduleW, windowHeight / 2 - 2 * moduleH);
    } else { //2nd row
      modules[i] = new Module(windowWidth / 2 - moduleW * 9 / 2 + (i - 5) * 2 * moduleW, windowHeight / 2);
    }
  }
  button = createButton("start session");
  button.position(20, 20);
  button.mousePressed(startSession);
}

// function detectModuleIndex(){
//   if(mouseX)
//   return i;
// }


function startSession() {
  // console.log("start session");
  a0.play();
  stage = "ACTIVATION";
  //deactivate all modules to start/reset
  for (i = 0; i < 10; i++) {
    modules[i].isActivated = false;
  }
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
  console.log("numOfActivated:" + numOfActivated);

  if (stage == "ACTIVATION") {
    if (numOfActivated == 10) {
      stage = "DEACTIVATION";
    }
  }
  // console.log("stage = " + stage);
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
    if(stage == "ACTIVATION" ){
      if(this.isActivated == false){
        fill(255, 255, 255);
      }else{
        fill(0,255,0)
      }
    } else if(stage == "DEACTIVATION" ) {
      if(this.isActivated == false){
        fill(255, 0, 0);
      }else{
        fill(0,255,0);
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
}

function mousePressed() {
  //activating stage:
  if (stage == "ACTIVATION") {
    // for (i = 0; i < 10; i++) {
    //   if (modules[i].isActivated == false) {
    //     modules[i].activate(mouseX, mouseY);
    //   }
    // }

    if (numOfActivated == 1-1 && !a0.isPlaying()){
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a1.play();
    }else if (numOfActivated == 2-1 && !a1.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
    } else if (numOfActivated == 3-1 && !a1.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a3.play();
    } else if (numOfActivated == 4-1 && !a3.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
    }else if (numOfActivated == 5-1 && !a3.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a5.play();
    } else if (numOfActivated == 6-1 && !a5.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
    } else if (numOfActivated == 7-1 && !a5.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a7.play();
    } else if (numOfActivated == 8-1 && !a7.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
    } else if (numOfActivated == 9-1 && !a7.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a9.play();
    } else if (numOfActivated == 10-1 && !a9.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].activate(mouseX, mouseY);
      }
      a10.play();
    }


    // let index = modules.findIndex(module => module.isActivated);
    // console.log(index);
  } 
  else if (stage == "DEACTIVATION") {  //13579 246810
    // for (i = 0; i < 10; i++) {
    //   if (modules[i].isActivated == true) {
    //     modules[i].deactivate(mouseX, mouseY);
    //   }
    // }

    if (numOfActivated == 10 && !a10.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
      d9.play();
    } else if (numOfActivated == 9 && !d9.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
    } else if (numOfActivated == 8 && !d9.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
      d7.play();
    }else if (numOfActivated == 7 && !d7.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
    }else if (numOfActivated == 6 && !d7.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
      d5.play();
    } else if (numOfActivated == 5 && !d5.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
    }else if (numOfActivated == 4 && !d5.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
      d3.play();
    }else if (numOfActivated == 3 && !d3.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
    }else if (numOfActivated == 2 && !d3.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
      d1.play();
    }else if (numOfActivated == 1 && !d1.isPlaying()) {
      for (i = 0; i < 10; i++) {
          modules[i].deactivate(mouseX, mouseY);
      }
    }

  }

}
