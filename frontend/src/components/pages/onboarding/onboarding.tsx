import { useEffect, useState } from "react";
import { useSettings } from "../../../lib/hooks/useSettings";

export function Onboarding() {
  const [value, setValue] = useState("");
  const { updateRootDir } = useSettings();

  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-center h-[100vh]">
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <input
          className="bg-neutral-200 py-2 px-2 text-sm"
          placeholder="Notes directory path"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-black text-white py-2 disabled:opacity-75"
          disabled={!value}
          onClick={() => updateRootDir(value)}
        >
          Save
        </button>
      </div>
    </div>
  );
}
