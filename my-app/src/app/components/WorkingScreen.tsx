"use client";

import Button from "./Button";

type DroppedButton = {
  x: number;
  y: number;
  id: number;
  width: string;
  height: string;
};

interface WorkingScreenProps {
  elements: DroppedButton[];
  setElements: React.Dispatch<React.SetStateAction<DroppedButton[]>>;
  onElementSelect: (id: number) => void;
}

export default function WorkingScreen({
  elements,
  setElements,
  onElementSelect,
}: WorkingScreenProps) {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const dropTarget = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - dropTarget.left;
    const y = event.clientY - dropTarget.top;

    const data = event.dataTransfer.getData("text/plain");

    if (data.startsWith("Move:")) {
      // Reposition an existing element
      const id = parseInt(data.split(":")[1], 10);
      setElements((prev) =>
        prev.map((element) =>
          element.id === id ? { ...element, x, y } : element
        )
      );
    } else {
      // Add a new element
      setElements((prev) => [
        ...prev,
        { id: Date.now(), x, y, width: "100px", height: "50px" },
      ]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    onElementSelect(id); // Select the element
    event.dataTransfer.setData("text/plain", `Move:${id}`); // Set drag data
  };

  return (
    <div
      className="relative flex flex-col h-screen bg-accent w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
        <div>
        <img
            src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/background.png?alt=media&token=d9ebe754-401a-4e5c-a515-78496083109e"
            alt="Background"
            />
        </div>
      {elements.map((button) => (
        <div
          key={button.id}
          className="absolute cursor-move"
          draggable
          onClick={() => onElementSelect(button.id)} // Update selected element
          onDragStart={(e) => handleDragStart(e, button.id)} // Handle drag start
          style={{
            top: button.y,
            left: button.x,
            width: button.width,
            height: button.height,
          }}
        >
          <Button label="Button" width={button.width} height={button.height} />
        </div>
      ))}
    </div>
  );
}