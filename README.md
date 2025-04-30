# Notes App

This is a Notes App built with a modern web stack, allowing users to create, view, and manage notes. The app includes a client-side React-based frontend and a backend powered by Node.js and Express.

---

## Features

- **Create Notes**: Add new notes with a title and content.
- **View Notes**: Display a list of all notes sorted by creation date.
- **Delete Notes**: Remove notes with a confirmation modal.
- **Responsive Design**: Works seamlessly across devices.
- **Backend Integration**: RESTful API for managing notes.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For storing notes data.

---

## Folder Structure

### Client
- **`src/app/page.tsx`**: Main entry point for the app. Handles fetching, creating, and deleting notes.
- **`src/components/NoteCard.jsx`**: Displays individual notes.
- **`src/components/CreateNoteForm.jsx`**: Modal for creating new notes.
- **`src/components/DeleteConfirmationModal.jsx`**: Modal for confirming note deletion.
- **`src/services/notesService.js`**: Handles API calls to the backend.

### Server
- **`controllers/notesController.js`**: Contains logic for creating, fetching, and deleting notes.
- **`models/Note.js`**: MongoDB schema for notes.
- **`routes/notes.js`**: API routes for notes.

---

## API Endpoints

### Base URL
`https://mini-notes-app-9d8e.onrender.com`

### Endpoints
1. **GET `/notes`**: Fetch all notes.
2. **POST `/notes/new`**: Create a new note.
3. **DELETE `/notes/:id`**: Delete a note by ID.

---
