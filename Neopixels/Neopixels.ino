
#include <Adafruit_NeoPixel.h>   // including the Adafruit library
#define PIN 7   //defining the PWM pin
#define N_LEDS 6     //number of LED units on the strip (can go up to 300)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN); //declared neopixel object

//int R = 10;
int G = 0;
//int B = 10;
int s = 2;

void setup() {
  strip.begin();
}

void loop() {
  //  //start
  //  for (int i = 0; i < 6; i++) {
  //    strip.setPixelColor(i, 255, 255, 255);
  //  }
  //  strip.show();

  //
  //activated
  //  for (int i = 0; i < 6; i++) {
  //    strip.setPixelColor(i, 0, G, 0);
  //  }
  //  G = G + s;
  //  if (G < 1 || G > 254) { //1-254 to prevent from blinking
  //    s = -s;
  //  }
  //  strip.show();
  //  delay(10);

  // advanced stage
  //  for (int i = 0; i < 6; i++) {
  //    strip.setPixelColor(i, random(255), random(255), random(255));
  //  }
  //  strip.show();
  //  delay(60);

  //  //deactivated
  //  for (int i = 0; i < 6; i++) {
  //    strip.setPixelColor(i, 255, 0, 0);
  //  }
  //  strip.show();
  //
  //  //warning
//    for (int i = 0; i < 6; i++) {
//      strip.setPixelColor(i, G, 0, 0);
//    }
//    G = G + 4 * s;
//    if (G < 1 || G > 254) { //1-254 to prevent from blinking
//      s = -s;
//    }
//    strip.show();
//    delay(10);

//  //access denied
//  for (int i = 0; i < 6; i++) {
//    strip.setPixelColor(i, 255, 0, 0);
//  }
//  delay(10);
//  for (int i = 0; i < 6; i++) {
//    strip.setPixelColor(i, 0, 0, 0);
//  }
//  delay(10);
////  strip.show();
}
