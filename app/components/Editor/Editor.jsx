import dynamic from "next/dynamic";
// import quillEmoji from "react-quill-emoji";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// const CustomHeart = () => <span>♥</span>;

// function insertHeart() {
//   const cursorPosition = this.quill.getSelection().index;
//   this.quill.insertText(cursorPosition, "♥");
//   this.quill.setSelection(cursorPosition + 1);
// }

const mycolors = [
  "#28152b", //primary
  "#e4287d", // secondary
  "#13d1ba", //green
  "#3abff8", // blue
  "#feed63", // yellow
  "#8c8a8a", // grey
  "#f7f7f7", // light
];

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
        color: [...mycolors, "color-picker"],
      },
    ],
    [
      {
        background: [...mycolors, "#FFF", "color-picker"],
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

export default function Editor({ content, dispatchContent }) {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={content}
      onChange={value =>
        dispatchContent({
          type: "SAVE_CONTENT",
          payload: value,
        })
      }
      preserveWhitespace={true}
    />
  );
}
