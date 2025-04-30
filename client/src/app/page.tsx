"use client"
import { useState, useEffect } from 'react';
import NotesService from '../services/notesService';
import NoteCard from '../components/NoteCard';
import CreateNoteForm from '../components/CreateNoteForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Note } from '../types';

type NewNote = Omit<Note, 'id' | 'createdAt'>;

interface DeleteModalState {
  isOpen: boolean;
  noteId: string;
  isDeleting: boolean;
}

export default function MiniNotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    noteId: '',
    isDeleting: false,
  });
  useEffect(() => {
    console.log("Updated notes:", notes);
  }, [notes]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const fetchedNotes = await NotesService.getAllNotes();
      const transformedNotes: Note[] = fetchedNotes.map((note: any) => ({
        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.created_at,
      }));
      
      // Sort by creation date (newest first)
      transformedNotes.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setNotes(transformedNotes);


      setError('');
    } catch (err) {
      setError('Failed to load notes. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (newNote: NewNote) => {
    try {
      const created = await NotesService.createNote(newNote);
      const createdNote: Note = {
        id: created._id,
        title: created.title,
        content: created.content,
        createdAt: created.created_at,
      };
      setNotes([createdNote, ...notes]);
    } catch (err) {
      setError('Failed to create note. Please try again.');
      throw err;
    }
  };

  const handleDeleteClick = (id: string) => {
    console.log(id)
    setDeleteModal({
      isOpen: true,
      noteId: id,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal({ ...deleteModal, isDeleting: true });

    try {
      await NotesService.deleteNote(deleteModal.noteId);
      setNotes(notes.filter(note => note.id !== deleteModal.noteId));
      setDeleteModal({ isOpen: false, noteId: '', isDeleting: false });
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      setDeleteModal({ ...deleteModal, isDeleting: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-800">Mini Notes App</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {notes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No notes yet. Create your first note!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onDeleteClick={()=>handleDeleteClick(note.id)} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <CreateNoteForm onCreateNote={handleCreateNote} />
      
      <DeleteConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteModal.isDeleting}
      />
    </div>
  );
}
