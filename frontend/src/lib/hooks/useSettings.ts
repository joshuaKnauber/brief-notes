import { useEffect, useState } from "react";
import { z } from "zod";
import { GetPath, UpdatePath } from "../../../wailsjs/go/main/App";
import { atom, useAtom } from "jotai";

const loadedAtom = atom(false);
const rootDirAtom = atom("");

export function useSettings() {
  const [loaded, setLoaded] = useAtom(loadedAtom);
  const [rootDir, setRootDir] = useAtom(rootDirAtom);

  function updateRootDir(path: string) {
    UpdatePath(path).then(refreshSettings);
  }

  async function refreshSettings() {
    const rootDir = await GetPath();
    setRootDir(rootDir);
    setLoaded(true);
  }

  useEffect(() => {
    refreshSettings();
  }, []);

  return { loaded, rootDir, updateRootDir };
}
