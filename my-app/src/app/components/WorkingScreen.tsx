// export default function WorkingScreen() {
//     return (
//         <div className="flex flex-col bg-accent justify-center w-full">
//             <div >
//                 <img src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/background.png?alt=media&token=d9ebe754-401a-4e5c-a515-78496083109e" alt="pic" />
//             </div>
//         </div>
//     )
// }
"use client";

import { useState } from "react";
import Button from "./Button";

type DroppedButton = {
  x: number;
  y: number;
  id: number;
};

export default function WorkingScreen() {
  const [droppedButtons, setDroppedButtons] = useState<DroppedButton[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const dropTarget = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - dropTarget.left;
    const y = event.clientY - dropTarget.top;
    const data = event.dataTransfer.getData("text/plain");

    if (data === "Button") {
      // New button from DraggingBar
      setDroppedButtons((prev) => [
        ...prev,
        { x, y, id: Date.now() + Math.random() },
      ]);
    } else if (data.startsWith("Move:")) {
      // Repositioning an existing button
      const id = parseFloat(data.split(":")[1]);
      setDroppedButtons((prev) =>
        prev.map((btn) => (btn.id === id ? { ...btn, x, y } : btn))
      );
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleButtonDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    setDraggedId(id);
    event.dataTransfer.setData("text/plain", `Move:${id}`);
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
          alt="pic"
        />
      </div>

      {droppedButtons.map((button) => (
        <div
          key={button.id}
          className="absolute cursor-move"
          draggable
          onDragStart={(e) => handleButtonDragStart(e, button.id)}
          style={{ top: button.y, left: button.x }}
        >
          <Button label="Button" />
        </div>
      ))}
    </div>
  );
}
