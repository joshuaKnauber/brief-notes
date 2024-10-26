import { createFileRoute, Link } from "@tanstack/react-router";
import { FilePlus2 } from "lucide-react";
import { useFileList } from "../../../lib/hooks/useFileList";

export const Route = createFileRoute("/_notes/notes/")({
  component: EmptyNote,
});

export function EmptyNote() {
  const { createFile, fileTimeCategories } = useFileList();
  return (
    <div className="flex items-center justify-center flex-col h-full flex-grow gap-8 select-none">
      <button onClick={createFile} className="flex flex-col items-center gap-1">
        <FilePlus2 className="size-8" />
        <span className="font-semibold">New File</span>
      </button>
      <div className="flex flex-col items-center gap-1.5">
        {[...fileTimeCategories.pinned, ...fileTimeCategories.today]
          .slice(0, 5)
          .map((f, i) => (
            <Link
              key={i}
              to="/notes/$note"
              params={{ note: f.name }}
              className="font-medium text-sm text-neutral-400 underline"
            >
              {f.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
