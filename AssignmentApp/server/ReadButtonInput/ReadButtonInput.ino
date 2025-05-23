// Button Input Detection with Press/Hold Differentiation
// This program reads input from 4 buttons and differentiates between
// quick presses and long holds using timing thresholds

#define VRX_PIN  A1 // Arduino pin connected to VRX pin
#define VRY_PIN  A0 // Arduino pin connected to VRY pin
#define SW_PIN   2  // Arduino pin connected to SW  pin

#define LEFT_THRESHOLD  400
#define RIGHT_THRESHOLD 800
#define UP_THRESHOLD    400
#define DOWN_THRESHOLD  800

#define COMMAND_NO     0x00
#define COMMAND_LEFT   0x01
#define COMMAND_RIGHT  0x02
#define COMMAND_UP     0x04
#define COMMAND_DOWN   0x08

int xValue = 0 ; // To store value of the X axis
int yValue = 0 ; // To store value of the Y axis
int command = COMMAND_NO;
int lastCommand = COMMAND_NO; // Track the last command sent for debouncing

// Pin definitions for the 4 buttons
const int buttonPin1 = 2;  // Button 1 connected to digital pin 2
const int buttonPin2 = 3;  // Button 2 connected to digital pin 3
const int buttonPin3 = 4;  // Button 3 connected to digital pin 4
const int buttonPin4 = 5;  // Button 4 connected to digital pin 5
const int buttonPin5 = 6;  // Button 5 connected to digital pin 6
const int buttonPin6 = 7;  // Button 6 connected to digital pin 7
const int buttonPin7 = 8;  // Button 7 connected to digital pin 8
const int buttonPin8 = 9;  // Button 8 connected to digital pin 9
const int buttonPin9 = 10;  // Button 9 connected to digital pin 10

// Timing and state tracking variables
unsigned long buttonPressTime1 = 0;  // Stores when button 1 was pressed
unsigned long buttonPressTime2 = 0;  // Stores when button 2 was pressed
unsigned long buttonPressTime3 = 0;  // Stores when button 3 was pressed
unsigned long buttonPressTime4 = 0;  // Stores when button 4 was pressed
unsigned long buttonPressTime5 = 0;  // Stores when button 5 was pressed
unsigned long buttonPressTime6 = 0;  // Stores when button 6 was pressed
unsigned long buttonPressTime7 = 0;  // Stores when button 7 was pressed
unsigned long buttonPressTime8 = 0;  // Stores when button 8 was pressed
unsigned long buttonPressTime9 = 0;  // Stores when button 9 was pressed

// Button state tracking flags
bool buttonWasPressed1 = false;  // Tracks if button 1 was previously pressed
bool buttonWasPressed2 = false;  // Tracks if button 2 was previously pressed
bool buttonWasPressed3 = false;  // Tracks if button 3 was previously pressed
bool buttonWasPressed4 = false;  // Tracks if button 4 was previously pressed
bool buttonWasPressed5 = false;  // Tracks if button 5 was previously pressed
bool buttonWasPressed6 = false;  // Tracks if button 6 was previously pressed
bool buttonWasPressed7 = false;  // Tracks if button 7 was previously pressed
bool buttonWasPressed8 = false;  // Tracks if button 8 was previously pressed
bool buttonWasPressed9 = false;  // Tracks if button 9 was previously pressed

// Configuration
const unsigned long HOLD_THRESHOLD = 500;  // Time in milliseconds to consider a hold (500ms)

void setup()
{
  // Initialize serial communication at 9600 baud rate
  Serial.begin(9600);
  Serial.print("Hello");  // Initial connection message
  
  // Configure all button pins as inputs
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(buttonPin4, INPUT);
  pinMode(buttonPin5, INPUT);
  pinMode(buttonPin6, INPUT);
  pinMode(buttonPin7, INPUT);
  pinMode(buttonPin8, INPUT);
  pinMode(buttonPin9, INPUT);
}

// ideally we only want to check the released event, pressed event is used to mainly track the hold time
// once release event comes we decide based on the hold time
void checkButton(int buttonPin, unsigned long &pressTime, bool &wasPressed, int buttonNumber) {
  int buttonState = digitalRead(buttonPin);  // Read current button state
  
  if (buttonState == LOW) {  // Button is pressed (LOW due to pull-up)
    if (!wasPressed) {  // Button was just pressed (transition from HIGH to LOW)
      pressTime = millis();  // Record the time of press
      wasPressed = true;     // Update state tracking
    } else {  // Button is being held down
      unsigned long currentTime = millis();
      // if held longer than the time we set as the threshold for considering it as a hold, send a hold event
      if (currentTime - pressTime >= HOLD_THRESHOLD) {  // Check if held long enough
        // Send hold event JSON
        Serial.println("{\"action\":\"hold\",\"number\":\"" + String(buttonNumber) + "\"}");
        pressTime = currentTime;  // Reset timer to prevent multiple hold messages
      }
    }
  // if released and lower than the time we set as the threshold for considering it as a hold, send a press event
  } else {  // Button is released (HIGH)
    if (wasPressed) {  // Button was just released (transition from LOW to HIGH)
      unsigned long pressDuration = millis() - pressTime;  // Calculate how long button was pressed
      if (pressDuration < HOLD_THRESHOLD) {  // If pressed for less than threshold
        // Send press event JSON
        Serial.println("{\"action\":\"press\",\"number\":\"" + String(buttonNumber) + "\"}");
      }
      wasPressed = false;  // Reset state tracking
    }
  }
}

void checkJoystick() {
  xValue = analogRead(VRX_PIN);
  yValue = analogRead(VRY_PIN);

  command = COMMAND_NO;

  if (xValue < LEFT_THRESHOLD)
    command = command | COMMAND_LEFT;
  else if (xValue > RIGHT_THRESHOLD)
    command = command | COMMAND_RIGHT;

  if (yValue < UP_THRESHOLD)
    command = command | COMMAND_UP;
  else if (yValue > DOWN_THRESHOLD)
    command = command | COMMAND_DOWN;

  // Debounce: Only log a new event if lastCommand was neutral (COMMAND_NO)
  if (lastCommand == COMMAND_NO && command != COMMAND_NO) {
    if (command & COMMAND_LEFT) {
      Serial.println("{\"action\":\"joystick\",\"direction\":\"left\"}");
    }
    if (command & COMMAND_RIGHT) {
      Serial.println("{\"action\":\"joystick\",\"direction\":\"right\"}");
    }
    if (command & COMMAND_UP) {
      Serial.println("{\"action\":\"joystick\",\"direction\":\"up\"}");
    }
    if (command & COMMAND_DOWN) {
      Serial.println("{\"action\":\"joystick\",\"direction\":\"down\"}");
    }
  }
  // Update lastCommand
  lastCommand = command;
}

void loop()
{
  // Check each button's state and generate appropriate events
  checkButton(buttonPin1, buttonPressTime1, buttonWasPressed1, 2);
  checkButton(buttonPin2, buttonPressTime2, buttonWasPressed2, 3);
  checkButton(buttonPin3, buttonPressTime3, buttonWasPressed3, 4);
  checkButton(buttonPin4, buttonPressTime4, buttonWasPressed4, 5);
  checkButton(buttonPin5, buttonPressTime5, buttonWasPressed5, 6);
  checkButton(buttonPin6, buttonPressTime6, buttonWasPressed6, 7);
  checkButton(buttonPin7, buttonPressTime7, buttonWasPressed7, 8);
  checkButton(buttonPin8, buttonPressTime8, buttonWasPressed8, 9);
  checkButton(buttonPin9, buttonPressTime9, buttonWasPressed9, 10);
  checkJoystick();
  delay(10);  // Small delay to prevent button bouncing and reduce CPU usage
}