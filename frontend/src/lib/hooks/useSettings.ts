import { useEffect, useState } from "react";
import { z } from "zod";
import * as ConfigStore from "../../../wailsjs/go/wailsconfigstore/ConfigStore";

const settingsSchema = z.object({
  rootDir: z.string().nullable(),
});
type Settings = z.infer<typeof settingsSchema>;
const defaultSettings: Settings = {
  rootDir: null,
};

export function useSettings() {
  const [settings, setSettings] = useState<null | Settings>(null);

  function updateRootDir(path: string | null) {
    if (!settings) return;
    ConfigStore.Set(
      "settings.json",
      JSON.stringify({
        ...settings,
        rootDir: path,
      } satisfies Settings)
    ).then(refreshSettings);
  }

  function refreshSettings() {
    ConfigStore.Get("settings.json", "{}").then((conf) => {
      const { success, data } = settingsSchema.safeParse(
        conf ? JSON.parse(conf) : ""
      );
      setSettings(success ? data : defaultSettings);
    });
  }

  useEffect(() => {
    refreshSettings();
  }, []);

  return { settings, updateRootDir };
}
