"use client";

import { useState, useEffect } from "react";
import { BuilderForm } from "@/components/BuilderForm";
import { Simulator } from "@/components/Simulator";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function BuilderPage() {
    const [url, setUrl] = useState("https://example.com");
    const [appName, setAppName] = useState("My App");
    const [platform, setPlatform] = useState<"ios" | "android">("ios");
    const [isBuilding, setIsBuilding] = useState(false);

    // Validation state
    const [urlError, setUrlError] = useState<string | null>(null);
    const [urlWarning, setUrlWarning] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);

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
            setUrlWarning(null);
            return;
        }

        // Basic format check
        if (!urlToTest.match(/^https?:\/\//)) {
            setUrlError("URL must start with http:// or https://");
            setUrlWarning(null);
            return;
        }

        setIsValidating(true);
        setUrlError(null);
        setUrlWarning(null);

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
                setUrlWarning("This website blocks embedding (X-Frame-Options). It might not work in the preview simulator, but the app build should still work.");
            }
        } catch (e) {
            setUrlError("Failed to validate URL.");
        } finally {
            setIsValidating(false);
        }
    };

    const handleBuild = () => {
        setIsBuilding(true);
        // Simulate build process
        setTimeout(() => {
            setIsBuilding(false);
            alert(`Build complete for ${platform}! (Mock)\n\nIn a real version, this would trigger a backend job to generate the ${platform === 'ios' ? 'IPA' : 'APK'}.`);
        }, 3000);
    };

    return (
        <main className={styles.main}>
            {/* Left Panel: Configuration */}
            <BuilderForm
                url={url}
                setUrl={setUrl}
                appName={appName}
                setAppName={setAppName}
                platform={platform}
                setPlatform={setPlatform}
                onBuild={handleBuild}
                isBuilding={isBuilding}
                urlError={urlError}
                urlWarning={urlWarning}
                isValidating={isValidating}
            />

            {/* Right Panel: Simulator */}
            <div className={styles.simulatorContainer}>
                <div className={styles.backButton}>
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>
                <Simulator url={url} platform={platform} />
            </div>
        </main>
    );
}
