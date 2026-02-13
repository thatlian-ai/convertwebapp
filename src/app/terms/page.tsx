import Link from 'next/link';
import styles from './page.module.css';
import { clsx } from 'clsx';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
                    <h1 className={styles.title}>Terms of <span className={styles.gradientText}>Service</span></h1>
                    <p className={styles.lastUpdated}>Last Updated: February 13, 2026</p>
                </div>

                <div className={styles.glassCard}>
                    <section className={styles.section}>
                        <h3>1. Agreement to Terms</h3>
                        <p> By accessing or using ConvertWebApp, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Service Description</h3>
                        <p>ConvertWebApp provides a platform for converting websites into mobile applications. We do not guarantee acceptance by Apple App Store or Google Play Store, as those are subject to third-party review policies.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>3. User Responsibilities</h3>
                        <p>You are responsible for the content of the website you convert. You must own the rights to the content and URL being converted. Any misuse or conversion of unauthorized property will result in immediate termination of service.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>4. Subscription & Payments</h3>
                        <p>Bills are processed monthly. You can cancel your subscription at any time. Refunds are subject to our discretion and generally not provided for partial months of service after the trial period ends.</p>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Limitation of Liability</h3>
                        <p>ConvertWebApp is provided "as is". We are not liable for any damages arising from the use or inability to use our services, including but not limited to app store rejections or loss of data.</p>
                    </section>
                </div>
            </div>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} ConvertWebApp. All rights reserved.</p>
            </footer>
        </main>
    );
}
