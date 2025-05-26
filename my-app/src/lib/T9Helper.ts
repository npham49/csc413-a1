// T9 Text Prediction Helper for React Applications

// T9 keypad mapping (number to letters)
export const T9_KEYPAD: { [key: string]: string } = {
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz",
};

// Reverse mapping (letter to number)
const LETTER_TO_NUMBER: { [key: string]: string } = {};
Object.entries(T9_KEYPAD).forEach(([number, letters]) => {
  for (const letter of letters) {
    LETTER_TO_NUMBER[letter] = number;
  }
});

// Trie Node for efficient word storage and lookup
class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
  word?: string;
  frequency: number = 0;
}

// Trie data structure for storing dictionary words
class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, frequency: number = 1): void {
    word = word.toLowerCase();
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
    node.word = word;
    node.frequency = frequency;
  }

  findWordsForT9Sequence(sequence: string, maxResults: number = 10): string[] {
    const results: Array<{ word: string; frequency: number }> = [];

    // basically, i start from the first digit, get possible letters, if there is a match on a node,
    // then scan the next digit, if there is a match on a node, then scan the next digit, etc.
    // if there is no match, then backtrack and try a different letter.
    // if there is a match, then add the word to the results array.
    const dfs = (node: TrieNode, index: number) => {
      if (index === sequence.length) {
        if (node.isEndOfWord) {
          results.push({ word: node.word!, frequency: node.frequency });
        }
        return;
      }

      const digit = sequence[index];
      const letters = T9_KEYPAD[digit];

      if (!letters) return;

      for (const letter of letters) {
        if (node.children[letter]) {
          dfs(node.children[letter], index + 1);
        }
      }
    };

    dfs(this.root, 0);

    // Sort by frequency (descending) then alphabetically
    results.sort((a, b) => {
      if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;
      }
      return a.word.localeCompare(b.word);
    });

    return results.slice(0, maxResults).map((result) => result.word);
  }
}

// T9 Helper class optimized for React applications
export class T9Helper {
  private trie: Trie;
  private currentSuggestions: string[] = [];

  constructor(dictionary?: string[], frequencies?: number[]) {
    this.trie = new Trie();
    if (dictionary && frequencies) {
      this.loadDictionary(dictionary, frequencies);
    }
  }

  // Load dictionary into the trie
  loadDictionary(words: string[], frequencies: number[]): void {
    words.forEach((word, index) => {
      const frequency = frequencies[index] || 1;
      this.trie.insert(word, frequency);
    });
  }

  // Add a single word to the dictionary
  addWord(word: string, frequency: number = 1): void {
    this.trie.insert(word, frequency);
  }

  // Convert a word to its T9 sequence
  // Used for the badge in the suggestion list
  wordToT9(word: string): string {
    return word
      .toLowerCase()
      .split("")
      .map((char) => LETTER_TO_NUMBER[char] || "")
      .join("");
  }

  // Get suggestions for current input (main method for React component)
  getSuggestions(input: string, maxResults: number = 8): string[] {
    if (!input || !/^[2-9]+$/.test(input)) {
      this.currentSuggestions = [];
      return [];
    }

    this.currentSuggestions = this.trie.findWordsForT9Sequence(
      input,
      maxResults
    );

    return this.currentSuggestions;
  }

  // Get current state for React component
  getState() {
    return {
      suggestions: this.currentSuggestions,
    };
  }
}
