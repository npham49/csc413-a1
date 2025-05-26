"use client";
import { useEffect, useState } from "react";
import dropdownselection from "../misc/dropdownselection.json";
import DropDown from "./Dropdown";
import ColorPicker from "./ColorPicker";
import LabelChange from "./LabelChange";

interface DesignBlockProps {
  onSizeChange: (size: { width: string; height: string; opacity: string; color: string; label: string }) => void;
  selectedElement: { width: string; height: string; opacity: string; color: string; label: string } | undefined;
}

export default function DesignBlock({ onSizeChange, selectedElement }: DesignBlockProps) {
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("50px");
  const [opacity, setOpacity] = useState("1");
  const [color, setColor] = useState("#ffffff");
  const [label, setLabel] = useState("Button");

  // Sync local state with the selected element
  useEffect(() => {
    if (selectedElement) {
      setWidth(selectedElement.width);
      setHeight(selectedElement.height);
      setOpacity(selectedElement.opacity);
      setColor(selectedElement.color);
      setLabel(selectedElement.label);
    }
  }, [selectedElement]);

  const handleWidthChange = (value: string) => {
    setWidth(value);
    onSizeChange({ width: value, height, opacity, color, label });
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    onSizeChange({ width, height: value, opacity, color, label });
  };

  const handleOpacityChange = (value: string) => {
    setOpacity(value);
    onSizeChange({ width, height, opacity: value, color, label });
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    onSizeChange({ width, height, opacity, color: value, label });
  };

  const handleLabelChange = (value: string) => {
    setLabel(value);
    onSizeChange({ width, height, opacity, color, label: value });
  };

  return (
    <div className="h-1/2 bg-dark text-white p-8 space-y-2 overflow-y-auto">
      <h1 className="text-center text-2xl">Design</h1>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <DropDown
          label="Width"
          options={dropdownselection.width}
          onChange={handleWidthChange}
          defaultValue={width}
        />
        <DropDown
          label="Height"
          options={dropdownselection.height}
          onChange={handleHeightChange}
          defaultValue={height}
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