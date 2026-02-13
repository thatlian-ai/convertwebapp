import { clsx } from "clsx";
import { Smartphone, Tablet } from "lucide-react"; // Fallback icons if needed, but we draw frames
import styles from "./Simulator.module.css";

interface SimulatorProps {
    url: string;
    platform: "ios" | "android";
}

export function Simulator({ url, platform }: SimulatorProps) {
    return (
        <div className={styles.container}>
            {/* Device Frame */}
            <div className={clsx(styles.device, styles[platform])}>
                {/* Notch / Camera (simplified) */}
                <div className={styles.notch}></div>

                {/* Screen Content */}
                <div className={styles.screen}>
                    {url ? (
                        <iframe
                            src={url}
                            className={styles.iframe}
                            title="App Preview"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                    ) : (
                        <div className={styles.placeholder}>
                            <p>Enter a URL to preview</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
