"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

export default forwardRef(function RichTextEditor(
  { projectData, onChange, ...props },
  ref
) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (projectData) {
      try {
        const rawContentState = projectData.project.description
          ? JSON.parse(projectData.project.description)
          : null;
        if (rawContentState) {
          const contentState = convertFromRaw(rawContentState);
          setEditorState(EditorState.createWithContent(contentState));
        } else {
          setEditorState(EditorState.createEmpty());
        }
      } catch (error) {
        console.error("JSON parsing error:", error);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromText(projectData.project.description || "")
          )
        );
      }
    }
  }, [projectData]);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const markdown = draftToMarkdown(convertToRaw(contentState));
    onChange(markdown); // Bu, formun `description` değerini güncelliyor
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      editorClassName={cn(
        "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        props.editorClassName
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r);
        } else if (ref) {
          ref.current = r;
        }
      }}
      {...props}
    />
  );
});
