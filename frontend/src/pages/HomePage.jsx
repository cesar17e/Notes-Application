import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
          const res = await api.get("/notes");
          console.log(res.data);
          setNotes(res.data);
          setIsRateLimited(false);
      } catch (error) {
          console.error("Error fetching notes:", error);
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error('Failed to load notes')
          }
      } finally {
          setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen pb-8">
      <Navbar />
      <main className="page-shell space-y-6 sm:space-y-8">
        <section className="surface-card overflow-hidden">
          <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                Your Workspace
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Keep your notes close on every screen.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-base-content/70 sm:text-base">
                Review recent notes, jump into editing fast, and create new entries without losing space on mobile.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-end">
              <div className="rounded-2xl border border-white/10 bg-base-100/60 px-4 py-3 text-center sm:min-w-[132px]">
                <p className="text-xs uppercase tracking-[0.22em] text-base-content/50">Notes</p>
                <p className="mt-2 text-2xl font-semibold text-white">{notes.length}</p>
              </div>
              <Link to="/create" className="btn btn-primary h-auto min-h-[68px] rounded-2xl px-5 py-3 text-left normal-case sm:min-w-[160px]">
                <span className="leading-tight">
                  <span className="block text-xs uppercase tracking-[0.22em] text-white/70">Quick action</span>
                  <span className="block pt-1 text-sm font-semibold sm:text-base">Create a note</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {isRateLimited ? <RateLimitedUI /> : null}

        {loading ? (
          <div className="surface-card py-14 text-center text-primary">Loading notes...</div>
        ) : null}

        {!loading && notes.length === 0 && !isRateLimited ? <NotesNotFound /> : null}

        {!loading && notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
