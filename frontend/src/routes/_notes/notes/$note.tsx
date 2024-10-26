import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "../../../components/pages/notes/editor";

export const Route = createFileRoute("/_notes/notes/$note")({
  component: Note,
});

export function Note() {
  const { note } = Route.useParams();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto scroll-hide max-w-[600px] mx-auto w-full">
      <div className="pt-12 px-4 h-[calc(100vh-3rem)]" spellCheck={false}>
        <Editor key={note} />
      </div>
    </div>
  );
}
