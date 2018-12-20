//const int btnStartNum = 31;
const int btnStartNum = 5;

const int btnPin_1 = btnStartNum + 0;
const int btnPin_2 = btnStartNum + 1;
const int btnPin_3 = btnStartNum + 2;
int btn1State, btn2State, btn3State;
int pBtn1State, pBtn2State, pBtn3State;
int incomingByte;
int btnPressed=0;

void setup() {
  Serial.begin(9600);
  pinMode(btnPin_1, INPUT);
  pinMode(btnPin_2, INPUT);
  pinMode(btnPin_3, INPUT);
  pinMode(9, OUTPUT);

}

void loop() {
  btn1State = digitalRead(btnPin_1);
  btn2State = digitalRead(btnPin_2);
  btn3State = digitalRead(btnPin_3);

  if (btn1State !=  pBtn1State && btn1State == 1) {
    btnPressed = 1;
  } else if (btn2State !=  pBtn2State && btn2State == 1) {
    btnPressed = 2;
  } else if (btn3State !=  pBtn3State && btn3State == 1) {
    btnPressed = 3;
  } else {
    btnPressed = 0;
  }

  pBtn1State = btn1State;
  pBtn2State = btn2State;
  pBtn3State = btn3State;
  
//  Serial.println(btnPressed);
//  Serial.write(btnPressed);

//    Serial.print(btn1State); Serial.print(",");
//    Serial.print(btn2State); Serial.print(",");
//    Serial.println(btn3State);
  delay(1);

  //receiveing data from p5
  if (Serial.available() > 0) {   // see if there's incoming serial data
    incomingByte = Serial.read(); // read it
    if (incomingByte == 'H') {    // if it's a capital H (ASCII 72),
      digitalWrite(9, HIGH); // turn on the LED
    }
    if (incomingByte == 'L') {    // if it's an L (ASCII 76)
      digitalWrite(9, LOW);  // turn off the LED
    }
  }

}
