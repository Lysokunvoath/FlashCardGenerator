import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <Link href="/login" style={{
        fontSize: '1.5rem',
        color: 'blue',
        textDecoration: 'underline',
      }}>
        Go to Login Page
      </Link>
    </main>
  )
};