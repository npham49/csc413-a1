"use client";
import { useEffect, useState } from "react";
import dropdownselection from "@/misc/dropdownselection.json";
import DropDown from "./Dropdown";
import ColorPicker from "./ColorPicker";
import LabelChange from "./LabelChange";

interface DesignBlockProps {
  onSizeChange: (size: {
    width: string;
    height: string;
    opacity: string;
    color: string;
    label: string;
  }) => void;
  selectedElement:
    | {
        width: string;
        height: string;
        opacity: string;
        color: string;
        label: string;
      }
    | undefined; // Add selectedElement prop
}

export default function DesignBlock({
  onSizeChange,
  selectedElement,
}: DesignBlockProps) {
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("50px");
  const [opacity, setOpacity] = useState("1");
  const [color, setColor] = useState("#ffffff");
  const [label, setLabel] = useState("Button");

  // Update dropdown values when the selected element changes
  useEffect(() => {
    if (selectedElement) {
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
      setOpacity(selectedElement.opacity);
      setColor(selectedElement.color);
      setLabel(selectedElement.label); // Assuming label is part of the selected element
    }
  }, [selectedElement]);

  const handleWidthChange = (value: string) => {
    setWidth(value);
    onSizeChange({ width: value, height, opacity, color, label }); // Pass the correct width and current height
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    onSizeChange({ width, height: value, opacity, color, label }); // Pass the current width and correct height
  };

  const handleOpacityChange = (value: string) => {
    setOpacity(value);
    onSizeChange({ width, height, opacity: value, color, label }); // Pass the current width and correct height
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    onSizeChange({ width, height, opacity, color: value, label }); // Pass the current width and correct height
  };

  const handleLabelChange = (value: string) => {
    setLabel(value);
    onSizeChange({ width, height, opacity, color, label: value }); // Pass the current width and correct height
  };

  return (
    <div className="h-full bg-dark text-white p-8 space-y-2">
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
      <DropDown
        label="Opacity"
        options={dropdownselection.opacity}
        onChange={handleOpacityChange}
        defaultValue={opacity}
      />
      <ColorPicker color={color} onChange={handleColorChange} />
      <LabelChange label={label} onChange={handleLabelChange} />
    </div>
  );
}
