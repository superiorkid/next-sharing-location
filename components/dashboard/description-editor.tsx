"use client";

import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function DescriptionEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    //@ts-ignore
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  );
}

export default DescriptionEditor;
