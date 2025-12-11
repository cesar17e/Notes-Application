import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; //import Toaster
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  
  return (
    <div className="relative h-full w-full">
      <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-[radial-gradient(60%_120%_at_50%_50%,rgba(50,80,60,0.15)_0,rgba(0,0,0,1)_100%)] "></div>
      <Toaster position="top-right" reverseOrder={false} />      {/* Toast container */}
      <Routes>

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
};

export default App;
