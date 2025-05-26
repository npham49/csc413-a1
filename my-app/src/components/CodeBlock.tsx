"use client";
import IfBlock from "./IfBlock";
import Options from "./Options";
import { useState } from "react";

interface CodeBlockProps {
  elements: { id: number; label: string }[]; // Define the structure of the elements array
//   setElements: React.Dispatch<
//     React.SetStateAction<{ id: number; label: string; hover: boolean }[]>
//   >;
}
const logicOptions = ["if", "for", "filter", "map", "reduce"];

export default function CodeBlock({ elements }: CodeBlockProps) {
    const [selectedOption, setSelectedOption] = useState(false)
    const handleOptionClick = () => {
      setSelectedOption(!selectedOption);
      // Update hover state for elements when IfBlock is displayed
    //   setElements((prev) =>
    //     prev.map((element) => ({
    //       ...element,
    //       hover: !selectedOption, // Enable hover when IfBlock is displayed
    //     }))
    //   );
    }
  return (
    <div className="bg-primary p-2 h-1/2 overflow-y-auto">
      <div className="flex flex-row items-center space-x-4 overflow-x-auto">
        <p className="text-md text-white">Logic</p>
        { logicOptions.map((option, i) => (
                <Options key={i} option={option} onClick={handleOptionClick}/>
            ))
        }
      </div>

      {selectedOption && <IfBlock elements={elements} /> }
    </div>
  );
}
