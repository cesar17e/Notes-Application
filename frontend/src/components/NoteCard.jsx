import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => {
        const updatedNotes = prev.filter((note) => note._id !== id);
        return updatedNotes;
      });
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group surface-card flex h-full min-h-[220px] flex-col border-t-4 border-[#00FF9D] transition duration-200 hover:-translate-y-1 hover:shadow-emerald-950/30"
    >
      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-primary/80">
            Note
          </span>
          <PenSquareIcon className="size-4 flex-shrink-0 text-primary/70 transition group-hover:text-primary" />
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-base-content sm:text-xl">
          {note.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-base-content/70 sm:text-base">
          {note.content}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-base-content/10 pt-4">
          <span className="text-xs uppercase tracking-[0.2em] text-base-content/50 sm:text-sm">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm rounded-xl text-error hover:bg-error/10"
              onClick={(e) => handleDelete(e, note._id)}
              aria-label={`Delete ${note.title}`}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
