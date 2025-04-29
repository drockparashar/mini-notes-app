import express from 'express';
import {createNote,getAllNotes,getNoteById,deleteNote} from '../controllers/notesController.js';

const router=express.Router();

router.post("/new",createNote);

router.get("/",getAllNotes);

router.get("/:_id",getNoteById);

router.delete("/:_id",deleteNote);

export default router;