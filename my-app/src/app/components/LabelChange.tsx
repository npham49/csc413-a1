"use client";
import React from "react";
import { useState } from "react";

interface LabelChangeProps {
  label: string; // Current label of the selected button
  onChange: (label: string) => void; // Callback to update the label
}
export default function LabelChange({ label, onChange }: LabelChangeProps) {
  const [currentLabel, setLabel] = useState<string>(label);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // Notify the parent component of the label change
    setLabel(event.target.value);
  };

  return (
    <div className="space-y-3" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="text-xl">Change Label</h2>
      <input
        type="text"
        value={currentLabel}
        onChange={handleLabelChange}
        placeholder={currentLabel}
        className="border rounded p-2 text-black"
      />
    </div>
  );
}