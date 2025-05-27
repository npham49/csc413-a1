"use client";
import IfBlock from "./IfBlock";
import Options from "./Options";
import { useState } from "react";
import {Button} from '@/components/ui/button';
import HTMLBlock from "./HTMLBlock";

interface CodeBlockProps {
  elements: { id: number; label: string }[]; // Define the structure of the elements array
  selectedElement: {
        width: string;
        height: string;
        opacity: string;
        color: string;
        label: string;
      }
    | undefined;
}
const logicOptions = ["if", "for", "filter", "map", "reduce"];

export default function CodeBlock({ elements, selectedElement }: CodeBlockProps) {
    const [selectedOption, setSelectedOption] = useState(false)
    const [showHtml, setShowHtml] = useState(false);
    const handleOptionClick = () => {
      setSelectedOption(!selectedOption);
      console.log("Selected option:", selectedElement);
      console.log(" element:", elements);
        if (selectedElement) {
            const element = Array.from(document.querySelectorAll("button")).find(
                (btn) => btn.textContent === selectedElement.label
            );
            console.log("Element found:", element);
            if (element) {
                element.addEventListener("click", () => {
                  element.style.backgroundColor = "#1b263b"; // Change the background color
                  element.style.color = "white"; // Optional: Change text color for better contrast
                });
                // element.classList.toggle("text-white");
            }
        }
    }
    const handleHTMLShow = () => {
      setShowHtml(!showHtml);
    };
  return (
    <div className="flex flex-col items-center space-y-4 bg-primary pt-6 h-1/2 overflow-y-auto">
      <div className="flex flex-row items-center space-x-4 overflow-x-auto">
        <p className="text-lg text-white">Logic</p>
        {logicOptions.map((option, i) => (
          <Options key={i} option={option} onClick={handleOptionClick} />
        ))}
      </div>
      {selectedOption && (
        <div className="flex flex-col items-center space-y-4">
          <IfBlock elements={elements} />
          <Button className="bg-dark text-md w-[150px] h-[100px]" onClick={handleHTMLShow}>
            Show HTML
          </Button>
        </div>
      )}
      {showHtml && <HTMLBlock />}
    </div>
  );
}
