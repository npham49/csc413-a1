// Type definitions for TypeScript
export interface T9State {
  suggestions: string[];
  selectedIndex: number;
  isOpen: boolean;
  hasSelection: boolean;
}

export interface T9KeyDownResult {
  shouldUpdateInput: boolean;
  newInput?: string;
  shouldCloseDropdown?: boolean;
}
