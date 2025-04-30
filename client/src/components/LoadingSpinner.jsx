"use client"
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="h-8 w-8 text-blue-300 animate-spin" />
      <span className="ml-2 font-medium text-gray-600">Loading...</span>
    </div>
  );
}