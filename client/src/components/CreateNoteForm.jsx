"use client"
import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

export default function CreateNoteForm({ onCreateNote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await onCreateNote({ title, content });
      // Reset form
      setTitle('');
      setContent('');
      setIsOpen(false);
    } catch (err) {
      setError('Failed to create note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors"
      >
        <Plus className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-black">Create New Note</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              {error && (
                <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter title..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Write your note..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>Save Note</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
