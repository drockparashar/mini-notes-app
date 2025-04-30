"use client"
import { Loader2 } from 'lucide-react';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg pointer-events-auto">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">Delete Note</h3>
          <p className="text-sm text-gray-500 mt-1">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md text-sm font-medium transition-colors flex items-center"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
