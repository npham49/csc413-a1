"use client"
import Button from "./Button"
export default function DraggingBar() {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text/plain", "Button");
    };
    return (
        <div className="flex flex-col items-center h-screen bg-dark w-60 space-y-20">
            <h1 className="text-3xl text-white font-primary pt-10">
                Components
            </h1>
            <div className="bg-primary w-60 h-20 flex items-center justify-center"
                draggable
                onDragStart={handleDragStart}>
                <Button label="Button"/>
            </div>
        </div>
    )
}