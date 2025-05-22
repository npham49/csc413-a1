import {
  ENHANCED_DICTIONARY,
  ENHANCED_FREQUENCIES,
} from "@/lib/dictionary/simple";
import { T9Helper } from "@/lib/T9Helper";
import { useCallback, useState } from "react";

// Example React hook for using T9Helper
export function useT9Input() {
  const [t9Helper] = useState(() => {
    const helper = new T9Helper();
    helper.loadDictionary(ENHANCED_DICTIONARY, ENHANCED_FREQUENCIES);
    return helper;
  });

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const updateSuggestions = useCallback(
    (value: string) => {
      const newSuggestions = t9Helper.getSuggestions(value);
      setSuggestions(newSuggestions);
      setIsOpen(newSuggestions.length > 0);
    },
    [t9Helper]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      // Only allow T9 digits (2-9)
      const filteredValue = value.replace(/[^2-9]/g, "");
      setInput(filteredValue);
      updateSuggestions(filteredValue);
      setSelectedIndex(-1);
    },
    [updateSuggestions]
  );

  const selectSuggestion = useCallback(
    (suggestion: string) => {
      const t9Sequence = t9Helper.wordToT9(suggestion);
      setInput(t9Sequence);
      setIsOpen(false);
      setSelectedIndex(-1);
    },
    [t9Helper]
  );

  const clearInput = useCallback(() => {
    setInput("");
    setSuggestions([]);
    setSelectedIndex(-1);
    setIsOpen(false);
  }, []);

  return {
    input,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    isOpen,
    handleInputChange,
    selectSuggestion,
    clearInput,
    t9Helper,
  };
}
