import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/pages/notes/sidebar";
import { HeaderNotes, HeaderSidebar } from "../components/pages/notes/header";
import { useSettings } from "../lib/hooks/useSettings";

export const Route = createFileRoute("/_notes")({
  component: Notes,
});

export function Notes() {
  const { loaded, rootDir } = useSettings();

  if (!loaded) return null;

  if (!rootDir) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <div className="flex flex-row">
          <HeaderSidebar />
          <div className="flex-grow">
            <HeaderNotes />
          </div>
        </div>
        <div className="flex flex-row flex-grow">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
