import Link from 'next/link';
import styles from './page.module.css';
import { clsx } from 'clsx';
import {
    Check,
    ArrowRight,
    Smartphone,
    Globe,
    Zap,
    Shield,
    HelpCircle,
    Layout,
    ExternalLink
} from 'lucide-react';

export default function PricingPage() {
    return (
        <main className={styles.main}>
            {/* Motion Background */}
            <div className={styles.motionBackground}>
                <div className={clsx(styles.blob, styles.blob1)} />
                <div className={clsx(styles.blob, styles.blob2)} />
            </div>

            {/* Header */}
            <header className={styles.navHeader}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>ConvertWebApp</Link>
                    <nav className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="/pricing" className={clsx(styles.navLink, styles.active)}>Pricing</Link>
                        <a href="mailto:tha@vailamtahministry.com" className={styles.navLink}>Contact</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <div className={styles.badge}>Simple, Transparent Pricing</div>
                    <h1 className={styles.title}>The Right Plan for <span className={styles.gradientText}>Every Vision</span></h1>
                    <p className={styles.subtitle}>
                        Launch your mobile presence with professional tools and automated store publishing.
                        Choose a path that scales with your ambition.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.pricingGrid}>
                        {/* Small Plan */}
                        <div className={styles.priceCard}>
                            <div className={styles.planHeader}>
                                <h3 className={styles.planName}>Small</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>29</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                                <p className={styles.planDesc}>Perfect for personal blogs and portfolios.</p>
                            </div>
                            <div className={styles.planFeatures}>
                                <div className={styles.featureItem}><Check size={18} /> Native iOS & Android Build</div>
                                <div className={styles.featureItem}><Check size={18} /> Basic Customization</div>
                                <div className={styles.featureItem}><Check size={18} /> Standard Push Notifications</div>
                                <div className={styles.featureItem}><Check size={18} /> Community Support</div>
                            </div>
                            <Link href="/builder" className={styles.planButton}>Get Started</Link>
                        </div>

                        {/* Medium Plan */}
                        <div className={clsx(styles.priceCard, styles.popular)}>
                            <div className={styles.popularBadge}>Most Popular</div>
                            <div className={styles.planHeader}>
                                <h3 className={styles.planName}>Medium</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>49</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                                <p className={styles.planDesc}>Ideal for growing businesses and e-commerce.</p>
                            </div>
                            <div className={styles.planFeatures}>
                                <div className={styles.featureItem}><Check size={18} /> Advanced Customization</div>
                                <div className={styles.featureItem}><Check size={18} /> Unlimited Push Notifications</div>
                                <div className={styles.featureItem}><Check size={18} /> Priority App Store Review</div>
                                <div className={styles.featureItem}><Check size={18} /> Dedicated Agent Support</div>
                                <div className={styles.featureItem}><Check size={18} /> Custom Loader Screens</div>
                            </div>
                            <Link href="/builder" className={clsx(styles.planButton, styles.primary)}>Start 5-Day Free Trial</Link>
                        </div>

                        {/* Large Plan */}
                        <div className={styles.priceCard}>
                            <div className={styles.planHeader}>
                                <h3 className={styles.planName}>Large</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>99</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                                <p className={styles.planDesc}>Enterprise-grade scale and integration.</p>
                            </div>
                            <div className={styles.planFeatures}>
                                <div className={styles.featureItem}><Check size={18} /> All Medium Features</div>
                                <div className={styles.featureItem}><Check size={18} /> Custom API Integrations</div>
                                <div className={styles.featureItem}><Check size={18} /> White-label Branding</div>
                                <div className={styles.featureItem}><Check size={18} /> 24/7 Phone Support</div>
                                <div className={styles.featureItem}><Check size={18} /> Multi-app Management</div>
                            </div>
                            <Link href="/builder" className={styles.planButton}>Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className={styles.section} style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Feature Comparison</h2>
                        <p className={styles.sectionSubtitle}>Compare every detail to find your perfect fit.</p>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.comparisonTable}>
                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th>Small</th>
                                    <th>Medium</th>
                                    <th>Large</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Native iOS/Android App</td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                </tr>
                                <tr>
                                    <td>Store Upload Support</td>
                                    <td>Basic</td>
                                    <td>Priority</td>
                                    <td>Managed</td>
                                </tr>
                                <tr>
                                    <td>Ad-Free Experience</td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                </tr>
                                <tr>
                                    <td>Custom Push Engine</td>
                                    <td>-</td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                </tr>
                                <tr>
                                    <td>White Labeling</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td><Check size={20} className={styles.checkIcon} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faqGrid}>
                        <div className={styles.faqCard}>
                            <h4>How long does the trial last?</h4>
                            <p>All Medium and Large plans come with a 5-day free trial. You can cancel anytime before the trial ends.</p>
                        </div>
                        <div className={styles.faqCard}>
                            <h4>Do you help with App Store publication?</h4>
                            <p>Yes! We provide interactive guides for all plans, and priority support for Medium and Large tiers.</p>
                        </div>
                        <div className={styles.faqCard}>
                            <h4>Can I switch plans later?</h4>
                            <p>Absolutely. You can upgrade or downgrade your plan at any time through your dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={styles.ctaFooter}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Ready to Go Native?</h2>
                    <p className={styles.sectionSubtitle}>Join 1,200+ creators building the future.</p>
                    <Link href="/builder" className={styles.primaryButton}>
                        Start Your Free Trial
                    </Link>
                    <div className={styles.footerLinks}>
                        <Link href="/terms" className={styles.footerLink}>Terms</Link>
                        <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
                        <Link href="/support" className={styles.footerLink}>Support</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
