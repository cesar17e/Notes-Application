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
    <header className="bg-base-300 border-b border-base-content/10 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold font-mono tracking-tight text-primary">
            <Link to="/">ThinkBoard</Link>
          </h1>

          {user && (
            <div className="flex items-center gap-4">

              {/* New Note Button */}
              <Link
                to="/create"
                className="
                  btn btn-primary rounded-lg 
                  shadow-md 
                  hover:shadow-lg hover:bg-primary-focus hover:text-white 
                  transition-all duration-200
                  flex items-center gap-2
                "
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Note</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="
                  btn btn-outline btn-error rounded-lg 
                  hover:bg-error hover:text-white hover:border-error 
                  transition-all duration-200
                  flex items-center gap-2
                "
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
