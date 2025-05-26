import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css"; // Theme file

export default function HTMLBlock() {
  const text = `<button class="text-dark font-bold rounded" style="width: 100px; height: 50px; opacity: 1; background-color: rgb(192, 53, 53);"> go</button>`;
  const [code, setCode] = useState(text);

  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.markup, "markup");

  return (
    <div className="w-full border border-gray-300 rounded overflow-hidden font-mono text-sm">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlight}
        padding={10}
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          minHeight: "200px",
        }}
      />
    </div>
  );
}
