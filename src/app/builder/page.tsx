"use client";

import { useState, useEffect } from "react";
import { BuilderForm } from "@/components/BuilderForm";
import { Simulator } from "@/components/Simulator";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

import { DesignForm, NavStyle } from "@/components/DesignForm";
import { PaymentForm, PlanType } from "@/components/PaymentForm";
import { PublishForm } from "@/components/PublishForm";
import { MenuItem } from "@/components/MenuBuilder";

export default function BuilderPage() {
    // Step state: 1 = Config, 2 = Design, 3 = Payment, 4 = Publish
    const [step, setStep] = useState(1);

    // Config state
    const [url, setUrl] = useState("");
    const [appName, setAppName] = useState("");
    const [platform, setPlatform] = useState<"ios" | "android" | "ipad">("ios");

    // Design state
    const [navStyle, setNavStyle] = useState<NavStyle>("none");
    const [navPosition, setNavPosition] = useState<"left" | "right">("left");
    const [primaryColor, setPrimaryColor] = useState("#6366f1");
    const [showAppName, setShowAppName] = useState(true);
    const [showFooterNav, setShowFooterNav] = useState(true);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [logoUrl, setLogoUrl] = useState("");
    const [drawerHeaderStyle, setDrawerHeaderStyle] = useState<"solid" | "transparent">("solid");

    const [subscriptionMode, setSubscriptionMode] = useState<"trial" | "paid">("trial");
    const [isBuilding, setIsBuilding] = useState(false);

    // Validation state
    const [urlError, setUrlError] = useState<string | null>(null);
    const [useProxy, setUseProxy] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    // Screenshot / Simulator Overrides
    const [simProps, setSimProps] = useState<any>({});

    // Debounce validation
    useEffect(() => {
        const timer = setTimeout(() => {
            validateUrl(url);
        }, 800);

        return () => clearTimeout(timer);
    }, [url]);

    const validateUrl = async (urlToTest: string) => {
        if (!urlToTest) {
            setUrlError(null);
            setUseProxy(false);
            return;
        }

        if (!urlToTest.match(/^https?:\/\//)) {
            setUrlError("URL must start with http:// or https://");
            setUseProxy(false);
            return;
        }

        setIsValidating(true);
        setUrlError(null);
        setUseProxy(false);

        try {
            const res = await fetch("/api/validate-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: urlToTest }),
            });
            const data = await res.json();

            if (!data.valid) {
                setUrlError("URL is not reachable or valid.");
            } else if (!data.canEmbed) {
                setUseProxy(true);
            }
        } catch (e) {
            setUrlError("Failed to validate URL.");
        } finally {
            setIsValidating(false);
        }
    };

    const handleBack = () => {
        if (step === 4) {
            setStep(3);
            setSimProps({}); // Reset overrides
        } else if (step === 3) {
            setStep(2);
        } else if (step === 2) {
            setStep(1);
        }
    };

    const handleNext = () => {
        setStep(2);
    };

    const handleBuild = () => {
        setStep(3);
    };

    const handlePaymentComplete = (plan: PlanType) => {
        setIsBuilding(true);
        // Mock: Small/Medium are trial, Large is paid instantly for demo purposes
        setSubscriptionMode(plan === 'large' ? 'paid' : 'trial');

        // Simulate build process after payment
        setTimeout(() => {
            setIsBuilding(false);
            setStep(4); // Move to Publish step
        }, 3000);
    };

    // Helper for Base64 URL encoding (client-side)
    const encodeBase64Url = (str: string) => {
        try {
            return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        } catch (e) {
            return "";
        }
    };

    const previewUrl = useProxy ? `/api/proxy/${encodeBase64Url(url)}/` : url;

    return (
        <main className={styles.main}>
            {/* Left Panel: Configuration wizard */}
            <div className={styles.leftPanel}>
                {step === 1 && (
                    <BuilderForm
                        url={url}
                        setUrl={setUrl}
                        appName={appName}
                        setAppName={setAppName}
                        platform={platform === 'ipad' ? 'ios' : platform} // Fallback for UI if needed
                        setPlatform={(p) => setPlatform(p as any)}
                        onBuild={handleNext}
                        isBuilding={false}
                        urlError={urlError}
                        isValidating={isValidating}
                    />
                )}
                {step === 2 && (
                    <DesignForm
                        navStyle={navStyle}
                        setNavStyle={setNavStyle}
                        navPosition={navPosition}
                        setNavPosition={setNavPosition}
                        primaryColor={primaryColor}
                        setPrimaryColor={setPrimaryColor}
                        showAppName={showAppName}
                        setShowAppName={setShowAppName}
                        showFooterNav={showFooterNav}
                        setShowFooterNav={setShowFooterNav}
                        menuItems={menuItems}
                        setMenuItems={setMenuItems}
                        logoUrl={logoUrl}
                        setLogoUrl={setLogoUrl}
                        drawerHeaderStyle={drawerHeaderStyle}
                        setDrawerHeaderStyle={setDrawerHeaderStyle}
                        onBack={handleBack}
                        onBuild={handleBuild}
                        isBuilding={isBuilding}
                    />
                )}
                {step === 3 && (
                    <PaymentForm
                        onBack={handleBack}
                        onComplete={handlePaymentComplete}
                        isProcessing={isBuilding}
                    />
                )}
                {step === 4 && (
                    <PublishForm
                        onBack={handleBack}
                        currentPlatform={platform === 'ipad' ? 'ios' : platform}
                        appName={appName}
                        setSimProps={setSimProps}
                    />
                )}
            </div>

            {/* Right Panel: Simulator */}
            <div className={styles.simulatorContainer}>
                <div className={styles.backButton}>
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
                <Simulator
                    url={previewUrl}
                    platform={simProps.platform || platform}
                    navStyle={navStyle}
                    navPosition={navPosition}
                    primaryColor={primaryColor}
                    appName={appName}
                    showAppName={showAppName}
                    showFooterNav={showFooterNav}
                    menuItems={menuItems}
                    logoUrl={logoUrl}
                    drawerHeaderStyle={drawerHeaderStyle}
                    isScreenshotMode={simProps.isScreenshotMode}
                    screenshotSize={simProps.screenshotSize}
                />
            </div>
        </main>
    );
}
