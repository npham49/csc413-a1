import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

// Node.js script to read and process button events from Arduino
// This script connects to the Arduino via serial port and processes
// both button press and hold events

import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

// Create a new serial port instance
// Note: The port path needs to be adjusted based on your system:
// - Windows: COM3, COM4, etc.
// - macOS: /dev/cu.usbserial-140, /dev/tty.usbmodem*
// - Linux: /dev/ttyUSB0, /dev/ttyACM0
const port = new SerialPort({
  path: "/dev/cu.usbserial-140", // Update this to match your system's port
  baudRate: 9600, // Must match Arduino's Serial.begin() rate
});

// Create a parser that reads complete lines from the serial port
// This ensures we get complete JSON messages
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Listen for incoming data from the Arduino
parser.on("data", (data: string) => {
  try {
    // Attempt to parse the received data as JSON
    const buttonEvent = JSON.parse(data);

    // Handle different types of button events
    if (buttonEvent.action === "press") {
      console.log(`Button ${buttonEvent.number} was pressed`);
      // TODO: Add your press-specific logic here
      // For example: trigger a function, update UI, etc.
      io.emit("input", "buttonPress", buttonEvent.number);
    } else if (buttonEvent.action === "hold") {
      console.log(`Button ${buttonEvent.number} is being held`);
      // TODO: Add your hold-specific logic here
      // For example: start a continuous action, show a different UI state, etc.
      io.emit("input", "buttonHold", buttonEvent.number);
    } else if (
      buttonEvent.action === "joystick" &&
      buttonEvent.direction === "left"
    ) {
      console.log("Joystick Left");
      io.emit("input", "joystickLeft");
    } else if (
      buttonEvent.action === "joystick" &&
      buttonEvent.direction === "right"
    ) {
      console.log("Joystick Right");
      io.emit("input", "joystickRight");
    } else if (
      buttonEvent.action === "joystick" &&
      buttonEvent.direction === "up"
    ) {
      console.log("Joystick Up");
      io.emit("input", "joystickUp");
    } else if (
      buttonEvent.action === "joystick" &&
      buttonEvent.direction === "down"
    ) {
      console.log("Joystick Down");
      io.emit("input", "joystickDown");
    }
  } catch (error) {
    // Handle non-JSON messages (like the initial "Hello" message)
    // or malformed JSON data
    console.log("Received:", data);
    io.emit("error", data);
  }
});

// Handle any serial port errors
port.on("error", (err: Error) => {
  console.error("Error:", err.message);
  // TODO: Add error recovery logic if needed
  io.emit("error", err.message);
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
