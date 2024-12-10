import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./editor.css";
import { useEffect, useRef, useState } from "react";
import { useFileList } from "../../../lib/hooks/useFileList";
import { useParams } from "@tanstack/react-router";

export function Editor() {
  const { note } = useParams({ strict: false });
  const { saveContent, filesList } = useFileList();
  const file = filesList.find((f) => f.name === note);

  const markdownRef = useRef<MDXEditorMethods>(null);

  const [markdown, setMarkdown] = useState<string>(file?.content ?? "");
  const lastSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // initialize
  useEffect(() => {
    const editor = document.querySelector(".editor");
    editor?.setAttribute("spellcheck", "false");
  }, []);

  if (!file) return <span>FILE NOT FOUND</span>;

  return (
    <MDXEditor
      ref={markdownRef}
      placeholder="Start typing..."
      markdown={markdown}
      plugins={[
        headingsPlugin({
          allowedHeadingLevels: [1, 2, 3, 4, 5],
        }),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        linkPlugin({}),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName="editor"
      trim={false}
      autoFocus
      onChange={(markdown) => {
        setMarkdown(markdown);
        // save to file with debounce
        if (lastSaveTimer.current) {
          clearTimeout(lastSaveTimer.current);
        }
        lastSaveTimer.current = setTimeout(() => {
          saveContent(file.path, markdown);
        }, 100);
      }}
    />
  );
}
