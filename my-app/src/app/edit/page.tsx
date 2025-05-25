"use client";
import { useState } from "react";
import DraggingBar from "../components/DraggingBar";
import WorkingScreen from "../components/WorkingScreen";
import CodingZone from "../components/CodingZone";

export default function EditPage() {
  const [elements, setElements] = useState<
    { id: number; x: number; y: number; width: string; height: string, opacity: string, color: string }[]
  >([]);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

  const handleSizeChange = (size: { width: string; height: string, opacity: string, color: string }) => {
    if (selectedElementId !== null) {
      setElements((prev) =>
        prev.map((element) =>
          element.id === selectedElementId
            ? { ...element, width: size.width, height: size.height, opacity: size.opacity, color: size.color }
            : element
        )
      );
    }
  };

  const handleElementSelect = (id: number) => {
    setSelectedElementId(id);
  };

  const selectedElement = elements.find((element) => element.id === selectedElementId);

  return (
    <div className="flex flex-row h-screen bg-background">
      <DraggingBar />
      <WorkingScreen
        elements={elements}
        setElements={setElements}
        onElementSelect={handleElementSelect}
      />
      <CodingZone
        onSizeChange={handleSizeChange}
        selectedElement={selectedElement} // Pass the selected element
      />
    </div>
  );
}