"use client";
import { useEffect, useState } from "react";
import dropdownselection from "../misc/dropdownselection.json";
import DropDown from "./Dropdown";
import ColorPicker from "./ColorPicker";

interface DesignBlockProps {
  onSizeChange: (size: { width: string; height: string, opacity: string, color: string }) => void;
  selectedElement: { width: string; height: string, opacity: string, color: string } | undefined; // Add selectedElement prop
}

export default function DesignBlock({ onSizeChange, selectedElement }: DesignBlockProps) {
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("50px");
  const [opacity, setOpacity] = useState("1");
  const [color, setColor] = useState("#ffffff");

  // Update dropdown values when the selected element changes
  useEffect(() => {
    if (selectedElement) {
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
      setOpacity(selectedElement.opacity);
    }
  }, [selectedElement]);

  const handleWidthChange = (value: string) => {
    setWidth(value);
    onSizeChange({ width: value, height, opacity, color }); // Pass the correct width and current height
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    onSizeChange({ width, height: value, opacity, color }); // Pass the current width and correct height
  };

  const handleOpacityChange = (value: string) => {
    setOpacity(value);
    onSizeChange({ width, height, opacity: value, color }); // Pass the current width and correct height
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    onSizeChange({ width, height, opacity, color: value }); // Pass the current width and correct height
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
      <DropDown label="Opacity"
          options={dropdownselection.opacity}
          onChange={handleOpacityChange}
          defaultValue={opacity}/>
    <ColorPicker
        onChange={handleColorChange}/>
    </div>
  );
}