'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { clsx } from 'clsx';
import { MessageSquare, Mail, Phone, HelpCircle, ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
    const [submitted, setSubmitted] = useState(false);
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
        { role: 'bot', text: 'Hey there! 👋 I\'m your ConvertWebApp helper! I\'d love to help you build something amazing today. What\'s on your mind? 😊' }
    ]);
    const [chatInput, setChatInput] = useState('');

    const knowledgeBase = [
        { keywords: ['small'], response: 'Our Small plan ($29/mo) is perfect for blogs and portfolios. It includes native builds and basic customization! 📝' },
        { keywords: ['medium', 'popular'], response: 'The Medium plan ($49/mo) is our most popular! 🌟 Includes a 5-day trial, unlimited push, and priority store review. Great for growth! 📈' },
        { keywords: ['large', 'enterprise'], response: 'The Large plan ($99/mo) is for scale! 🏢 Includes 24/7 phone support, white-labeling, and expert-managed publishing! 👑' },
        { keywords: ['hello', 'hi', 'hey', 'greetings', 'yo', 'morning', 'evening'], response: 'Hi there! It\'s so wonderful to meet you! How can I make your day better? ✨' },
        { keywords: ['price', 'cost', 'plan', 'subscription', 'monthly', 'pay', 'buy', 'dollar', 'amount', 'tier'], response: 'Great question! We have three simple plans: Small ($29/mo), Medium ($49/mo), and Large ($99/mo). All include native builds! 🚀 Which one sounds right for you?' },
        { keywords: ['trial', 'free', 'test', 'try', 'demo', '5-day', '5 day'], response: 'Of course! We offer a 5-day free trial on our Medium and Large plans so you can see your app in action before you buy! 🎁' },
        { keywords: ['ios', 'android', 'apple', 'google', 'store', 'publish', 'release', 'launch', 'live'], response: 'We handle it all! 📱 We support publishing to both Apple App Store and Google Play Store. On the Large plan, we even manage the whole submission for you! 🌟' },
        { keywords: ['push', 'notification', 'alert'], response: 'Stay connected! 🔔 Push notifications are available on Medium (5/mo) and Large (unlimited!) plans. Great for engagement! 📈' },
        { keywords: ['support', 'help', 'contact', 'email', 'reach', 'talk'], response: 'We\'re here for you! 🤗 Reach us at tha@vailamtahministry.com. Priority support is included with Medium and Large plans! ⚡' },
        { keywords: ['white', 'brand', 'label', 'logo', 'custom'], response: 'Make it yours! 🎨 White-labeling and full custom branding are available on our Large plan. Build a unique brand! 💎' },
        { keywords: ['how', 'work', 'process', 'step', 'start', 'build'], response: 'It\'s easy! 🛠️ 1. Connect your URL, 2. Customize in our live designer, 3. Follow our guided release. You\'ll be live in no time! ✨' },
        { keywords: ['time', 'long', 'fast', 'speed', 'wait', 'duration'], response: 'Lightning fast! ⚡ Build generation is instant. App Store reviews usually take 1-3 business days. We help you every step of the way! ⏱️' },
        { keywords: ['update', 'change', 'sync'], response: 'Instantly! 🔄 Update your website and your app syncs automatically. No need for a new build for most changes! 🚀' },
    ];

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput.trim().toLowerCase();
        const newMessages = [...chatMessages, { role: 'user' as const, text: chatInput }];

        let botResponse = "Hmm, I'm not quite sure about that one, but I'd love to find out for you! 💖 You can chat with our friendly team directly at tha@vailamtahministry.com — we're always happy to help! 🚀";

        for (const item of knowledgeBase) {
            if (item.keywords.some(k => userMsg.includes(k))) {
                botResponse = item.response;
                break;
            }
        }

        setChatMessages([...newMessages, { role: 'bot' as const, text: botResponse }]);
        setChatInput('');
    };

    return (
        <main className={styles.main}>
            {/* ... motion background and header remain the same ... */}
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
                    <h1 className={styles.title}>Help & <span className={styles.gradientText}>Support</span></h1>
                    <p className={styles.subtitle}>We're here to help you launch your dream app.</p>
                </div>

                <div className={styles.supportGrid}>
                    <div className={styles.contactSection}>
                        {/* Support Form */}
                        <div className={styles.glassCard}>
                            <h3>Get in Touch</h3>
                            {!submitted ? (
                                <form
                                    className={styles.form}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setSubmitted(true);
                                    }}
                                >
                                    <div className={styles.inputGroup}>
                                        <input type="text" name="name" placeholder="Your Name" className={styles.input} required />
                                        <input type="email" name="email" placeholder="Email Address" className={styles.input} required />
                                    </div>
                                    <textarea name="message" placeholder="How can we help?" className={styles.textarea} required></textarea>
                                    <button type="submit" className={styles.submitButton}>
                                        Send Message <Send size={16} />
                                    </button>
                                </form>
                            ) : (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}><MessageSquare size={32} /></div>
                                    <h4>Message Sent!</h4>
                                    <p>Your message has been sent to <strong>tha@vailamtahministry.com</strong>. Our team will get back to you within 24 hours.</p>
                                    <button onClick={() => setSubmitted(false)} className={styles.resetButton}>Send another message</button>
                                </div>
                            )}
                        </div>

                        {/* Chat with Us (Replaces Email Us) */}
                        <div className={clsx(styles.glassCard, styles.chatCard)} style={{ marginTop: '1.5rem' }}>
                            <div className={styles.chatHeader}>
                                <div className={styles.chatTitle}>
                                    <MessageSquare size={18} /> Chat with Us
                                </div>
                                <div className={styles.onlineStatus}>Online</div>
                            </div>
                            <div className={styles.chatWindow}>
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={clsx(styles.message, msg.role === 'bot' ? styles.botMsg : styles.userMsg)}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <form className={styles.chatInputGroup} onSubmit={handleChatSubmit}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className={styles.chatInput}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                />
                                <button type="submit" className={styles.chatSendBtn}><Send size={16} /></button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.faqSection}>
                        <div className={styles.quickContact} style={{ marginBottom: '2.5rem' }}>
                            <div className={styles.contactItem} style={{ border: '1px solid rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.05)' }}>
                                <div className={styles.contactIcon}><Mail size={20} /></div>
                                <div>
                                    <span className={styles.contactLabel}>Priority Support</span>
                                    <span className={styles.contactValue}>tha@vailamtahministry.com</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.faqCard}>
                            <div className={styles.faqIcon}><HelpCircle size={24} /></div>
                            <h4>Frequently Asked Questions</h4>
                            <div className={styles.faqList}>
                                <div className={styles.faqItem}>
                                    <h5>How long does verification take?</h5>
                                    <p>Initial builds are processed in minutes. App Store review typically takes 1-3 business days.</p>
                                </div>
                                <div className={styles.faqItem}>
                                    <h5>Can I update my app after launch?</h5>
                                    <p>Yes! Simply update your website and the changes sync instantly. For native UI changes, you can trigger a new build.</p>
                                </div>
                                <div className={styles.faqItem}>
                                    <h5>What if my app gets rejected?</h5>
                                    <p>Our "Large" plan includes white-glove assistance to fix any compliance issues for a guaranteed launch.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} ConvertWebApp. All rights reserved.</p>
            </footer>
        </main>
    );
}
