import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import styles from "./BuilderForm.module.css";
import { clsx } from "clsx";

interface BuilderFormProps {
    url: string;
    setUrl: (url: string) => void;
    appName: string;
    setAppName: (name: string) => void;
    platform: "ios" | "android";
    setPlatform: (platform: "ios" | "android") => void;
    onBuild: () => void;
    isBuilding: boolean;
    urlError?: string | null;
    urlWarning?: string | null;
    isValidating?: boolean;
}

export function BuilderForm({
    url,
    setUrl,
    appName,
    setAppName,
    platform,
    setPlatform,
    onBuild,
    isBuilding,
    urlError,
    urlWarning,
    isValidating
}: BuilderFormProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>App Configuration</h2>
                <p className={styles.subtitle}>Configure your app settings below.</p>
            </div>

            <div className={styles.formGroup}>
                <Input
                    label="Website URL"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error={urlError || undefined}
                />
                {isValidating && <span className="text-xs text-muted-foreground" style={{ marginTop: '0.25rem', color: 'var(--foreground-muted)' }}>Validating URL...</span>}

                {!urlError && urlWarning && (
                    <div style={{
                        padding: '0.75rem',
                        marginTop: '0.5rem',
                        fontSize: '0.75rem',
                        color: '#eab308',
                        background: 'rgba(234, 179, 8, 0.1)',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                        borderRadius: 'var(--radius)'
                    }}>
                        ⚠️ {urlWarning}
                    </div>
                )}
            </div>

            <div className={styles.formGroup}>
                <Input
                    label="App Name"
                    placeholder="My App"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Platform</label>
                <div className={styles.toggleGroup}>
                    <button
                        className={clsx(styles.toggleButton, platform === "ios" && styles.active)}
                        onClick={() => setPlatform("ios")}
                    >
                        iOS
                    </button>
                    <button
                        className={clsx(styles.toggleButton, platform === "android" && styles.active)}
                        onClick={() => setPlatform("android")}
                    >
                        Android
                    </button>
                </div>
            </div>

            <div className={styles.footer}>
                <Button
                    variant="primary"
                    size="lg"
                    className={styles.buildButton}
                    onClick={onBuild}
                    isLoading={isBuilding}
                    disabled={!!urlError || isValidating || !url || !appName}
                >
                    {isBuilding ? "Building App..." : "Build App"}
                </Button>
            </div>
        </div>
    );
}
