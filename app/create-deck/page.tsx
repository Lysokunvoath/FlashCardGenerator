"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createClientComponentClient } from "../lib/supabase/client";
import { ProtectedRoute } from "../context/ProtectedRoute";

const CreateDeckPage: React.FC = () => {
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      setError("Deck name is required");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a deck");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Ensure user profile exists in public.users to satisfy foreign key
      const { data: profile, error: profileCheckError } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileCheckError) {
        console.error("Profile check error:", profileCheckError);
        throw new Error("Could not verify user profile");
      }

      if (!profile) {
        console.log("Profile missing, creating one...");
        const { error: profileInsertError } = await supabase
          .from("users")
          .insert([
            {
              user_id: user.id,
              email: user.email,
              name: user.email?.split("@")[0] || "User",
            },
          ]);

        if (profileInsertError) {
          console.error("Profile creation error:", profileInsertError);
          throw new Error("Failed to create user profile. Please check database permissions.");
        }
      }

      // 2. Proceed with deck creation
      const { data, error: insertError } = await supabase
        .from("decks")
        .insert([
          {
            name: deckName,
            description: description,
            user_id: user.id,
            is_public: isPublic,
          },
        ])
        .select();

      if (insertError) {
        console.error("Supabase Insert Error:", insertError);
        throw new Error(insertError.message || "Database error occurred");
      }

      console.log("Deck created successfully:", data);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Full Error Object:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold">Create Deck</h1>
        </div>

        <div className="max-w-xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded-md text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="deckName" className="block text-lg font-medium text-white mb-2">
              Deck name
            </label>
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter deck name"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="description" className="block text-lg font-medium text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter deck description (optional)"
            ></textarea>
          </div>

          <div className="mb-8 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Public Visibility</h3>
                <p className="text-sm text-gray-400">When public, anyone can see and study this deck.</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  isPublic ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPublic ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreateDeck}
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateDeckPage;


