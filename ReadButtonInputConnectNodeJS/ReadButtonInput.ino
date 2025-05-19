// Button Input Detection with Press/Hold Differentiation
// This program reads input from 4 buttons and differentiates between
// quick presses and long holds using timing thresholds

// Pin definitions for the 4 buttons
const int buttonPin1 = 2;  // Button 1 connected to digital pin 2
const int buttonPin2 = 3;  // Button 2 connected to digital pin 3
const int buttonPin3 = 4;  // Button 3 connected to digital pin 4
const int buttonPin4 = 5;  // Button 4 connected to digital pin 5

// Timing and state tracking variables
unsigned long buttonPressTime1 = 0;  // Stores when button 1 was pressed
unsigned long buttonPressTime2 = 0;  // Stores when button 2 was pressed
unsigned long buttonPressTime3 = 0;  // Stores when button 3 was pressed
unsigned long buttonPressTime4 = 0;  // Stores when button 4 was pressed

// Button state tracking flags
bool buttonWasPressed1 = false;  // Tracks if button 1 was previously pressed
bool buttonWasPressed2 = false;  // Tracks if button 2 was previously pressed
bool buttonWasPressed3 = false;  // Tracks if button 3 was previously pressed
bool buttonWasPressed4 = false;  // Tracks if button 4 was previously pressed

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
        Serial.println("{\"action\":\"hold\",\"nuimber\":\"" + String(buttonNumber) + "\"}");
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

void loop()
{
  // Check each button's state and generate appropriate events
  checkButton(buttonPin1, buttonPressTime1, buttonWasPressed1, 1);
  checkButton(buttonPin2, buttonPressTime2, buttonWasPressed2, 2);
  checkButton(buttonPin3, buttonPressTime3, buttonWasPressed3, 3);
  checkButton(buttonPin4, buttonPressTime4, buttonWasPressed4, 4);
  
  delay(10);  // Small delay to prevent button bouncing and reduce CPU usage
}