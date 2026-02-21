'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '../lib/supabase/client';
import { ProtectedRoute } from '../context/ProtectedRoute';

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface Deck {
  id: string;
  name: string;
}

function FlashcardContent() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const deckId = searchParams.get('id');
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!deckId) {
        setError("No deck selected");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: deckData, error: deckError } = await supabase
          .from('decks')
          .select('id, name')
          .eq('id', deckId)
          .single();

        if (deckError) throw deckError;
        setDeck(deckData);

        const { data: cardData, error: cardError } = await supabase
          .from('cards')
          .select('id, question, answer')
          .eq('deck_id', deckId)
          .order('created_at', { ascending: true });

        if (cardError) throw cardError;
        setCards(cardData || []);

      } catch (err: any) {
        console.error("Error fetching study data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deckId, supabase]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Congratulations! You've finished this deck.");
      router.push(`/viewdeck?id=${deckId}`);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !deck || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white p-4">
        <p className="text-xl mb-4 text-center">{error || (cards.length === 0 ? "No cards found in this deck." : "Deck not found")}</p>
        <Link href={deckId ? `/viewdeck?id=${deckId}` : "/alldeck"} className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Go Back
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-950 text-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <Link href={`/viewdeck?id=${deckId}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold ml-4">{deck.name}</h1>
          </div>
          <div className="text-gray-400">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div 
            onClick={toggleFlip}
            className={`cursor-pointer transition-all duration-500 preserve-3d relative w-full max-w-2xl h-96`}
          >
            <div className={`absolute inset-0 bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center backface-hidden transition-all duration-500 ${isFlipped ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <div className="absolute top-4 right-4 bg-indigo-600/20 text-indigo-400 font-medium py-1 px-3 rounded-full text-sm">
                Question
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white text-center">
                {currentCard.question}
              </p>
              <p className="mt-8 text-gray-500 text-sm animate-pulse">Click to see answer</p>
            </div>

            <div className={`absolute inset-0 bg-indigo-900 rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center backface-hidden transition-all duration-500 ${!isFlipped ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <div className="absolute top-4 right-4 bg-white/20 text-white font-medium py-1 px-3 rounded-full text-sm">
                Answer
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white text-center">
                {currentCard.answer}
              </p>
              <p className="mt-8 text-indigo-300 text-sm animate-pulse">Click to see question</p>
            </div>
          </div>

          <div className="mt-12 flex items-center space-x-8">
            <button 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={toggleFlip}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-lg transition-colors"
            >
              Flip Card
            </button>

            <button 
              onClick={handleNext}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function FlashcardPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <FlashcardContent />
    </Suspense>
  );
}
