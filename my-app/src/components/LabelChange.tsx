"use client";
import React, { useState, useEffect } from "react";
import T9Keyboard from "@/components/t9-keyboard";

interface LabelChangeProps {
  label: string; // Current label of the selected button
  onChange: (label: string) => void; // Callback to update the label
}

export default function LabelChange({ label, onChange }: LabelChangeProps) {
  const [output, setOutput] = useState(label); // Initialize with the current label

  // Sync the output with the label prop when the label changes
  useEffect(() => {
    setOutput(label);
  }, [label]);

  // Handle changes from T9Keyboard
  const handleOutputChange = (newOutput: string) => {
    setOutput(newOutput); // Update the local output state
    onChange(newOutput); // Notify the parent component of the label change
  };

  return (
    <div
      className="space-y-3"
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <h2 className="text-xl">Change Label</h2>
      <T9Keyboard
        output={output} // Pass the current output to T9Keyboard
        setOutput={handleOutputChange} // Update the output and notify the parent
        onChange={handleOutputChange} // Sync changes with the parent
      />
    </div>
  );
}