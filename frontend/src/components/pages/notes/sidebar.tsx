import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";
import { sidebarOpenAtom } from "./atoms/sidebar";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useFileList } from "../../../lib/hooks/useFileList";
import { NoteItem } from "./noteItem";
import { PinIcon } from "lucide-react";

export function Sidebar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const navigate = useNavigate();
  const { note } = useParams({ strict: false });
  const { fileTimeCategories, filesList } = useFileList();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const withControl = e.metaKey || e.ctrlKey;
      if (e.key === "b" && withControl) {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Tab" && withControl) {
        e.preventDefault();
        if (filesList.length === 0) return;
        const current = filesList.findIndex((f) => f.name === note) ?? 0;
        const offset = e.shiftKey ? -1 : 1;
        navigate({
          to: "/notes/$note",
          params: {
            note: filesList.at((current + offset) % filesList.length)!.name,
          },
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filesList, note]);

  return (
    <div
      className={twMerge(
        "h-full shrink-0 overflow-x-hidden transition-[width] duration-100",
        open ? "w-[230px]" : "w-0"
      )}
    >
      <div className="scroll-hide w-[230px] h-[calc(100vh-3rem)] bg-neutral-50 border-r border-black/20 overflow-y-auto">
        <div className="h-auto w-full flex flex-col">
          {filesList.length === 0 && (
            <span className="mt-2 text-sm font-semibold px-4">
              No Files Found
            </span>
          )}
          {fileTimeCategories.pinned.length > 0 && (
            <>
              <div className="flex flex-row items-center text-neutral-500 gap-2 px-4 select-none mb-1 mt-2">
                <PinIcon className="size-3 fill-neutral-500" />
                <span className="text-sm font-semibold">Pinned</span>
              </div>
              {fileTimeCategories.pinned.map((l, i) => (
                <NoteItem
                  key={l.path}
                  name={l.name}
                  lastEdit={new Date(l.lastSaved)}
                />
              ))}
            </>
          )}
          {fileTimeCategories.today.length > 0 && (
            <>
              <div className="text-sm font-semibold text-neutral-500 px-4 mb-1 mt-6">
                Today
              </div>
              {fileTimeCategories.today.map((l, i) => (
                <NoteItem
                  key={i}
                  name={l.name}
                  lastEdit={new Date(l.lastSaved)}
                />
              ))}
            </>
          )}
          {fileTimeCategories.last7Days.length > 0 && (
            <>
              <div className="text-sm font-semibold text-neutral-500 px-4 mb-1 mt-6">
                Last 7 days
              </div>
              {fileTimeCategories.last7Days.map((l, i) => (
                <NoteItem
                  key={i}
                  name={l.name}
                  lastEdit={new Date(l.lastSaved)}
                />
              ))}
            </>
          )}
          {fileTimeCategories.last30Days.length > 0 && (
            <>
              <div className="text-sm font-semibold text-neutral-500 px-4 mb-1 mt-6">
                Last 30 days
              </div>
              {fileTimeCategories.last30Days.map((l, i) => (
                <NoteItem
                  key={i}
                  name={l.name}
                  lastEdit={new Date(l.lastSaved)}
                />
              ))}
            </>
          )}
          {fileTimeCategories.remaining.length > 0 && (
            <>
              <div className="text-sm font-semibold text-neutral-500 px-4 mb-1 mt-6">
                Before Last 30 days
              </div>
              {fileTimeCategories.remaining.map((l, i) => (
                <NoteItem
                  key={i}
                  name={l.name}
                  lastEdit={new Date(l.lastSaved)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
