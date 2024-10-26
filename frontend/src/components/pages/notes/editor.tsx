import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./editor.css";
import { useEffect, useState } from "react";
import { useFileList } from "../../../lib/hooks/useFileList";
import { useParams } from "@tanstack/react-router";

export function Editor() {
  const { note } = useParams({ strict: false });
  const { saveContent, filesList } = useFileList();
  const file = filesList.find((f) => f.name === note);

  const [markdown, setMarkdown] = useState<string>(file?.content ?? "");

  if (!file) return <span>FILE NOT FOUND</span>;

  return (
    <MDXEditor
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
      autoFocus
      contentEditableClassName="editor"
      onChange={(markdown) => {
        setMarkdown(markdown);
        saveContent(file.path, markdown);
      }}
    />
  );
}
