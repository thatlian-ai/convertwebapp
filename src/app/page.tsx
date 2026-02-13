import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      gap: '2rem'
    }}>
      <h1 className="title-gradient" style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1 }}>
        Antigravity
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)', maxWidth: '600px' }}>
        Turn your website into a premium mobile app in seconds.
      </p>
      <Link
        href="/builder"
        style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: 'var(--radius)',
          fontWeight: 600,
          fontSize: '1.125rem',
          transition: 'transform 0.2s',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Start Building
      </Link>
    </main>
  );
}
