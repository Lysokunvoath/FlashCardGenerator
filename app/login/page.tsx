"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <Head>
          <title>Login</title>
        </Head>
        <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <Link href="/signup" className="text-gray-400 hover:text-white">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;