import Link from 'next/link';
import styles from './page.module.css';
import { clsx } from 'clsx';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <div className={styles.motionBackground}>
                <div className={clsx(styles.blob, styles.blob1)} />
                <div className={clsx(styles.blob, styles.blob2)} />
            </div>

            <header className={styles.navHeader}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>ConvertWebApp</Link>
                    <nav className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="/pricing" className={styles.navLink}>Pricing</Link>
                    </nav>
                </div>
            </header>

            <div className={styles.contentContainer}>
                <div className={styles.headerSection}>
                    <Link href="/" className={styles.backButton}>
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <h1 className={styles.title}>Privacy <span className={styles.gradientText}>Policy</span></h1>
                    <p className={styles.lastUpdated}>Last Updated: February 13, 2026</p>
                </div>

                <div className={styles.glassCard}>
                    <section className={styles.section}>
                        <h3>1. Information We Collect</h3>
                        <p>We collect information you provide directly to us when creating your app, such as the target URL, app name, and branding assets. We also collect billing information via our third-party payment processor.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. How We Use Information</h3>
                        <p>We use your information to provide and maintain the ConvertWebApp service, process your builds, and communicate with you about your subscription and updates.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>3. Data Storage & Security</h3>
                        <p>We implement industry-standard security measures to protect your data. Your website content is accessed only for the purpose of conversion and simulation.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>4. Third-Party Services</h3>
                        <p>We use third-party services like Stripe for payment processing. These services have their own privacy policies governing how they handle your data.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Your Choices</h3>
                        <p>You can update your account information or cancel your service at any time by contacting our support team or using your dashboard.</p>
                    </section>
                </div>
            </div>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} ConvertWebApp. All rights reserved.</p>
            </footer>
        </main>
    );
}
