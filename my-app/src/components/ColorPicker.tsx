"use client";
import React, { useState, useEffect } from "react";

interface ColorPickerProps {
  color: string; // Current color of the selected button
  onChange: (color: string) => void; // Callback to update the color
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>(color);

  // Update the selected color when the color prop changes
  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    onChange(newColor); // Notify the parent component of the color change
  };

  return (
    <div className="space-y-3" style={{ textAlign: "center", marginTop: "20px" }}>
      <div className="flex flex-row justify-center space-x-2">
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          style={{ cursor: "pointer" }}
        />
        <p className="text-lg">
          Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
        </p>
      </div>
      
    </div>
  );
}