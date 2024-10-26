import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Onboarding } from "../components/pages/onboarding/onboarding";
import { useSettings } from "../lib/hooks/useSettings";

export const Route = createFileRoute("/")({
  component: Home,
});

export function Home() {
  const { settings } = useSettings();

  if (!settings) return null;

  if (settings.rootDir) {
    return <Navigate to="/notes" />;
  }

  return <Onboarding />;
}
