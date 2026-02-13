"use client";

import { useState } from 'react';
import { signInWithGoogle, signInWithEmail } from '@/lib/firebase/auth'; // We'll need to add email auth to lib
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            router.push('/builder');
        } catch (err: any) {
            setError('Failed to login with Google.');
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for email login implementation
        setError('Email login coming soon!');
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to continue building your app</p>

                <button onClick={handleGoogleLogin} className={styles.googleBtn}>
                    Sign in with Google
                </button>

                <div className={styles.divider}>or</div>

                <form onSubmit={handleEmailLogin} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.submitBtn}>Sign In</button>
                </form>

                {error && <p className={styles.error}>{error}</p>}

                <p className={styles.footer}>
                    Don't have an account? <Link href="/signup">Sign up</Link>
                </p>
            </div>
        </main>
    );
}
