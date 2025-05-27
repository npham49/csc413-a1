"use client";
import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import "./IfBlock.css"; // Import custom CSS for styling

interface IfBlockProps {
  elements: { id: number; label: string }[]; // Array of dropped elements
}

export default function IfBlock({ elements }: IfBlockProps) {
  return (
    <div className="relative w-full bg-[#f0f0f0] rounded p-2 border border-black text-xxl">
      <div className="flex items-center justify-center space-x-4">
        <span className="font-bold">if</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Element</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {elements.map((element) => (
              <DropdownMenuItem key={element.id} className="dropdown-menu-item">
                {element.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Condition</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="dropdown-menu-item">is clicked</DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              is hovered
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              equals
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              greater than
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              less than
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              contains
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="font-bold">then</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Element</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {elements.map((element) => (
              <DropdownMenuItem key={element.id} className="dropdown-menu-item">
                {element.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Action</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="dropdown-menu-item">changed color</DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              is hidden
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              is displayed
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              changed color
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              less than
            </DropdownMenuItem>
            <DropdownMenuItem className="dropdown-menu-item" disabled>
              contains
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}