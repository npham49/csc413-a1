// Complete React Component Example using shadcn/ui
import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useT9Input } from "../hooks/useT9Input";
import { Button } from "../components/ui/button";
import { DeleteIcon } from "lucide-react";
import { socket } from "../lib/socket";

interface T9KeyboardProps {
  output: string;
  setOutput: (output: string) => void;
}

export default function T9Keyboard({ output, setOutput }: T9KeyboardProps) {
  const {
    input,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    isOpen,
    handleInputChange,
    clearInput,
    t9Helper,
    appendInput,
    deleteLatestDigit,
    moveSelectionUp,
    moveSelectionDown,
    clearSelection,
  } = useT9Input();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isHolding, setIsHolding] = useState(false);
  const isHoldingRef = useRef(isHolding);
  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || suggestions.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSelectedIndex(-1);
      }
    },
    [isOpen, suggestions, setSelectedIndex, selectedIndex]
  );

  const handleSuggestionSelect = (suggestion: string) => {
    setOutput(output + " " + suggestion);
    clearInput();
    clearSelection();
  };

  // Mouse handlers for highlighting
  const handleMouseEnter = (index: number) => setSelectedIndex(index);
  const handleMouseLeave = () => setSelectedIndex(-1);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onInputEvent(event: string, value?: string) {
      console.log(event, value);
      if (event === "joystickUp") {
        moveSelectionUp();
      }
      if (event === "joystickDown") {
        moveSelectionDown();
      }
      if (event === "joystickLeft") {
        console.log(suggestions);
        console.log(selectedIndex);
        const suggestion = suggestions[selectedIndex];
        setOutput(output + " " + suggestion);
        clearInput();
        clearSelection();
      }
      if (event === "joystickRight") {
        clearSelection();
      }
      if (event === "buttonPress" && value) {
        if (isHoldingRef.current && value === "6") {
          console.log("backspace");
          deleteLatestDigit();
        }
        if (isHoldingRef.current && value === "10") {
          setIsHolding(false);
        }
        if (!isHoldingRef.current) {
          appendInput(value.toString());
        }
      }
      if (event === "buttonHold" && value && value === "10") {
        console.log("hold");
        setIsHolding(true);
        console.log(isHoldingRef.current);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("input", onInputEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("input", onInputEvent);
    };
  }, [
    appendInput,
    clearInput,
    clearSelection,
    deleteLatestDigit,
    moveSelectionDown,
    moveSelectionUp,
    output,
    selectedIndex,
    setOutput,
    suggestions,
  ]);

  const handleBackspace = () => {
    setOutput(output.split(" ").slice(0, -1).join(" "));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          {isConnected ? "Connected to server" : "Disconnected from server"}
        </p>
      </div>

      {/* Input Section */}
      <div className="relative">
        <div className="space-y-2">
          <label htmlFor="t9-input" className="text-sm font-medium">
            T9 Sequence:
          </label>
          <Input
            id="t9-input"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type numbers 2-9 (e.g., 4663 for 'good')"
            className="text-lg font-mono tracking-wider text-black"
            autoComplete="off"
          />
          <div className="text-xs text-gray-500">
            Output: <span className="font-mono">{output}</span>
          </div>
          {/* backspace button  */}
          <Button variant="outline" size="icon" onClick={handleBackspace}>
            <DeleteIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 mt-1 border shadow-lg z-50 max-h-64 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2">
                {suggestions.length} suggestion
                {suggestions.length !== 1 ? "s" : ""} found:
              </div>

              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className={`
                    flex items-center justify-between px-3 py-2 cursor-pointer rounded-md transition-colors
                    ${
                      index === selectedIndex
                        ? "bg-blue-100 border border-blue-200"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="font-medium">{suggestion}</span>
                  <Badge variant="outline" className="text-xs font-mono ml-2">
                    {t9Helper.wordToT9(suggestion)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Example */}
      {!input && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">
            Try these examples:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["4663", "43556", "2", "96753", "8426", "4663"].map(
              (example, index) => (
                <Badge
                  key={example + index}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => handleInputChange(example)}
                >
                  {example}
                </Badge>
              )
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
