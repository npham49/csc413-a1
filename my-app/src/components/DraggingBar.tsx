"use client"
import Button from "./Button"
export default function DraggingBar() {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text/plain", "Button");
    };
    return (
      <div className="flex flex-col items-center h-screen bg-dark w-[440px] space-y-4">
        <h1 className="text-3xl text-white font-primary pt-10">Components</h1>
        <div className="overflow-y-auto w-full space-y-4">
            <div
            className="bg-primary w-full h-20 flex items-center justify-center"
            draggable
            onDragStart={handleDragStart}
            >
            <Button label="Button" />
            </div>
            <div className="bg-dark w-full h-20 flex items-center justify-center">
            <Button label="Text Input" color="gray" />
            </div>
            <div className="bg-primary w-full h-20 flex items-center justify-center">
            <Button label="Color Pick" color="gray" />
            </div>
            <div className="bg-dark w-full h-20 flex items-center justify-center">
            <Button label="Dropdown" color="gray" />
            </div>
            <div className="bg-primary w-full h-20 flex items-center justify-center">
            <Button label="Checkbox" color="gray" />
            </div>
            <div className="bg-dark w-full h-20 flex items-center justify-center">
            <Button label="Radio Button" color="gray" />
            </div>
            <div className="bg-primary w-full h-20 flex items-center justify-center">
                <Button label="Slider" color="gray" />
            </div>
            <div className="bg-dark w-full h-20 flex items-center justify-center">
                <Button label="Switch" color="gray" />
            </div>
            <div className="bg-primary w-full h-20 flex items-center justify-center">
                <Button label="Date Picker" color="gray" />
            </div>
            <div className="bg-dark w-full h-20 flex items-center justify-center">
                <Button label="Time Picker" color="gray" />
            </div>
            <div className="bg-primary w-full h-20 flex items-center justify-center">
                <Button label="File Upload" color="gray" />
            </div>
        </div>
        
      </div>
    );
}