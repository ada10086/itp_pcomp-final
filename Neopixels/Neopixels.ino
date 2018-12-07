
#include <Adafruit_NeoPixel.h>   // including the Adafruit library
#ifdef __AVR__
#include <avr/power.h>
#endif
#define PIN 7
#define N_LEDS 60     //number of LED units on the strip (can go up to 300)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN); //declared neopixel object
//Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);

//int R = 10;
int G = 0;
//int B = 10;
int s = 1;
unsigned long buttonPressedTime; //for blinking

void setup() {
  strip.begin();
  strip.show();

  // record time when button pressed
  buttonPressedTime = millis();
}

void loop() {
  //  //starting - all white
  //        for (int i = 0; i < 60; i++) {
  //          strip.setPixelColor(i, 255, 255, 255);
  //        }
  //        strip.show();


  //activating - green
  //  if (millis() - buttonPressedTime < 700) { //blink for 0.7s when module moving
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 0, 255, 0);
  //    }
  //    strip.show();
  //    delay(100);
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 0, 0, 0);
  //    }
  //    strip.show();
  //    delay(100);
  //  }else{    //fade in fade out when activated
  //      for (int i = 0; i < 6; i++) {
  //        strip.setPixelColor(i, 0, G, 0);
  //      }
  //      G = G + 3*s;
  //      if (G < 1 || G > 254) { //1-254 to prevent from blinking
  //        s = -s;
  //      }
  //      strip.show();
  //      delay(10);
  //  }
  //

  // //9th module activated,
  //  rainbow(10);//except the last remaining module (white)????


  // 10th module activated
  for (int i = 6; i < 60; i++) {
    strip.setPixelColor(i, random(255), 0, 0);
  }
  strip.show();
  delay(60);


  // //uploading start
  //  theaterChase(strip.Color(127, 127, 127), 50); // White
  theaterChaseRainbow(50);  //except deactivated modules.



  //  //deactivating - red
  //  if (millis() - buttonPressedTime < 700) { //blink for 0.7s when module moving
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 255, 0, 0);
  //    }
  //    strip.show();
  //    delay(100);
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 0, 0, 0);
  //    }
  //    strip.show();
  //    delay(100);
  //  }else{    //solid dim red when deactivated
  //      for (int i = 0; i < 6; i++) {
  //        strip.setPixelColor(i, 20, 0, 0);
  //      }
  //      strip.show();
  //  }


  //  //access denied(button press when activating/uploading voice is playing) - orange
  //  if (millis() - buttonPressedTime < 200) { //blink orange for 0.2s
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 255, 50, 0);
  //    }
  //    strip.show();
  //    delay(50);
  //    for (int i = 0; i < 6; i++) {
  //      strip.setPixelColor(i, 0, 0, 0);
  //    }
  //    strip.show();
  //    delay(50);
  //  } else {
  //    Serial.println("go back to previous color");
  //  }
}



void rainbow(uint8_t wait) {
  uint16_t i, j;

  for (j = 0; j < 256; j++) {
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

void theaterChase(uint32_t c, uint8_t wait) {
  for (int j = 0; j < 10; j++) { //do 10 cycles of chasing
    for (int q = 0; q < 3; q++) {
      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        strip.setPixelColor(i + q, c);  //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        strip.setPixelColor(i + q, 0);      //turn every third pixel off
      }
    }
  }
}

void theaterChaseRainbow(uint8_t wait) {
  for (int j = 0; j < 256; j++) {   // cycle all 256 colors in the wheel
    for (int q = 0; q < 3; q++) {
      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        //        strip.setPixelColor(i+q, Wheel( (i+j) % 255));    //turn every third pixel on
        strip.setPixelColor(i + q, 255 - (i + j) % 255 * 3, 0, (i + j) % 255 * 3); //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        strip.setPixelColor(i + q, 0);      //turn every third pixel off
      }
    }
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}
