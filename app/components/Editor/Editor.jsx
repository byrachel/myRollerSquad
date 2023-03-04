import { useState } from "react";
import dynamic from "next/dynamic";
// import quillEmoji from "react-quill-emoji";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

// const CustomHeart = () => <span>♥</span>;

// function insertHeart() {
//   const cursorPosition = this.quill.getSelection().index;
//   this.quill.insertText(cursorPosition, "♥");
//   this.quill.setSelection(cursorPosition + 1);
// }

const modules = {
  toolbar: [
    // [
    //   { header: "1" },
    //   { header: "2" },
    //   // { font: [] }
    // ],
    [{ size: ["small", false, "large"] }],
    [
      {
        color: ["#F00", "#0F0", "#00F", "#000", "#FFF", "color-picker"],
      },
    ],
    [
      {
        background: ["#F00", "#0F0", "#00F", "#000", "#FFF", "color-picker"],
      },
    ],
    [("bold", "italic", "underline", "strike", "blockquote")],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" },
    ],
    // ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  // "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  // "link",
  // "image",
  // "video",
  "color",
  "background",
];

export default function Editor() {
  const [value, setValue] = useState("");
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
      preserveWhitespace={true}
    />
  );
}
