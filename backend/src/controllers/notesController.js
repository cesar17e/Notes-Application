import Note from "../models/Note.js";

/*
    CRUD OPERATIONS FOR THE NOTES APP

    Will hold all of the functions for our notes routes
    Middleware assures that all users have a jwt so we can use req.user._id
*/

//Read(GET)

//Req(request), and res(response) objects
export const getAllNotes = async (req, res) => {
    try{
        //Get the notes from the database from user (using his userId), but exclude the userId field
        const notes = await Note.find({ userId: req.user.id }).select('-userId').sort({createdAt: -1}); //newest first

        //Send back users notes in json form, it has the id of the note, sends a sort of array of json 
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch notes" }); //Send them a 500 (internal Server Error)
    }
};

//We expect and http param from user :_id
export const getNoteById = async (req, res) => {
    try{
        //Get the notes from the database from user (using his userId), but exclude the userId field
        const note = await Note.findOne({ //Nested querys
            _id: req.params.id,
            userId: req.user.id
        });

        if (!note) { //Inputted the wrong id param
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch note" }); //Send them a 500 (internal Server Error) 

    }

};



//Create(POST)
//We expect a title(string), content(string) from frontend
//We must update the db, adding a title(string), content(string), userid(req body) to the note model(collection)
export const createNote = async (req,res)=>{
    try{
        const { title, content } = req.body; //user will send these fields
        if(!title || !content){
            return res.status(400).json({ message: "You must enter your fields" });
        }

        //Create the note
        const note = await Note.create({
            title,
            content,
            userId: req.user.id
        });   

        //Send back users note in json form, it has the id of the note
        res.status(201).json({note})    

    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Failed to create note" });
    }
};


//Update(PUT)
//By default each object within a collecition has an id, so we can look for this note
//By its mongodb id
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Only update if the note belongs to this user
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, // SAFETY CHECK
            { title, content },
            { new: true }
        );

        if (!updatedNote) { //When they put in a wrong param id or not the users
            return res.status(404).json({ message: "Note not found or not yours" });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to update note" });
    }
};


//DELETE
//We want to get its associated id from the http param link
export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id //SAFETY CHECK
        });

        if (!deletedNote) { //When they put in a wrong param id or not the users
            return res.status(404).json({ message: "Note not found or not yours" });
        }

        res.status(200).json({ message: "Note deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to delete note" });
    }
};







