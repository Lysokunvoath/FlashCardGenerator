'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '../lib/supabase/client';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../context/ProtectedRoute';

const CreateCardContent: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('id');
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const verifyOwnership = async () => {
      if (!deckId) {
        setError('No deck selected. Please go back to All Decks and select a deck first.');
        setVerifying(false);
        return;
      }

      if (!user) return;

      try {
        const { data: deck, error: deckError } = await supabase
          .from('decks')
          .select('user_id')
          .eq('id', deckId)
          .single();

        if (deckError || !deck) {
          setError('Deck not found');
        } else if (deck.user_id !== user.id) {
          router.push(`/viewdeck?id=${deckId}`);
        }
      } catch (err) {
        console.error('Error verifying ownership:', err);
      } finally {
        setVerifying(false);
      }
    };

    verifyOwnership();
  }, [deckId, user, supabase, router]);

  const handleCreateCard = async () => {
    if (!question.trim() || !answer.trim()) {
      setError('Both question and answer are required');
      return;
    }

    if (!deckId) {
      setError('No deck selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('cards')
        .insert([
          {
            question: question,
            answer: answer,
            deck_id: deckId,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setQuestion('');
      setAnswer('');
      router.push(`/viewdeck?id=${deckId}`);
    } catch (err: any) {
      console.error('Error creating card:', err);
      setError(err.message || 'An error occurred while creating the card');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMore = async () => {
    if (!question.trim() || !answer.trim()) {
      setError('Both question and answer are required');
      return;
    }

    if (!deckId) {
      setError('No deck selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('cards')
        .insert([
          {
            question: question,
            answer: answer,
            deck_id: deckId,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setQuestion('');
      setAnswer('');
      alert('Card added successfully!');
    } catch (err: any) {
      console.error('Error creating card:', err);
      setError(err.message || 'An error occurred while creating the card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => deckId ? router.push(`/viewdeck?id=${deckId}`) : router.push('/alldeck')}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h17.25"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Create flash card</h1>
        </div>
        <hr className="border-gray-700 mb-8" />

        <div className="space-y-6 max-w-2xl mx-auto">
          {error && (
            <div className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="question" className="block text-xl font-medium text-gray-300 mb-2">
              Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white text-lg outline-none transition-all"
              placeholder="Enter your question here"
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-xl font-medium text-gray-300 mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white text-lg outline-none transition-all"
              placeholder="Enter the answer here"
            ></textarea>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button 
              onClick={handleAddMore}
              disabled={loading || !deckId}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add more
            </button>
            <button 
              onClick={handleCreateCard}
              disabled={loading || !deckId}
              className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const CreateCardPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <CreateCardContent />
    </Suspense>
  );
};

export default CreateCardPage;
