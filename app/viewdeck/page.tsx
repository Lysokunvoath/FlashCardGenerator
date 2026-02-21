'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '../lib/supabase/client';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../context/ProtectedRoute';

interface Deck {
  id: string;
  name: string;
  description: string;
  user_id: string;
  is_public: boolean;
}

interface Card {
  id: string;
  question: string;
  answer: string;
}

const ViewDeckContent: React.FC = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);

  const searchParams = useSearchParams();
  const deckId = searchParams.get('id');
  const supabase = createClientComponentClient();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      if (!deckId) {
        setError("No deck selected");
        setLoading(false);
        return;
      }

      if (authLoading) return; 
      if (!user) return; 

      try {
        setLoading(true);
        setError(null);
        
        const { data: deckData, error: deckError } = await supabase
          .from('decks')
          .select('*')
          .eq('id', deckId)
          .maybeSingle();

        if (deckError) throw deckError;
        
        if (!deckData) {
          setError("Deck not found. If the deck exists, please ensure your Supabase Row Level Security (RLS) policies allow access.");
          setLoading(false);
          return;
        }
        
        setDeck(deckData);

        const { data: cardData, error: cardError } = await supabase
          .from('cards')
          .select('*')
          .eq('deck_id', deckId)
          .order('created_at', { ascending: true });
        
        if (cardError) throw cardError;
        setCards(cardData || []);

      } catch (err: any) {
        console.error("Database fetch error:", err);
        const errorMessage = err.message || "An unknown error occurred while fetching your data.";
        setError(`Database Error: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    if (deckId && !authLoading) {
      fetchDeckAndCards();
    }
  }, [deckId, supabase, user, authLoading]);

  const isOwner = user && deck && user.id === deck.user_id;

  const handleToggleVisibility = async () => {
    if (!deck || !isOwner) return;

    try {
      setUpdatingVisibility(true);
      const newVisibility = !deck.is_public;
      
      const { error: updateError } = await supabase
        .from('decks')
        .update({ is_public: newVisibility })
        .eq('id', deck.id);

      if (updateError) throw updateError;

      setDeck({ ...deck, is_public: newVisibility });
    } catch (err: any) {
      alert('Error updating visibility: ' + err.message);
    } finally {
      setUpdatingVisibility(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!isOwner) return;
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('cards')
        .delete()
        .eq('id', cardId);

      if (deleteError) throw deleteError;

      setCards(cards.filter(card => card.id !== cardId));
    } catch (err: any) {
      alert('Error deleting card: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-red-500 mb-4">{error || "Deck not found"}</p>
          <Link href="/alldeck" className="text-blue-500 hover:underline">
            Go back to all decks
          </Link>
        </div>
      </div>
    );
  }

  const progress = 0;

  return (
    <ProtectedRoute>
      <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
        <div className="flex items-center mb-6">
          <Link href="/alldeck">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-4 cursor-pointer hover:text-indigo-400 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h17.25"
              />
            </svg>
          </Link>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">{deck.name}</h1>
            {isOwner && (
              <button
                onClick={handleToggleVisibility}
                disabled={updatingVisibility}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  deck.is_public
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                    : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/50"
                } ${updatingVisibility ? "opacity-50 cursor-not-allowed" : ""}`}
                title={deck.is_public ? "Public: Everyone can see this deck" : "Private: Only you can see this deck"}
              >
                {deck.is_public ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span>Public</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span>Private</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-400">{deck.description || "No description provided."}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Progress</h2>
            <span className="text-gray-400">{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Questions</h2>
            <div className="flex items-center text-gray-400">
              <span className="mr-4">{cards.length} cards</span>
              {isOwner && (
                <Link href={`/createcard?id=${deck.id}`}>
                  <button className="flex items-center px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span>Add question</span>
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {cards.length === 0 ? (
              <div className="text-center p-8 bg-gray-800 rounded-lg text-gray-400">
                {isOwner ? "No cards in this deck yet. Click \"Add question\" to create one." : "No cards in this deck yet."}
              </div>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors">
                  <span className="text-lg">{card.question}</span>
                  {isOwner && (
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.679-.114 1.022-.165m-1.022.165a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.006-2.293a1.154 1.154 0 00-1.168 0 2.123 2.123 0 01-1.168 0c-1.096.153-2.006 1.113-2.006 2.293v.916m7.5 0h-7.5"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {cards.length > 0 && (
          <div className="mt-auto pt-8">
            <Link href={`/flashcard?id=${deck.id}`}>
              <button className="w-full py-3 bg-indigo-700 rounded-lg text-xl font-semibold hover:bg-indigo-800 transition-colors">
                Study now
              </button>
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

const ViewDeckPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ViewDeckContent />
    </Suspense>
  );
};

export default ViewDeckPage;
