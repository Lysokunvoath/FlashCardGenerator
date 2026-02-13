"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signUpWithEmailAndPassword } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmailAndPassword(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a202c',
      color: 'white',
    }}>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div style={{
        backgroundColor: '#2d3748',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>Sign Up</h1>
        <form onSubmit={handleSignup}>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
            }}>Email</label>
            <input
              type="email"
              id="email"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#4a5568',
                color: 'white',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
            }}>Password</label>
            <input
              type="password"
              id="password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#4a5568',
                color: 'white',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="confirm-password" style={{
              display: 'block',
              marginBottom: '0.5rem',
            }}>Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#4a5568',
                color: 'white',
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#1a365d' : '#2b6cb0',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
              }}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
            <Link href="/login" style={{
              color: '#a0aec0',
              textDecoration: 'none',
            }}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;