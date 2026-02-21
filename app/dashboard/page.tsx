"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { createClientComponentClient } from '../lib/supabase/client';

interface Deck {
  id: string;
  name: string;
  card_count: number;
  is_public: boolean;
}

const DeckCard: React.FC<{ deck: Deck }> = ({ deck }) => {
  const progress = 0; 
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md w-64 flex flex-col relative group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-white truncate pr-2 flex-1">{deck.name}</h3>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
          deck.is_public 
            ? 'text-green-400 border-green-500/30 bg-green-500/10' 
            : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
        }`}>
          {deck.is_public ? 'Public' : 'Private'}
        </span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full mb-2">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Progress</span>
        <span>{deck.card_count} cards</span>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <Link href={`/flashcard?id=${deck.id}`}>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
            Study now
          </button>
        </Link>
        <Link href={`/viewdeck?id=${deck.id}`}>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors text-xs">
            Edit deck
          </button>
        </Link>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchRecentDecks = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const decksResponse = await supabase
          .from("decks")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (decksResponse.error) throw decksResponse.error;
        
        if (!decksResponse.data || decksResponse.data.length === 0) {
           setDecks([]);
           return;
        }

        const formattedDecks = await Promise.all(decksResponse.data.map(async (d: any) => {
          const cardsResponse = await supabase
            .from("cards")
            .select("id", { count: 'exact', head: true })
            .eq("deck_id", d.id);
          
          return {
            id: d.id,
            name: d.name,
            is_public: d.is_public,
            card_count: cardsResponse.count || 0
          };
        }));

        setDecks(formattedDecks);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && !authLoading) {
      fetchRecentDecks();
    }
  }, [user, authLoading, supabase]);

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const overallProgress = 0;

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl mb-8 border border-blue-600/30">
        <h2 className="text-2xl font-semibold mb-4 text-white">Overall Study Progress: {overallProgress}%</h2>
        <div className="h-4 bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Your Decks</h2>
          <Link href="/alldeck" className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Explore all decks
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 w-64 h-40 animate-pulse"></div>
            ))}
          </div>
        ) : decks.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-dashed border-gray-700">
            <h3 className="text-xl font-medium mb-4">No decks yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your learning journey by creating your first deck of flashcards.
            </p>
            <Link href="/create-deck">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors">
                Create First Deck
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {decks.map((deck, index) => (
              <DeckCard key={deck.id || `deck-${index}`} deck={deck} />
            ))}
            
            <Link href="/create-deck" className="group">
              <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-4 w-64 h-full flex flex-col items-center justify-center min-h-[160px] group-hover:border-blue-500 group-hover:bg-gray-800 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-700 group-hover:bg-blue-600/20 flex items-center justify-center mb-2 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-gray-400 group-hover:text-white font-medium">Add New Deck</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
