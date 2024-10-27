import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "../../../components/pages/notes/editor";

export const Route = createFileRoute("/_notes/notes/$note")({
  component: Note,
});

export function Note() {
  const { note } = Route.useParams();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto scroll-hide max-w-[650px] mx-auto w-full">
      <div className="md:pt-8 md:pb-8 flex flex-col px-4 min-h-[calc(100vh-3rem)]">
        <Editor key={note} />
      </div>
    </div>
  );
}
