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

const toolbarOptions = [
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [
    { color: [...mycolors, "color-picker"] },
    { background: [...mycolors, "#FFF", "color-picker"] },
  ],
  [{ list: "ordered" }, { list: "bullet" }],
  // ["link", "image", "video"],
  ["clean"],
];

export default function Editor({ content, dispatchContent }) {
  return (
    <ReactQuill
      modules={{ toolbar: toolbarOptions }}
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
