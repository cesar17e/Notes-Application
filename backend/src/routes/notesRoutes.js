import express, { Router } from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById} from "../controllers/notesController.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

//Get notes
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

//Create note (rate limited)
router.post("/", rateLimiter, createNote);

/*
Below uses an id param like 
Example http://localhost:<port>/api/notes${id}
*/

//To update a note
router.put("/:id", updateNote);

//Delete a node     
router.delete("/:id", deleteNote);

export default router;
 


