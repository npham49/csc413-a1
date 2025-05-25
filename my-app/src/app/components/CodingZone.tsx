"use client";
import DesignBlock from "./DesignBlock";
import CodeBlock from "./CodeBlock";

interface CodingZoneProps {
  onSizeChange: (size: { width: string; height: string }) => void;
  selectedElement: { width: string; height: string } | undefined; // Add selectedElement prop
}

export default function CodingZone({ onSizeChange, selectedElement }: CodingZoneProps) {
  return (
    <div className="flex flex-col w-1/2 h-screen">
      <DesignBlock
        onSizeChange={onSizeChange}
        selectedElement={selectedElement} // Pass selectedElement to DesignBlock
      />
      <CodeBlock />
    </div>
  );
}