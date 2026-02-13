import React, { useState } from "react";
import styles from "./PublishForm.module.css";
import { Button } from "./ui/Button";
import {
    Apple,
    Play,
    Check,
    Download,
    ExternalLink,
    ClipboardList,
    Smartphone,
    ArrowLeft,
    Fingerprint,
    Copy,
    Lock,
    CloudUpload,
    RefreshCw,
    Video
} from "lucide-react";
import { clsx } from "clsx";
import { Simulator } from "./Simulator";

interface PublishFormProps {
    onBack: () => void;
    currentPlatform: "ios" | "android";
    appName: string;
    // Prop to control simulator from here
    setSimProps: (props: any) => void;
}

interface GuideItem {
    title: string;
    description: string;
    link: string;
    videoLink?: string;
}

export function PublishForm({ onBack, currentPlatform, appName, setSimProps }: PublishFormProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<"ios" | "android" | "both">(currentPlatform);
    const [isScreenshotMode, setIsScreenshotMode] = useState(false);

    // Identity State
    const [bundleId, setBundleId] = useState(() => {
        const sanitized = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
        return `com.convertwebapp.${sanitized || 'myapp'}`;
    });

    // Screenshot Sizes
    const SIZES = [
        { id: "iphone65", name: "iPhone 6.5\"", width: 1284, height: 2778, platform: "ios" as const },
        { id: "iphone55", name: "iPhone 5.5\"", width: 1242, height: 2208, platform: "ios" as const },
        { id: "ipad129", name: "iPad 12.9\"", width: 2048, height: 2732, platform: "ipad" as const },
    ];

    const [selectedSize, setSelectedSize] = useState(SIZES[0]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const startAutoUpload = () => {
        setUploadStatus("uploading");
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStatus("success");
                    return 100;
                }
                return prev + 5;
            });
        }, 150);
    };

    const toggleScreenshotMode = (enabled: boolean) => {
        setIsScreenshotMode(enabled);
        if (enabled) {
            setSimProps({
                isScreenshotMode: true,
                screenshotSize: { width: selectedSize.width, height: selectedSize.height },
                platform: selectedSize.platform
            });
        } else {
            setSimProps({
                isScreenshotMode: false,
                platform: currentPlatform
            });
        }
    };

    const handleSizeChange = (size: typeof SIZES[0]) => {
        setSelectedSize(size);
        if (isScreenshotMode) {
            setSimProps({
                isScreenshotMode: true,
                screenshotSize: { width: size.width, height: size.height },
                platform: size.platform
            });
        }
    };

    const captureScreenshot = () => {
        setIsCapturing(true);
        // Mock capture delay
        setTimeout(() => {
            setIsCapturing(false);
            alert(`Screenshot captured: ${selectedSize.name} (${selectedSize.width}x${selectedSize.height})\n\nIn the full version, this would download the high-res image.`);
        }, 1000);
    };

    const copyBundleId = () => {
        navigator.clipboard.writeText(bundleId);
        alert("Bundle ID copied to clipboard!");
    };

    const guides: { ios: GuideItem[]; android: GuideItem[] } = {
        ios: [
            {
                title: "Apple Developer Account",
                description: "Enroll in the Apple Developer Program ($99/year) to publish on the App Store.",
                link: "https://developer.apple.com/programs/enroll/"
            },
            {
                title: "App Store Connect",
                description: "Create a new app record in App Store Connect using your bundle ID.",
                link: "https://appstoreconnect.apple.com/",
                videoLink: "https://www.youtube.com/watch?v=Qgq6jsRtfbA&t=222s"
            },
            {
                title: "App Assets",
                description: "Prepare screenshots (iPhone 6.5\" and 5.5\"), app icon (1024x1024), and description.",
                link: "#"
            },
            {
                title: "Build Upload",
                description: "Upload your .ipa build using Xcode or Transporter app on Mac.",
                link: "#"
            }
        ],
        android: [
            {
                title: "Google Play Console Account",
                description: "Create a Google Play Console account ($25 one-time fee).",
                link: "https://play.google.com/console/signup",
                videoLink: "https://youtu.be/F74CNRDoiaY?si=KaNQbru5vdrFC3t6"
            },
            {
                title: "Google Play Store Listing",
                description: "Fill out app details, category, contact info, and store assets (icons, screenshots).",
                link: "#"
            },
            {
                title: "App Integrity & Bundle",
                description: "Upload your .aab (App Bundle) file to the Production track.",
                link: "#"
            },
            {
                title: "Review & Release",
                description: "Submit your app for review. Google typically reviews in 2-4 days.",
                link: "#"
            }
        ]
    };

    // Helper to get YouTube embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        let videoId = "";
        if (url.includes("v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        }
        const startMatch = url.match(/[?&]t=(\d+)s?/);
        const startTime = startMatch ? startMatch[1] : (url.includes("start=") ? url.split("start=")[1].split("&")[0] : "0");
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;
    };

    // Checklist State
    const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

    const toggleStep = (platform: string, index: number, isVideo: boolean = false) => {
        const key = isVideo ? `${platform}-${index}-video` : `${platform}-${index}`;
        setCompletedSteps(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const currentGuide = (selectedPlatform === "ios" || selectedPlatform === "both") ? guides.ios : guides.android;
    const platformKey = (selectedPlatform === "ios" || selectedPlatform === "both") ? "ios" : "android";

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h2 className={styles.title}>Ready to Publish</h2>
                    <span className={styles.badge}>Step 4</span>
                </div>
                <p className={styles.subtitle}>Follow our guide to get your app onto the stores.</p>
            </div>

            <div className={styles.platformSelection}>
                <div
                    className={clsx(styles.platformCard, (selectedPlatform === "ios" || selectedPlatform === "both") && styles.selected)}
                    onClick={() => setSelectedPlatform("ios")}
                >
                    <Apple className={styles.platformIcon} />
                    <span className={styles.platformName}>Apple iOS</span>
                </div>
                <div
                    className={clsx(styles.platformCard, selectedPlatform === "android" && styles.selected)}
                    onClick={() => setSelectedPlatform("android")}
                >
                    <Play className={styles.platformIcon} />
                    <span className={styles.platformName}>Google Play</span>
                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <div className={styles.identitySection}>
                    <h3 className={styles.guideTitle}><Fingerprint size={20} color="var(--primary)" /> App Identity</h3>
                    <label className={styles.label}>Bundle ID / Package Name</label>
                    <div className={styles.bundleInputGroup}>
                        <input
                            type="text"
                            value={bundleId}
                            onChange={(e) => setBundleId(e.target.value)}
                            className={styles.miniInput}
                            placeholder="com.company.app"
                        />
                        <Button variant="ghost" size="sm" onClick={copyBundleId}>
                            <Copy size={16} />
                        </Button>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--foreground-muted)', marginTop: '0.5rem' }}>
                        This is the unique identifier for your app on the App Store and Google Play.
                    </p>
                </div>

                {/* Section Connector Line */}
                <div style={{ position: 'absolute', left: '2.5rem', top: '100%', bottom: '-1rem', width: '2px', background: 'rgba(255, 255, 255, 0.05)', zIndex: 0 }}></div>
            </div>

            <div style={{ position: 'relative' }}>
                <div className={styles.guideSection}>
                    <h3 className={styles.guideTitle}>
                        <ClipboardList size={20} color="var(--primary)" />
                        {platformKey === "ios" ? "iOS Publishing Guide" : "Google Play Guide"}
                    </h3>

                    <ul className={styles.checklist}>
                        {currentGuide.map((step, i) => {
                            const isCompleted = completedSteps[`${platformKey}-${i}`];
                            return (
                                <li key={i} className={styles.checkItem} onClick={() => toggleStep(platformKey, i)} style={{ cursor: 'pointer' }}>
                                    <div className={clsx(styles.checkBullet, isCompleted && styles.completed)}>
                                        {isCompleted && <Check size={12} />}
                                    </div>
                                    <div className={styles.itemContent}>
                                        <div className={styles.itemTitle} style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.6 : 1 }}>{step.title}</div>
                                        <p className={styles.itemDescription} style={{ opacity: isCompleted ? 0.6 : 1 }}>{step.description}</p>
                                        {step.link && step.link !== "#" && (
                                            <a
                                                href={step.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ color: 'var(--primary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}
                                            >
                                                Visit Site <ExternalLink size={10} />
                                            </a>
                                        )}
                                        {step.videoLink && (
                                            <div className={styles.tutorialBox} onClick={(e) => e.stopPropagation()}>
                                                <div className={styles.tutorialHeader}>
                                                    <Video size={14} color="var(--primary)" /> Video Tutorial
                                                </div>
                                                <p className={styles.tutorialDescription}>
                                                    Learn how to set up your account and publish step-by-step.
                                                </p>

                                                {activeVideo === step.videoLink ? (
                                                    <div className={styles.videoWrapper}>
                                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
                                                            <iframe
                                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                                src={getYouTubeEmbedUrl(step.videoLink)}
                                                                title="YouTube video player"
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                        <button
                                                            onClick={() => setActiveVideo(null)}
                                                            style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                                                        >
                                                            Close Video
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={styles.tutorialAction}
                                                        onClick={() => setActiveVideo(step.videoLink!)}
                                                    >
                                                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Play size={8} fill="currentColor" style={{ marginLeft: '1px' }} />
                                                        </div>
                                                        Watch Tutorial
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Section Connector Line */}
                <div style={{ position: 'absolute', left: '2.5rem', top: '100%', bottom: '-2rem', width: '2px', background: 'rgba(255, 255, 255, 0.05)', zIndex: 0 }}></div>
            </div>

            <div className={styles.autoUploadSection}>
                <h3 className={styles.guideTitle}>
                    <CloudUpload size={20} color="var(--primary)" />
                    Store Auto-Upload
                </h3>
                <p className={styles.itemDescription} style={{ marginBottom: '1rem' }}>
                    Automatically submit your production build to App Store Connect & Google Play Console.
                </p>

                {uploadStatus === "idle" ? (
                    <Button
                        variant="outline"
                        onClick={startAutoUpload}
                        className="w-full"
                    >
                        Start Auto-Upload Simulation
                    </Button>
                ) : (
                    <div className={styles.progressBox}>
                        <div className={styles.progressInfo}>
                            <span>{uploadStatus === "uploading" ? "Uploading to Stores..." : "Upload Successful!"}</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        {uploadStatus === "success" && (
                            <p className={styles.successNote}>
                                <Check size={14} /> Your app has been submitted for review.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.screenshotSection}>
                <h3 className={styles.guideTitle}>
                    <Smartphone size={20} color="var(--primary)" />
                    Screenshot Generator
                </h3>
                <p className={styles.itemDescription} style={{ marginBottom: '1rem' }}>
                    Capture high-quality screenshots in required App Store sizes.
                </p>

                <div className={styles.sizeGrid}>
                    {SIZES.map(size => (
                        <div
                            key={size.id}
                            className={clsx(styles.sizeCard, selectedSize.id === size.id && styles.selectedSize)}
                            onClick={() => handleSizeChange(size)}
                        >
                            <span className={styles.sizeName}>{size.name}</span>
                            <span className={styles.sizeRes}>{size.width}x{size.height}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.screenshotActions}>
                    <Button
                        variant={isScreenshotMode ? "primary" : "outline"}
                        onClick={() => toggleScreenshotMode(!isScreenshotMode)}
                        style={{ width: '100%' }}
                    >
                        {isScreenshotMode ? "Exit Screenshot Mode" : "Enter Screenshot Mode"}
                    </Button>

                    {isScreenshotMode && (
                        <Button
                            className={styles.captureBtn}
                            onClick={captureScreenshot}
                            disabled={isCapturing}
                            style={{ width: '100%' }}
                        >
                            {isCapturing ? "Capturing..." : "Capture Screenshot"}
                        </Button>
                    )}
                </div>
            </div>


            <div className={styles.footer}>
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
                <Link href="/" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, alignSelf: 'center' }}>
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

// Dummy Link component if not using Next.js Link in this context, 
// though we usually do. Added for safety or use Next Link.
import NextLink from 'next/link';
const Link = NextLink;
