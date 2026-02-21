"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { createClientComponentClient } from "../lib/supabase/client";
import { useAuth } from "../context/AuthContext";

interface Deck {
  id: string;
  name: string;
  description: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  card_count?: number;
  users?: {
    name: string;
  };
}

const Card = ({ deck, isOwner }: { deck: Deck, isOwner: boolean }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-sm flex flex-col h-full relative">
    <div className="flex justify-between items-start mb-2">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-white truncate pr-2">{deck.name}</h3>
        {isOwner && (
          <span className={`text-[10px] mt-1 font-semibold uppercase tracking-wider ${deck.is_public ? 'text-green-400' : 'text-amber-400'}`}>
            {deck.is_public ? 'Public' : 'Private'}
          </span>
        )}
      </div>
      {deck.users?.name && (
        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/30 whitespace-nowrap">
          by {deck.users.name}
        </span>
      )}
    </div>
    <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{deck.description || "No description provided."}</p>
    <div className="mt-auto">
      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
        <span>Progress</span>
        <span>{deck.card_count || 0} cards</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }}></div>
      </div>
      <Link href={`/viewdeck?id=${deck.id}`}>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors">
          Study now
        </button>
      </Link>
    </div>
  </div>
);

const AllDeckPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const supabase = createClientComponentClient();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        setFetching(true);
        
        let query = supabase
          .from("decks")
          .select("*, users(name)")
          .order("created_at", { ascending: false });

        // If user is logged in, show their own decks + other public decks
        // Otherwise, just show public decks
        if (user) {
          query = query.or(`is_public.eq.true,user_id.eq.${user.id}`);
        } else {
          query = query.eq('is_public', true);
        }

        const response = await query;

        if (response.error) throw response.error;

        // Get card counts separately for each deck
        const decksWithCounts = await Promise.all((response.data || []).map(async (d: any) => {
          const cardsResponse = await supabase
            .from("cards")
            .select("id", { count: 'exact', head: true })
            .eq("deck_id", d.id);
          
          return {
            ...d,
            card_count: cardsResponse.count || 0
          };
        }));

        setDecks(decksWithCounts);
      } catch (err: any) {
        console.error("AllDeck fetch error:", err);
        setError(err.message || "An unknown error occurred while fetching decks.");
      } finally {
        setFetching(false);
      }
    };

    if (!loading) {
      fetchDecks();
    }
  }, [supabase, user, loading]);

  const filteredDecks = decks.filter((deck) =>
    deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All deck</h1>
        <Link href="/create-deck">
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add deck
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {fetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-8 bg-red-500/10 rounded-lg border border-red-500">
          Error: {error}
        </div>
      ) : filteredDecks.length === 0 ? (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          {searchTerm ? "No decks found matching your search." : "No decks available yet."}
          {!searchTerm && (
             <div className="mt-4">
               <Link href="/create-deck" className="text-blue-500 hover:underline">Create the first deck</Link>
             </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDecks.map((deck, index) => (
            <Card 
              key={deck.id ? `deck-${deck.id}-${index}` : `deck-idx-${index}`} 
              deck={deck} 
              isOwner={user?.id === deck.user_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDeckPage;
