"use client"
import { Trash2 } from 'lucide-react';

export default function NoteCard({ note, onDeleteClick }) {
  // Function to generate a pastel color based on the note id
  const generatePastelColor = (id) => {
    const colors = [
      'bg-blue-50 border-blue-100',
      'bg-pink-50 border-pink-100',
      'bg-green-50 border-green-100',
      'bg-purple-50 border-purple-100',
      'bg-yellow-50 border-yellow-100'
    ];
    
    // Use a hash function to select a color based on the id
    const hashCode = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hashCode % colors.length];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Ensure the note has the required properties
  if (!note || !note.id || !note.title || !note.content || !note.createdAt) {
    return (
      <div className="rounded-lg border p-4 shadow-sm bg-red-50 text-red-500">
        Invalid note data
      </div>
    );
  }
  

  const colorClass = generatePastelColor(note.id);

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${colorClass}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800 text-lg truncate">{note.title}</h3>
        <button
          onClick={() => onDeleteClick(note._id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Delete note"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-2 text-gray-600 text-sm h-16 overflow-hidden">
        {note.content.length > 120 ? `${note.content.substring(0, 120)}...` : note.content}
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        {formatDate(note.createdAt)}
      </div>
    </div>
  );
}