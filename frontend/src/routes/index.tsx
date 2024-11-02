import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Onboarding } from "../components/pages/onboarding/onboarding";
import { useSettings } from "../lib/hooks/useSettings";

export const Route = createFileRoute("/")({
  component: Home,
});

export function Home() {
  const { loaded, rootDir } = useSettings();
  console.log(loaded, rootDir);

  if (!loaded) return null;

  if (rootDir) {
    return <Navigate to="/notes" />;
  }

  return <Onboarding />;
}
