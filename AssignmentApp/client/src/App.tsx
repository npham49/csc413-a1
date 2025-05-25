// Complete React Component Example using shadcn/ui
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { T9_KEYPAD } from "./lib/T9Helper";
import "./App.css";
import T9Keyboard from "./components/t9-keyboard";
export default function App() {
  const [output, setOutput] = useState("");
  const outputRef = useRef(output);
  useEffect(() => {
    outputRef.current = output;
  }, [output]);

  const getKeypadDisplay = () => {
    return Object.entries(T9_KEYPAD).map(([number, letters]) => (
      <div key={number} className="text-center p-2 bg-gray-50 rounded border">
        <div className="font-bold text-lg">{number}</div>
        <div className="text-xs text-gray-600 uppercase">{letters}</div>
      </div>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {/* T9 Keypad Reference */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-center">T9 Keypad Reference</h3>
        <div className="grid grid-cols-4 gap-2">{getKeypadDisplay()}</div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Type numbers 2-9 to spell words</li>
          <li>• Each number represents letters (2=ABC, 3=DEF, etc.)</li>
          <li>• Click on a suggestion to select it</li>
        </ul>
      </Card>

      <T9Keyboard output={output} setOutput={setOutput} />
    </div>
  );
}
