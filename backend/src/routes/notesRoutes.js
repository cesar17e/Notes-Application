import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById} from "../controllers/notesController.js";
import { noteReadLimiter, noteWriteLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

//Get notes
router.get("/", noteReadLimiter, getAllNotes);
router.get("/:id", noteReadLimiter, getNoteById);

//Create note (rate limited)
router.post("/", noteWriteLimiter, createNote);

/*
Below uses an id param like 
Example http://localhost:<port>/api/notes${id}
*/

//To update a note
router.put("/:id", noteWriteLimiter, updateNote);

//Delete a node     
router.delete("/:id", noteWriteLimiter, deleteNote);

export default router;
