import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="page-shell py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
              Notes Workspace
            </p>
            <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
              <Link to="/" className="hover:text-primary">
                ThinkBoard
              </Link>
            </h1>
            {user ? (
              <p className="mt-1 truncate text-sm text-base-content/70">
                Signed in as {user.username}
              </p>
            ) : null}
          </div>

          {user && (
            <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center">
              <Link
                to="/create"
                className="btn btn-primary h-12 rounded-2xl px-5 text-sm font-semibold sm:h-11"
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Note</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error h-12 rounded-2xl px-5 text-sm font-semibold sm:h-11"
              >
                <LogOutIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
