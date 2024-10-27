import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { format, isAfter, subDays, subHours } from "date-fns";
import {
  GetListOfFiles,
  CreateNote,
  SaveContent,
  RenameFile,
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

  async function refreshFiles() {
    const files = await GetListOfFiles();
    setFilesList(
      files
        .map((f) => ({ ...f, lastSaved: f.lastSaved * 1000 }))
        .sort((a, b) => b.lastSaved - a.lastSaved)
    );
  }

  function createFile() {
    const filename = format(new Date(), "MMM dd yyyy',' HH'-'mm'-'ss");
    CreateNote(filename).then(async () => {
      await refreshFiles();
      navigate({ to: "/notes/$note", params: { note: filename } });
    });
  }

  function saveContent(path: string, content: string) {
    // TODO not necessary to refresh all files on every save
    SaveContent(path, content).then(() => refreshFiles());
  }

  function renameFile(path: string, newName: string) {
    RenameFile(path, newName).then((success) => {
      if (success) {
        refreshFiles();
        navigate({ to: "/notes/$note", params: { note: newName } });
      }
    });
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
    (f) =>
      isAfter(f.lastSaved, subHours(new Date(), 24)) &&
      !pinned.some((p) => isSameFile(p, f))
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

  return { filesList, fileTimeCategories, createFile, saveContent, renameFile };
}
