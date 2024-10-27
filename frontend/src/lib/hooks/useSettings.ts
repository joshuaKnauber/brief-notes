import { useEffect, useState } from "react";
import { z } from "zod";
import { GetSettings, WriteSettings } from "../../../wailsjs/go/main/App";

const settingsSchema = z.object({
  RootDir: z.string(),
});
type Settings = z.infer<typeof settingsSchema>;
const defaultSettings: Settings = {
  RootDir: "",
};

export function useSettings() {
  const [settings, setSettings] = useState<null | Settings>(null);

  function updateRootDir(path: string) {
    if (!settings) return;
    const newSettings = { ...settings, rootDir: path };
    WriteSettings(newSettings).then(refreshSettings);
  }

  function refreshSettings() {
    GetSettings().then((s) => {
      const { data, success, error } = settingsSchema.safeParse(s);
      setSettings(success ? data : defaultSettings);
      console.log(error);
    });
  }

  useEffect(() => {
    refreshSettings();
  }, []);

  return { settings, updateRootDir };
}
