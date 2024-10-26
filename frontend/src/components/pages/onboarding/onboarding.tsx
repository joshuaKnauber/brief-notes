import { useEffect, useState } from "react";
import { useSettings } from "../../../lib/hooks/useSettings";

export function Onboarding() {
  const [value, setValue] = useState("");
  const { updateRootDir } = useSettings();

  return (
    <div className="flex flex-col gap-4 p-4">
      <span>Onboarding</span>
      <div className="flex flex-row gap-2">
        <input
          className="bg-neutral-200"
          placeholder="filepath"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => updateRootDir(value)}>Save</button>
      </div>
    </div>
  );
}
