"use client";
import DesignBlock from "./DesignBlock";
import CodeBlock from "./CodeBlock";

interface CodingZoneProps {
  onSizeChange: (size: { width: string; height: string; opacity: string; color: string; label: string }) => void;
  selectedElement: { width: string; height: string; opacity: string; color: string; label: string } | undefined;
  elements: { id: number; label: string }[];
}

export default function CodingZone({ onSizeChange, selectedElement, elements }: CodingZoneProps) {
  return (
    <div className="flex flex-col w-1/2 h-screen">
      <DesignBlock
        onSizeChange={onSizeChange} // Pass onSizeChange to DesignBlock
        selectedElement={selectedElement} // Pass selectedElement to DesignBlock
      />
      <CodeBlock elements={elements} /> {/* Pass elements to CodeBlock */}
    </div>
  );
}