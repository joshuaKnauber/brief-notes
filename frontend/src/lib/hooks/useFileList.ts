import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { format, isAfter, isToday, subDays } from "date-fns";
import {
  GetListOfFiles,
  CreateNote,
  SaveContent,
} from "../../../wailsjs/go/main/App";
import { useNavigate } from "@tanstack/react-router";

type MarkdownFile = {
  name: string;
  path: string;
  content: string;
  lastSaved: number;
};

const filesListAtom = atom<MarkdownFile[]>([]);

export function useFileList() {
  const [filesList, setFilesList] = useAtom(filesListAtom);
  const navigate = useNavigate();

  function refreshFiles() {
    GetListOfFiles().then((files) =>
      setFilesList(
        files
          .map((f) => ({ ...f, lastSaved: f.lastSaved * 1000 }))
          .sort((a, b) => b.lastSaved - a.lastSaved)
      )
    );
  }

  function createFile() {
    const filename = format(new Date(), "dd MMM yyyy HH'h' mm'm' ss's'");
    CreateNote(filename).then(() => {
      refreshFiles();
      navigate({ to: "/notes/$note", params: { note: filename } });
    });
  }

  function saveContent(path: string, content: string) {
    // TODO not necessary to refresh all files on every save
    SaveContent(path, content).then(() => refreshFiles());
  }

  useEffect(() => {
    if (filesList.length === 0) {
      refreshFiles();
    }
  }, [filesList]);

  const isSameFile = (f1: MarkdownFile, f2: MarkdownFile) =>
    f1.path === f2.path;

  const pinned: MarkdownFile[] = [];
  const today = filesList.filter(
    (f) => isToday(f.lastSaved) && !pinned.some((p) => isSameFile(p, f))
  );
  const last7Days = filesList.filter(
    (f) =>
      isAfter(f.lastSaved, subDays(new Date(), 7)) &&
      ![...pinned, ...today].some((p) => isSameFile(p, f))
  );
  const last30Days = filesList.filter(
    (f) =>
      isAfter(f.lastSaved, subDays(new Date(), 30)) &&
      ![...pinned, ...today, ...last7Days].some((p) => isSameFile(p, f))
  );
  const remaining = filesList.filter(
    (f) =>
      ![...pinned, ...today, ...last7Days, ...last30Days].some((p) =>
        isSameFile(p, f)
      )
  );

  const fileTimeCategories = {
    pinned,
    today,
    last7Days,
    last30Days,
    remaining,
  };

  return { filesList, fileTimeCategories, createFile, saveContent };
}
