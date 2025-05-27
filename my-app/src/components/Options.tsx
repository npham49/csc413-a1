"use client";
import React from "react";
interface OptionsProps {
    option: string;
    onClick: () => void;
}
export default function Options({ option, onClick }: OptionsProps) {
    return (
        <div>
            <button
                className="bg-dark text-white px-4 py-2 rounded-[40px] w-full hover:bg-blue-600"
                onClick={onClick}
            >
                {option}
            </button>
        </div>
    )
}