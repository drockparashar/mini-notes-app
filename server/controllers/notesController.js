import Note from "../models/Note.js";

export async function createNote(req,res) {
    const {title,content}=req.body;
    console.log(title,content);

    try{
        const newNote=new Note({title,content});
        await newNote.save();

        console.log("New note created successfully",newNote);
        res.status(200).json({message:"New note created successfully",newNote});
    }catch(err){
        return res.status(400).json({message:"An error occured. Error: ",err});
        console.log("An error occured. Error: ",err);
    }
}

export async function getAllNotes(req,res) {
   try{
    const notes=await Note.find({});
    return res.status(200).json(notes);
   }catch(err){
    return res.json(400).json({message:"Couldn't fetch notes"});
   }
}

export async function getNoteById(req,res) {
    const _id=req.params;

    try{
        const note=await Note.findOne({_id});

        if(!note)
            return res.status(400).json({message:"No note found"});

        return res.status(200).json(note);
    }catch(err){
        return res.status(400).json({message:"Error fetching the note"});
    }
}

export async function deleteNote(req,res) {

    const _id=req.params._id;

    try{
        const result = await Note.findByIdAndDelete({_id});

        return res.status(200).json({message:"Note deleted successfully"});
    }catch(err){
        return res.status(400).json({message:"Error deleting the note",err});
    }
    
}