#include <Adafruit_NeoPixel.h>   // including the Adafruit library
#define PIN 8   //defining the PWM pin
#define N_LEDS 5     //number of LED units on the strip (can go up to 300)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN); //declared neopixel object

int G = 255;
int s = 1; //blinking speed
int button1State = 0;       // current state of the button
int pButton1State = 0;   // previous state of the button
int stage = 3;   // change the number 0-3 
void setup() {
  strip.begin();
  pinMode(7, INPUT);
  Serial.begin(9600);
}

void loop() {
  int button1State = digitalRead(7);
  //starting stage, all white
  if (stage == 0) {
    for (int i = 0; i < 60; i++) {
      strip.setPixelColor(i, 255, 255, 255);
    }
    strip.show();
//    if (button1State != pButton1State && button1State == 1 ) {
//      stage = 1;
//    }
  }

  //activation stage. if activated, blink green
  if (stage == 1 ) {
    for (int i = 0 ; i < 6; i++) {
      strip.setPixelColor(i, 0, G, 0);
    }
    G = G + s;
    if (G < 1 || G > 255) {
      s = -s;
    }
    strip.show();
    delay(2);
//    if (button1State != pButton1State && button1State == 1 ) {
//      stage = 2;
//    }
  }

//  //do you want to enter next stage of the program
  if (stage == 2) {
    for (int i = 0 ; i < 6; i++) {
      strip.setPixelColor(i, random(255), random(255), random(255));
      delay(20);
    }
    strip.show();
//    if (button1State != pButton1State && button1State == 1 ) {
//      stage = 3;
//    }
  }
//
//  //deactivation stage, if deactivated, red
  if (stage == 3) {
    for (int i = 0 ; i < 6; i++) {
      strip.setPixelColor(i, 255, 0, 0);
    }
    strip.show();
  }

  pButton1State = button1State;
  Serial.print(button1State);
  Serial.print(",");
  Serial.println(stage);
}
