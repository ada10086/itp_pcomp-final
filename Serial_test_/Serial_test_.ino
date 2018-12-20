//const int btnStartNum = 31;
const int btnStartNum = 5;

const int btnPin_1 = btnStartNum + 0;
const int btnPin_2 = btnStartNum + 1;
const int btnPin_3 = btnStartNum + 2;
int btn1State, btn2State, btn3State;
int incomingByte;

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

  Serial.print(btn1State); Serial.print(",");
  Serial.print(btn2State); Serial.print(",");
  Serial.println(btn3State);


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
