import { Link, useParams } from "@tanstack/react-router";
import { formatRelative } from "date-fns";
import { twMerge } from "tailwind-merge";

type NoteItemProps = {
  name: string;
  lastEdit: Date;
};

export function NoteItem({ name, lastEdit }: NoteItemProps) {
  const { note } = useParams({ strict: false });
  const active = note === name;
  return (
    <Link
      to="/notes/$note"
      params={{ note: name }}
      className={twMerge(
        "flex flex-col select-none py-3 px-4",
        active ? "bg-neutral-200" : "transition-all hover:bg-neutral-200"
      )}
    >
      <span className="text-sm font-semibold">{name}</span>
      <span className="text-xs text-black/80">
        {formatRelative(lastEdit, new Date())}
      </span>
    </Link>
  );
}
