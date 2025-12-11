import mongoose from "mongoose";


//Create the schema, where we have requried fields and optional fields
//new mongoose.Schema(definitionObject, optionsObject)
//It will refer to my users model
//Every note in this collection will have an assigned id by mongoose
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true //notes must belong to a user
    }
  },
  { timestamps: true } //Mongodb will give us the createdAt and updatedAt fields by adding this
);

const Note = mongoose.model("Note", noteSchema); //Creates the model, which is really a collection enforced with our schema
export default Note;
