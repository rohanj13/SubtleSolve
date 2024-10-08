import React from 'react';
import { X } from 'lucide-react';

const InstructionStep = ({ number, text }) => (
  <div className="flex items-start space-x-2 mb-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
      {number}
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

export default function InstructionsDialog({ open, handleClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 sm:max-w-[425px] w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-800">Welcome to Subtle Solve!</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-600 hover:text-gray-900 transition-opacity focus:outline-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6">
          <InstructionStep
            number="1"
            text="Every day, you'll see a random category on the screen."
          />
          <InstructionStep
            number="2"
            text="You have 6 attempts to guess the word in that category. For example, if the category is 'Rivers', the answer could be 'Nile'."
          />
          <InstructionStep
            number="3"
            text="Each guess reveals a clue about the answer. Your first guess is the hardest, with no clues, and earns you 5 points."
          />
          <InstructionStep
            number="4"
            text="Each subsequent attempt reduces your points by 1. If you can't guess the word, you'll receive 0 points."
          />
        </div>

        {/* Custom Alert Box */}
        <div className="mt-6 p-4 rounded-lg bg-purple-100 border border-purple-300">
          <h3 className="text-purple-800 font-semibold">Pro Tip:</h3>
          <p className="text-purple-700 mt-1">
            Make sure to log in to track your stats and compete with friends!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
}
