"use client";
import React from "react";

interface IfBlockProps {
  elements: { id: number; label: string }[]; // Array of dropped elements
}

export default function IfBlock({ elements }: IfBlockProps) {
  return (
    <div className="relative w-full bg-[#f0f0f0] rounded p-2 border border-black">
      <div className="flex items-center justify-center space-x-4">
        <span className="font-bold">if</span>
        <select className="w-16 h-6 bg-gray-300 rounded-full text-center">
          {elements.map((element) => (
            <option key={element.id} value={element.id}>
              {element.label}
            </option>
          ))}
        </select>
        <select className="w-20 h-6 bg-gray-300 rounded text-center">
          <option value=""></option>
          <option value="click">is clicked</option>
          <option value="hover" disabled>
            is hovered
          </option>
          <option value="equals" disabled>
            equals
          </option>
          <option value="greater than" disabled>
            greater than
          </option>
          <option value="less than" disabled>
            less than
          </option>
          <option value="contains" disabled>
            contains
          </option>
        </select>
        {/* <div className="w-20 h-6 bg-gray-300 rounded" /> */}
        <span className="font-bold">then</span>
        <select className="w-16 h-6 bg-gray-300 rounded-full text-center">
          {elements.map((element) => (
            <option key={element.id} value={element.id}>
              {element.label}
            </option>
          ))}
        </select>
        <select className="w-20 h-6 bg-gray-300 rounded text-center">
          <option value=""></option>
          <option value="width">changed color</option>
          <option value="hidden" disabled>
            is hidden
          </option>
          <option value="displayed" disabled>
            is displayed
          </option>
          <option value="color" disabled>
            changed color
          </option>
          <option value="less than" disabled>
            less than
          </option>
          <option value="contains" disabled>
            contains
          </option>
        </select>
      </div>

      {/* <div className="mt-2 h-20 bg-white border border-dashed border-gray-400 rounded" /> */}
    </div>
  );
}