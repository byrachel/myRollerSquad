import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  //   createReactFormattingToolbarFactory,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
  return (
    <Toolbar>
      {/*Default button to toggle bold.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      {/*Default button to toggle italic.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      {/*Default button to toggle underline.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      {/*Custom button to toggle blue text & background color.*/}
      <ToolbarButton
        mainTooltip={"Pink Text & Background"}
        onClick={() => {
          props.editor.toggleStyles({
            textColor: "pink",
            backgroundColor: "pink",
          });
        }}
        isSelected={
          props.editor.getActiveStyles().textColor === "pink" &&
          props.editor.getActiveStyles().backgroundColor === "pink"
        }
      >
        pink
      </ToolbarButton>
    </Toolbar>
  );
};

export default function TextEditor() {
  const initialContent: string | null = localStorage.getItem("editorContent");
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      localStorage.setItem(
        "editorContent",
        JSON.stringify(editor.topLevelBlocks)
      );
    },
    customElements: {
      // Makes the editor instance use the custom toolbar.
      formattingToolbar: CustomFormattingToolbar,
    },
    editable: true,
  });

  // Renders the editor instance.
  return (
    <div style={{ border: "solid 1px grey" }}>
      <BlockNoteView editor={editor} />
    </div>
  );
}
