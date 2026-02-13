"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { clsx } from 'clsx';
import {
  Globe,
  Palette,
  PlayCircle,
  Smartphone,
  Zap,
  Shield,
  MessageSquare,
  Layout,
  Check,
  ArrowRight,
  ClipboardCheck,
  Video,
  MonitorSmartphone,
  Layers,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <main className={styles.main}>
      <header className={styles.navHeader}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>ConvertWebApp</div>

          {/* Desktop Nav */}
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/pricing" className={styles.navLink}>Pricing</Link>
            <a href="mailto:tha@vailamtahministry.com" className={styles.navLink}>Contact</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNavLinks}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/pricing" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <a href="mailto:tha@vailamtahministry.com" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <Link href="/builder" className={styles.primaryButton} onClick={() => setIsMobileMenuOpen(false)} style={{ marginTop: '2rem', width: '100%' }}>
            Start Building
          </Link>
        </nav>
      </div>
      <div className={styles.motionBackground}>
        <div className={clsx(styles.blob, styles.blob1)} />
        <div className={clsx(styles.blob, styles.blob2)} />
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.badge}>Next-Gen App Builder</div>
              <h1 className={styles.heroTitle}>
                {/* Mobile responsive title */}
                ConvertWebApp
              </h1>
              <p className={styles.heroSubtitle}>
                Transform your website into a premium native mobile app instantly.
                Automated publishing, real-time simulation, and professional branding at your fingertips.
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/builder" className={styles.primaryButton}>
                  Start Building Now
                </Link>
                <Link href="#features" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  color: 'var(--foreground)'
                }}>
                  View Features <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className={styles.phoneContainer}>
              <div className={styles.phoneFrame}>
                <div className={styles.notch} />
                <div className={styles.phoneInner}>
                  <div className={styles.phoneScreen}>
                    <div style={{ height: '40px', width: '40px', background: 'var(--primary)', borderRadius: '12px', opacity: 0.8 }} />
                    <div style={{ height: '10px', width: '80%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }} />
                    <div style={{ height: '10px', width: '50%', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', marginBottom: '1rem' }} />

                    <div style={{ height: '120px', width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }} />
                      <div style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className={styles.valuePropSection}>
        <div className={styles.container}>
          <h2 className={styles.centeredValueProp}>
            Your Website,<br />Now a <span className={styles.gradientText}>Native Experience</span>
          </h2>
        </div>
      </section>

      {/* Simplified Pricing/Plans CTA Section */}
      <section id="pricing" className={styles.section} style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05), transparent)' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Built for Growth</h2>
            <p className={styles.sectionSubtitle}>Simple, transparent plans designed to scale with your ambition.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '-2rem' }}>
            <Link href="/pricing" className={styles.primaryButton}>
              View All Plans & Features
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works - Glassmorphism */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Path to Success</h2>
            <p className={styles.sectionSubtitle}>A streamlined process designed for efficiency.</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.glassCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}><Globe size={24} /></div>
              <h3 className={styles.stepTitle}>Connect URL</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem' }}>
                Our intelligent engine analyzes your site for a seamless, mobile-optimized experience.
              </p>
            </div>

            <div className={styles.glassCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}><Palette size={24} /></div>
              <h3 className={styles.stepTitle}>Real-time Designer</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem' }}>
                Customize navigation, themes, and branding in our live, interactive emulator.
              </p>
            </div>

            <div className={styles.glassCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}><ClipboardCheck size={24} /></div>
              <h3 className={styles.stepTitle}>Guided Release</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem' }}>
                Step-by-step interactive checklists and automation make publishing to App Stores effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className={styles.section} style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Premium Features</h2>
            <p className={styles.sectionSubtitle}>Standard on every build. No compromises.</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <MonitorSmartphone className={styles.stepIcon} size={24} />
              <h3 className={styles.stepTitle}>Interactive Simulator</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                Visualize your changes instantly on iOS and Android devices as you build.
              </p>
            </div>
            <div className={styles.featureCard}>
              <ClipboardCheck className={styles.stepIcon} size={24} />
              <h3 className={styles.stepTitle}>Smart Guides</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                Interactive publishing checklists for App Store and Google Play compliance.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Video className={styles.stepIcon} size={24} />
              <h3 className={styles.stepTitle}>Video Tutorials</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                Integrated step-by-step video guidance throughout the entire publishing process.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Shield className={styles.stepIcon} size={24} />
              <h3 className={styles.stepTitle}>Auto-Upload Ready</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                Support for automated build distribution and App Store Connect integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase / Tour */}
      <section className={styles.section} style={{ paddingTop: '2rem' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Experience the Platform</h2>
            <p className={styles.sectionSubtitle}>A powerful, end-to-end builder at your fingertips.</p>
          </div>

          <div className={styles.showcaseGrid}>
            <div className={styles.showcaseItem}>
              <div className={styles.mockupHeader}>
                <div className={styles.dot} style={{ background: '#ff5f56' }} />
                <div className={styles.dot} style={{ background: '#ffbd2e' }} />
                <div className={styles.dot} style={{ background: '#27c93f' }} />
                <span className={styles.mockupTitle}>Step 1: App Config</span>
              </div>
              <div className={styles.mockupContent}>
                <Layers size={40} color="var(--primary)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                <div style={{ height: '8px', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '1.5rem' }} />
                <div className={styles.mockupButton}>Configure Build</div>
              </div>
              <div className={styles.showcaseText}>
                <h4>Smart Builder</h4>
                <p>Automated URL ingestion and platform configuration.</p>
              </div>
            </div>

            <div className={styles.showcaseItem}>
              <div className={styles.mockupHeader}>
                <div className={styles.dot} style={{ background: '#ff5f56' }} />
                <div className={styles.dot} style={{ background: '#ffbd2e' }} />
                <div className={styles.dot} style={{ background: '#27c93f' }} />
                <span className={styles.mockupTitle}>Step 2: Brand Identity</span>
              </div>
              <div className={styles.mockupContent}>
                <Palette size={40} color="var(--accent)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)' }} />
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', opacity: 0.2 }} />
                </div>
                <div className={styles.mockupButton} style={{ background: 'var(--accent)' }}>Live Preview</div>
              </div>
              <div className={styles.showcaseText}>
                <h4>Real-time Designer</h4>
                <p>Customize every pixel while watching changes live.</p>
              </div>
            </div>

            <div className={styles.showcaseItem}>
              <div className={styles.mockupHeader}>
                <div className={styles.dot} style={{ background: '#ff5f56' }} />
                <div className={styles.dot} style={{ background: '#ffbd2e' }} />
                <div className={styles.dot} style={{ background: '#27c93f' }} />
                <span className={styles.mockupTitle}>Step 4: Launch Center</span>
              </div>
              <div className={styles.mockupContent}>
                <ClipboardCheck size={40} color="#10b981" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                <div style={{ width: '100%', gap: '0.4rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }} />
                  <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }} />
                  <div style={{ height: '6px', width: '70%', background: 'rgba(16,185,129,0.2)', borderRadius: '3px' }} />
                </div>
              </div>
              <div className={styles.showcaseText}>
                <h4>Guided Publishing</h4>
                <p>Interactive checklists and video tutorials for stores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Momentum Stats Section */}
      <section className={styles.section} style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className={styles.container}>
          <div className={styles.momentumGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>1,250+</div>
              <div className={styles.statLabel}>Apps Published</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>99.9%</div>
              <div className={styles.statLabel}>Store Approval</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>8ms</div>
              <div className={styles.statLabel}>Native Latency</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>24/7</div>
              <div className={styles.statLabel}>Priority Support</div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer CTA */}
      <section className={styles.ctaFooter}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Build your future, today.</h2>
          <p className={styles.heroSubtitle} style={{ marginBottom: '3rem' }}>
            The fastest way to reach your customers on their favorite platform.
          </p>
          <Link href="/builder" className={styles.primaryButton} style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
            Create Your App
          </Link>
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--foreground-muted)' }}>
        <p style={{ marginBottom: '1rem' }}>&copy; {new Date().getFullYear()} ConvertWebApp. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/support" style={{ color: 'inherit', textDecoration: 'none' }}>Support</Link>
        </div>
      </footer>
    </main>
  );
}
