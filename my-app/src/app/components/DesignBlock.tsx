"use client";
import { useEffect, useState } from "react";
import dropdownselection from "../misc/dropdownselection.json";
import DropDown from "./Dropdown";

interface DesignBlockProps {
  onSizeChange: (size: { width: string; height: string }) => void;
  selectedElement: { width: string; height: string } | undefined; // Add selectedElement prop
}

export default function DesignBlock({ onSizeChange, selectedElement }: DesignBlockProps) {
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("50px");

  // Update dropdown values when the selected element changes
  useEffect(() => {
    if (selectedElement) {
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
    }
  }, [selectedElement]);

  const handleWidthChange = (value: string) => {
    setWidth(value);
    onSizeChange({ width: value, height }); // Pass the correct width and current height
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    onSizeChange({ width, height: value }); // Pass the current width and correct height
  };

  return (
    <div className="h-1/2 bg-dark text-white p-8 space-y-2">
      <h1 className="text-center text-2xl">Design</h1>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <DropDown
          label="Width"
          options={dropdownselection.width}
          onChange={handleWidthChange}
          defaultValue={width} // Set the current width as the default value
        />
        <DropDown
          label="Height"
          options={dropdownselection.height}
          onChange={handleHeightChange}
          defaultValue={height} // Set the current height as the default value
        />
      </div>
    </div>
  );
}