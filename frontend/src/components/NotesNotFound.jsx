import { StickyNote } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="surface-card mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="mb-6 rounded-full bg-primary/10 p-6 sm:p-8">
        <StickyNote className="size-10 text-primary sm:size-12" />
      </div>
      <h3 className="text-2xl font-bold text-white sm:text-3xl">No notes yet</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-base-content/70 sm:text-base">
        Ready to organize your thoughts? Start with a quick note and your workspace will appear here.
      </p>
      <Link to="/create" className="btn btn-primary mt-6 h-12 rounded-2xl px-6">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;
