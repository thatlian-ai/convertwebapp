
import { Button } from "./ui/Button";
import styles from "./BuilderForm.module.css"; // Reusing form styles for consistency
import { clsx } from "clsx";
import { LayoutGrid, Menu, Smartphone, Upload } from "lucide-react";

import { MenuBuilder, MenuItem } from "./MenuBuilder";

export type NavStyle = "none" | "tabbar" | "drawer";

interface DesignFormProps {
    navStyle: NavStyle;
    setNavStyle: (style: NavStyle) => void;
    navPosition: "left" | "right";
    setNavPosition: (pos: "left" | "right") => void;
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    showAppName: boolean;
    setShowAppName: (show: boolean) => void;
    showFooterNav: boolean;
    setShowFooterNav: (show: boolean) => void;
    menuItems: MenuItem[];
    setMenuItems: (items: MenuItem[]) => void;
    logoUrl: string;
    setLogoUrl: (url: string) => void;
    drawerHeaderStyle: "solid" | "transparent";
    setDrawerHeaderStyle: (style: "solid" | "transparent") => void;
    onBack: () => void;
    onBuild: () => void;
    isBuilding: boolean;
}

export function DesignForm({
    navStyle,
    setNavStyle,
    navPosition,
    setNavPosition,
    primaryColor,
    setPrimaryColor,
    showAppName,
    setShowAppName,
    showFooterNav,
    setShowFooterNav,
    menuItems,
    setMenuItems,
    logoUrl,
    setLogoUrl,
    drawerHeaderStyle,
    setDrawerHeaderStyle,
    onBack,
    onBuild,
    isBuilding
}: DesignFormProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setLogoUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>App Customization</h2>
                <p className={styles.subtitle}>Customize the look and feel of your app.</p>
            </div>

            {/* Navigation Style */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Navigation Style</label>
                <div className={styles.gridOptions}>
                    <div
                        className={`${styles.optionCard} ${navStyle === "none" ? styles.selected : ""} `}
                        onClick={() => setNavStyle("none")}
                    >
                        <div className={styles.optionIcon}>
                            <div style={{ width: 24, height: 40, border: '1px solid currentColor', borderRadius: 4 }}></div>
                        </div>
                        <span>None</span>
                    </div>
                    <div
                        className={`${styles.optionCard} ${navStyle === "tabbar" ? styles.selected : ""} `}
                        onClick={() => setNavStyle("tabbar")}
                    >
                        <div className={styles.optionIcon}>
                            <div style={{ width: 24, height: 40, border: '1px solid currentColor', borderRadius: 4, display: 'flex', alignItems: 'end' }}>
                                <div style={{ width: '100%', height: 4, background: 'currentColor' }}></div>
                            </div>
                        </div>
                        <span>Tab Bar</span>
                    </div>
                    <div
                        className={`${styles.optionCard} ${navStyle === "drawer" ? styles.selected : ""} `}
                        onClick={() => setNavStyle("drawer")}
                    >
                        <div className={styles.optionIcon}>
                            <div style={{ width: 24, height: 40, border: '1px solid currentColor', borderRadius: 4, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 2, left: 2, width: 4, height: 2, background: 'currentColor' }}></div>
                                <div style={{ position: 'absolute', top: 5, left: 2, width: 4, height: 2, background: 'currentColor' }}></div>
                                <div style={{ position: 'absolute', top: 8, left: 2, width: 4, height: 2, background: 'currentColor' }}></div>
                            </div>
                        </div>
                        <span>Drawer</span>
                    </div>
                </div>
            </div>

            {/* Menu Position (Only if Drawer or Tab Bar) */}
            {(navStyle === "drawer" || navStyle === "tabbar") && (
                <div className={styles.formGroup}>
                    <label className={styles.label}>Menu Position</label>
                    <div className={styles.toggleGroup}>
                        <button
                            className={`${styles.toggleButton} ${navPosition === "left" ? styles.active : ""} `}
                            onClick={() => setNavPosition("left")}
                        >
                            Left
                        </button>
                        <button
                            className={`${styles.toggleButton} ${navPosition === "right" ? styles.active : ""} `}
                            onClick={() => setNavPosition("right")}
                        >
                            Right
                        </button>
                    </div>
                </div>
            )}

            {/* Theme Color */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Theme Color</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'].map(color => (
                        <div
                            key={color}
                            onClick={() => setPrimaryColor(color)}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: color,
                                cursor: 'pointer',
                                border: primaryColor === color ? '2px solid white' : '2px solid transparent',
                                boxShadow: primaryColor === color ? `0 0 0 2px ${color} ` : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* App Name Visibility */}
            {(navStyle === "drawer" || navStyle === "tabbar") && (
                <div className={styles.formGroup}>
                    <label className={styles.flexLabel}>
                        <input
                            type="checkbox"
                            checked={showAppName}
                            onChange={(e) => setShowAppName(e.target.checked)}
                            style={{ marginRight: '8px' }}
                        />
                        Show App Name in Header
                    </label>

                    {/* Footer Navigation (Settings, Share, Theme) */}
                    <label className={styles.flexLabel} style={{ marginTop: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={showFooterNav}
                            onChange={(e) => setShowFooterNav(e.target.checked)}
                            style={{ marginRight: '8px' }}
                        />
                        Show Utility Menu (Settings, Share, Theme)
                    </label>
                </div>
            )}

            {/* Menu Builder (Link Customization) */}
            {(navStyle === "drawer" || navStyle === "tabbar") && (
                <>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Drawer Customization</label>

                        {/* Logo URL Input */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label className={styles.subLabel} style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                                Logo URL (Optional)
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="https://example.com/logo.png"
                                    value={logoUrl}
                                    onChange={(e) => setLogoUrl(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'var(--foreground)',
                                    }}
                                />
                                <label className={styles.uploadButton} title="Upload Image">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Upload size={16} />
                                </label>
                            </div>
                        </div>

                        {/* Header Style Toggle */}
                        {navStyle === "drawer" && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label className={styles.subLabel} style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                                    Header Background
                                </label>
                                <div className={styles.toggleGroup}>
                                    <button
                                        className={`${styles.toggleButton} ${drawerHeaderStyle === "solid" ? styles.active : ""} `}
                                        onClick={() => setDrawerHeaderStyle("solid")}
                                    >
                                        Solid Color
                                    </button>
                                    <button
                                        className={`${styles.toggleButton} ${drawerHeaderStyle === "transparent" ? styles.active : ""} `}
                                        onClick={() => setDrawerHeaderStyle("transparent")}
                                    >
                                        Transparent
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <MenuBuilder items={menuItems} setItems={setMenuItems} />
                </>
            )}

            <div className={styles.footer} style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    className={styles.buildButton}
                    onClick={onBuild}
                    isLoading={isBuilding}
                >
                    {isBuilding ? "Building App..." : "Build App"}
                </Button>
            </div>
        </div>
    );
}
