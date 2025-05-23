import {
  ENHANCED_DICTIONARY,
  ENHANCED_FREQUENCIES,
} from "@/lib/dictionary/simple";
import { T9Helper } from "@/lib/T9Helper";
import { useCallback, useState, useRef, useEffect } from "react";

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

  // Ref to always have latest suggestions in navigation functions
  const suggestionsRef = useRef(suggestions);
  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  const updateSuggestions = useCallback(
    (value: string) => {
      const newSuggestions = t9Helper.getSuggestions(value);
      setSuggestions(newSuggestions);
      setIsOpen(newSuggestions.length > 0);
      setSelectedIndex(-1);
    },
    [t9Helper]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      // Only allow T9 digits (2-9)
      const filteredValue = value.replace(/[^2-9]/g, "");
      setInput(filteredValue);
      updateSuggestions(filteredValue);
    },
    [updateSuggestions]
  );

  const clearInput = useCallback(() => {
    setInput("");
    setSuggestions([]);
    setIsOpen(false);
  }, []);

  const appendInput = useCallback(
    (digit: string) => {
      setInput((prev) => {
        const newValue = prev.concat(digit).replace(/[^2-9]/g, "");
        updateSuggestions(newValue);
        return newValue;
      });
    },
    [updateSuggestions]
  );

  const deleteLatestDigit = useCallback(() => {
    setInput((prev) => {
      const newValue = prev.slice(0, -1).replace(/[^2-9]/g, "");
      updateSuggestions(newValue);
      return newValue;
    });
  }, [updateSuggestions]);

  const getSuggestionLength = useCallback(() => {
    return suggestions.length;
  }, [suggestions]);

  // Joystick navigation logic
  const moveSelectionUp = useCallback(() => {
    setSelectedIndex((prev) => {
      const s = suggestionsRef.current;
      return s.length === 0 ? -1 : prev > 0 ? prev - 1 : s.length - 1;
    });
  }, []);

  const moveSelectionDown = useCallback(() => {
    setSelectedIndex((prev) => {
      const s = suggestionsRef.current;
      return s.length === 0 ? -1 : prev < s.length - 1 ? prev + 1 : 0;
    });
  }, []);

  const selectCurrentSuggestion = useCallback(
    (suggestion: string) => {
      setInput((prev) => prev + suggestion);
      clearInput();
      setSelectedIndex(-1);
    },
    [clearInput]
  );

  const clearSelection = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  return {
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
    getSuggestionLength,
    moveSelectionUp,
    moveSelectionDown,
    selectCurrentSuggestion,
    clearSelection,
  };
}
