import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
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

export default function Editor({ content, dispatchContent, placeholder }) {
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
        // handlers: {
        //   heartIcon: () => {
        //     const quill = quillRef?.current?.getEditor();
        //     const range = quill?.getSelection();
        //     const position = range ? range.index : 0;
        //     quill.editor.insertText(position, " ♥ ");
        //     quill.setSelection(position + 3);
        //   },
        // },
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
        onChange={(value) =>
          dispatchContent({
            type: "SAVE_CONTENT",
            payload: value,
          })
        }
        preserveWhitespace={true}
        placeholder={placeholder}
      />
    ),
    // eslint-disable-next-line
    [content, modules]
  );

  return <div className="editor">{editor}</div>;
}
