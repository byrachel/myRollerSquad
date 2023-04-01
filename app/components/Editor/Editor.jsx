import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import Heart from "app/svg/heart.svg";
import { mycolors, formats } from "./utils";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

// const { Quill } = dynamic(async () => await import("react-quill"), {
//   ssr: false,
// });

export default function Editor({ content, dispatchContent }) {
  // const CustomHeart = () => <span>♥</span>;

  // const HeartButton = () => (
  //   <button className="ql-heartIcon" value="heartIcon">
  //     <Heart className="ql-heartButton" width={18} height={18} />
  //   </button>
  // );

  // useEffect(() => {
  //   // if (Quill) {
  //   //   console.log("QUILL", Quill);
  //   //   Quill.register("formats/heartIcon", HeartButton);
  //   // }
  //   if (typeof window !== "undefined" && Quill) {
  //     console.log("window.Quill", Quill);
  //     const CustomButton = Quill.import("ui/formats/button");
  //     CustomButton.className = "ql-heartIcon";
  //     CustomButton.tagName = "BUTTON";
  //     CustomButton.innerHTML = "heartIcon";
  //     Quill.register(CustomButton, true);
  //   }
  // }, [Quill]);

  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["heartIcon"],
          ["bold", "italic", "underline", "strike"],
          [
            { color: [...mycolors, "color-picker"] },
            { background: [...mycolors, "#FFF", "color-picker"] },
          ],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["clean"],
        ],
        handlers: {
          heartIcon: () => {
            const quill = quillRef?.current?.getEditor();
            const range = quill?.getSelection();
            const position = range ? range.index : 0;
            quill.editor.insertText(position, " ♥ ");
            quill.setSelection(position + 3);
          },
        },
      },
    }),
    []
  );

  const editor = useMemo(
    () => (
      <ReactQuill
        forwardedRef={quillRef}
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
        // placeholder="Quoi de beau aujourd'hui ?"
      />
    ),
    [content]
  );

  return (
    <div className="editor">
      <Heart className="heartIcon" width={20} height={20} />
      {editor}
    </div>
  );
}
