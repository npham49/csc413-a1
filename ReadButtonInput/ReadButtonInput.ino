// Define button pins
const int button1Pin = 2;  // Button 1 connected to pin 2
const int button2Pin = 3;  // Button 2 connected to pin 3
const int button3Pin = 4;  // Button 3 connected to pin 4

// Variables to store button states
int button1State = 0;
int button2State = 0;
int button3State = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Initialize button pins as inputs with pull-up resistors
  pinMode(button1Pin, INPUT_PULLUP);
  pinMode(button2Pin, INPUT_PULLUP);
  pinMode(button3Pin, INPUT_PULLUP);
}

void loop() {
  // Read the state of each button
  button1State = digitalRead(button1Pin);
  button2State = digitalRead(button2Pin);
  button3State = digitalRead(button3Pin);

  // Check which button was pressed
  if (button1State == LOW) {  // Button is pressed when LOW due to pull-up
    Serial.println("Button 1 pressed!");
    delay(200);  // Debounce delay
  }
  
  if (button2State == LOW) {
    Serial.println("Button 2 pressed!");
    delay(200);  // Debounce delay
  }
  
  if (button3State == LOW) {
    Serial.println("Button 3 pressed!");
    delay(200);  // Debounce delay
  }
}
