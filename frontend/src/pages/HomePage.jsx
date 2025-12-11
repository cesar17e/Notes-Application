import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  //  const [email, setEmail] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () => {
      setLoading(true); // start loading
      try{
          const res = await api.get("/notes"); //Our own fetch
          console.log(res.data);
          setNotes(res.data); //Returns an array of json
          setIsRateLimited(false);
      } catch (error) {
          console.error("Error fetching notes:", error);
          if(error.response?.status === 429){
            setIsRateLimited(true)
          }else{
            toast.error('Failed to load notes')
          }
      } finally {
          setLoading(false);
      }
    }

    fetchNotes(); // Call the function

  }, []) //on first render



  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited ? <RateLimitedUI /> : null}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
