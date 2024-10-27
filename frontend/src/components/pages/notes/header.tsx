import { useAtom, useAtomValue } from "jotai";
import { sidebarOpenAtom } from "./atoms/sidebar";
import { IconButton } from "../../buttons/iconButton";
import { PanelLeft, PinIcon, PlusIcon } from "lucide-react";
import { Icon } from "../../icons/icon";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useFileList } from "../../../lib/hooks/useFileList";
import { useParams } from "@tanstack/react-router";

export function HeaderSidebar() {
  const [sidebarOpen, setOpenSidebar] = useAtom(sidebarOpenAtom);
  const { createFile } = useFileList();
  return (
    <div
      className={twMerge(
        "flex shrink-0 flex-row justify-between h-12 px-2 items-center transition-all duration-100",
        sidebarOpen
          ? "border-r border-black/20 bg-neutral-50 w-[230px]"
          : "w-12"
      )}
    >
      <IconButton onClick={() => setOpenSidebar(!sidebarOpen)}>
        <Icon icon={<PanelLeft />} />
      </IconButton>
      {sidebarOpen && (
        <IconButton onClick={() => createFile()}>
          <Icon icon={<PlusIcon />} />
        </IconButton>
      )}
    </div>
  );
}

export function HeaderNotes() {
  const sidebarOpen = useAtomValue(sidebarOpenAtom);
  const { note } = useParams({ strict: false });
  const [name, setName] = useState("");
  const { filesList, renameFile } = useFileList();

  const onNameUpdate = () => {
    const file = filesList.find((f) => f.name === note);
    if (!file || !name.trim()) return;
    console.log(file, name);
    renameFile(file.path, name);
  };

  useEffect(() => {
    setName(note ?? "");
  }, [note]);

  return (
    <div className="flex shrink-0 flex-row h-12 px-2 justify-between items-center gap-4">
      {note && (
        <>
          <div
            className={twMerge(
              "flex flex-row items-center gap-2 flex-grow transition-all ml-0",
              sidebarOpen && "ml-2"
            )}
          >
            <input
              className="font-semibold text-sm focus:outline-none flex-grow"
              placeholder="File Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={onNameUpdate}
            />
          </div>
          <div className="flex shrink-0 flex-row gap-2">
            {/* <IconButton>
              <Icon icon={<PinIcon />} />
            </IconButton> */}
          </div>
        </>
      )}
    </div>
  );
}
