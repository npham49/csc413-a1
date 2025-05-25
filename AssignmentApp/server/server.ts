import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

// Node.js script to read and process button events from Arduino
// This script connects to the Arduino via serial port and processes
// both button press and hold events

import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import robot from "robotjs";

robot.setMouseDelay(2);

let mouseHold = false;

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
  path: "/dev/cu.usbserial-130", // Update this to match your system's port
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
    if (buttonEvent.action === "press" && buttonEvent.number !== 10) {
      console.log(`Button ${buttonEvent.number} was pressed`);
      // TODO: Add your press-specific logic here
      // For example: trigger a function, update UI, etc.
      io.emit("input", "buttonPress", buttonEvent.number);
    } else if (buttonEvent.action === "hold" && buttonEvent.number !== 10) {
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
    } else if (buttonEvent.action === "mouseMove") {
      console.log("Mouse Move", buttonEvent.direction);
      if (buttonEvent.direction === "left") {
        if (mouseHold) {
          robot.dragMouse(robot.getMousePos().x - 15, robot.getMousePos().y);
        } else {
          robot.moveMouse(robot.getMousePos().x - 15, robot.getMousePos().y);
        }
      } else if (buttonEvent.direction === "right") {
        if (mouseHold) {
          robot.dragMouse(robot.getMousePos().x + 15, robot.getMousePos().y);
        } else {
          robot.moveMouse(robot.getMousePos().x + 15, robot.getMousePos().y);
        }
      } else if (buttonEvent.direction === "up") {
        if (mouseHold) {
          robot.dragMouse(robot.getMousePos().x, robot.getMousePos().y - 15);
        } else {
          robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y - 15);
        }
      } else if (buttonEvent.direction === "down") {
        if (mouseHold) {
          robot.dragMouse(robot.getMousePos().x, robot.getMousePos().y + 15);
        } else {
          robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y + 15);
        }
      }
    } else if (buttonEvent.action === "mouseLeftClick") {
      if (mouseHold) {
        console.log("Mouse Left Release");
        robot.mouseToggle("up", "left");
        mouseHold = false;
      } else {
        console.log("Mouse Left Click");
        robot.mouseClick();
      }
    } else if (buttonEvent.action === "mouseLeftHold") {
      if (!mouseHold) {
        console.log("Mouse Left Hold");
        robot.mouseToggle("down", "left");
        mouseHold = true;
      }
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
