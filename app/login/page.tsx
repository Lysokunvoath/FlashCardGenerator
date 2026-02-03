
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const LoginPage: NextPage = () => {
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
        <title>Login</title>
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
        }}>Login</h1>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
            }}>Email</label>
            <input type="email" id="email" style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#4a5568',
              color: 'white',
            }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
            }}>Password</label>
            <input type="password" id="password" style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#4a5568',
              color: 'white',
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button type="submit" style={{
              backgroundColor: '#2b6cb0',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}>Login</button>
            <Link href="/signup" style={{
              color: '#a0aec0',
              textDecoration: 'none',
            }}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
