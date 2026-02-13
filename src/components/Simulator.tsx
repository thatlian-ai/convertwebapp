
import { clsx } from "clsx";
import { useRef, useState, useEffect } from "react";
import { MenuItem, AVAILABLE_ICONS } from "./MenuBuilder";
import { Link as LinkIcon, Menu, X, Settings, Share2, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Simulator.module.css";

import { NavStyle } from "./DesignForm";

// Helper for Base64 URL encoding (client-side)
const encodeBase64Url = (str: string) => {
    try {
        return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) {
        return "";
    }
};

// Recursive Menu Item Component
function MenuRow({ item, onNavigate, renderIcon, primaryColor }: {
    item: MenuItem,
    onNavigate: (link: string) => void,
    renderIcon: (name: string) => React.ReactNode,
    primaryColor: string
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        } else {
            onNavigate(item.link);
        }
    };

    return (
        <div className={styles.menuRowContainer}>
            <div
                className={clsx(styles.drawerItem, isExpanded && styles.drawerItemActive)}
                onClick={handleClick}
            >
                <div className={styles.drawerItemContent}>
                    <div className={styles.drawerIcon} style={{ color: primaryColor }}>
                        {renderIcon(item.icon)}
                    </div>
                    <span className={styles.drawerLabel}>{item.label}</span>
                </div>
                {hasChildren && (
                    <div className={styles.chevron}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                )}
            </div>
            {hasChildren && isExpanded && (
                <div className={styles.subMenu}>
                    {item.children!.map(child => (
                        <div
                            key={child.id}
                            className={styles.subMenuItem}
                            onClick={() => onNavigate(child.link)}
                        >
                            <span className={styles.subMenuDot}></span>
                            <span>{child.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface SimulatorProps {
    url: string;
    platform: "ios" | "android" | "ipad";
    navStyle?: NavStyle;
    navPosition?: "left" | "right";
    primaryColor?: string;
    appName?: string;
    showAppName?: boolean;
    showFooterNav?: boolean;
    menuItems?: MenuItem[];
    logoUrl?: string;
    drawerHeaderStyle?: "solid" | "transparent";
    isScreenshotMode?: boolean;
    screenshotSize?: { width: number; height: number };
    originalUrl?: string;
}

export function Simulator({
    url,
    platform,
    navStyle = "none",
    navPosition = "left",
    primaryColor = "#6366f1",
    appName = "My App",
    showAppName = true,
    showFooterNav = false,
    menuItems = [],
    logoUrl = "",
    drawerHeaderStyle = "solid",
    isScreenshotMode = false,
    screenshotSize,
    originalUrl
}: SimulatorProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [internalUrl, setInternalUrl] = useState(url);

    // Keep internal URL in sync when PROP changes (prop changes when user types new config)
    useEffect(() => {
        let finalUrl = url;

        // Safety fallback: If this is the user's domain and not yet proxied, force it
        if (url && url.includes("vailamtahministry.com") && !url.includes("/api/proxy/")) {
            finalUrl = `/api/proxy/${encodeBase64Url(url)}/`;
        }

        setInternalUrl(finalUrl);
    }, [url]);

    // Helper to render icon
    const renderIcon = (iconName: string, size = 20) => {
        const IconComponent = AVAILABLE_ICONS.find(i => i.name === iconName)?.icon || LinkIcon;
        return <IconComponent size={size} />;
    };

    const handleMenuClick = (link: string) => {
        if (!link) return;

        let target = link;

        // Determination: Are we currently in proxy mode?
        // Use includes to be safe if there's a port or absolute path
        const isProxy = url.includes('/api/proxy/');

        if (isProxy) {
            // Extract the proxy base (e.g., /api/proxy/ENCODED_URL/)
            const parts = url.split('/');
            // Handle cases where there might be a leading slash or not
            const proxyIndex = parts.indexOf('proxy');
            const proxyBasePath = parts.slice(0, proxyIndex + 2).join('/') + '/';

            if (!link.startsWith("http")) {
                // Relative link: Resolve against the proxy base path
                const base = window.location.origin + proxyBasePath;
                try {
                    const resolved = new URL(link, base);
                    target = resolved.pathname + resolved.search;
                } catch (e) {
                    console.error("Link resolution error", e);
                }
            } else if (originalUrl) {
                // Absolute link: Check if it's pointing to the same site we're proxying
                try {
                    const targetUrl = new URL(link);
                    const sourceUrl = new URL(originalUrl);

                    if (targetUrl.origin === sourceUrl.origin) {
                        const relativePath = targetUrl.pathname + targetUrl.search;
                        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
                        target = `${proxyBasePath}${cleanPath}`;
                    }
                } catch (e) {
                    console.error("Failed to compare origins", e);
                }
            }
        } else {
            // Not in proxy mode: Standard resolution
            if (!link.startsWith("http")) {
                try {
                    const base = internalUrl.startsWith('http') ? internalUrl : window.location.origin + (internalUrl.startsWith('/') ? '' : '/') + internalUrl;
                    const resolved = new URL(link, base);
                    target = resolved.toString();
                } catch (e) {
                    console.error("Link resolution error", e);
                }
            }
        }

        // Force proxy for vailamtahministry.com links if not already proxied
        if (link.includes("vailamtahministry.com") && !link.includes("/api/proxy/")) {
            target = `/api/proxy/${encodeBase64Url(link)}/`;
        }

        if (iframeRef.current) {
            setInternalUrl(target);
            setIsDrawerOpen(false);
        }
    };

    return (
        <div className={clsx(styles.container, isScreenshotMode && styles.screenshotContainer)}>
            {/* Device Frame */}
            <div
                className={clsx(
                    styles.device,
                    styles[platform],
                    isDarkMode ? styles.darkMode : "",
                    isScreenshotMode && styles.screenshotMode
                )}
                style={isScreenshotMode && screenshotSize ? {
                    width: screenshotSize.width / 4, // Scale down for preview
                    height: screenshotSize.height / 4,
                    borderRadius: 0 // Sharp edges for screenshots
                } : {}}
            >
                {/* Notch / Camera (simplified) */}
                {!isScreenshotMode && <div className={styles.notch}></div>}

                {/* App Header (Native-like top bar) */}
                {(navStyle === "drawer" || navStyle === "tabbar") && (
                    <div className={styles.appHeader}>
                        {/* Drawer Toggle */}
                        {navStyle === "drawer" && (
                            <button
                                className={styles.headerButton}
                                style={{
                                    color: primaryColor,
                                    order: navPosition === "right" ? 2 : 0,
                                    marginRight: navPosition === "left" && showAppName ? "0" : "auto",
                                    marginLeft: navPosition === "right" && showAppName ? "0" : "auto"
                                }}
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        )}

                        {/* App Title */}
                        {showAppName && <span className={styles.headerTitle}>{appName}</span>}

                        {/* Spacer for centering logic if title is shown */}
                        {navStyle === "drawer" && showAppName && (
                            <div style={{ width: 28, order: navPosition === "right" ? 0 : 2 }}></div>
                        )}
                    </div>
                )}

                {/* The Screen (The content area) */}
                <div
                    className={styles.screen}
                    style={{
                        position: "relative",
                        paddingTop: (navStyle === "drawer" || navStyle === "tabbar") ? "96px" : "0"
                    }}
                >
                    {/* Drawer Overlay (Now inside screen for automatic clipping) */}
                    {navStyle === "drawer" && isDrawerOpen && (
                        <div className={styles.drawerOverlay} style={{ zIndex: 1000 }}>
                            <div
                                className={clsx(styles.drawerContent, isDarkMode && styles.drawerContentDark)}
                                style={{
                                    left: navPosition === "left" ? 0 : "auto",
                                    right: navPosition === "right" ? 0 : "auto",
                                    // Manual inheritance since we are inside screen but z-index matters
                                    borderTopLeftRadius: "inherit",
                                    borderTopRightRadius: "inherit",
                                    borderBottomLeftRadius: "inherit",
                                    borderBottomRightRadius: "inherit"
                                }}
                            >
                                <div
                                    className={styles.drawerHeader}
                                    style={{
                                        background: drawerHeaderStyle === "transparent" ? "transparent" : primaryColor,
                                        color: drawerHeaderStyle === "transparent" ? "inherit" : "#fff"
                                    }}
                                >
                                    {logoUrl ? (
                                        <img
                                            src={logoUrl}
                                            alt="App Logo"
                                            className={styles.drawerLogo}
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                    ) : (
                                        <span className={styles.drawerTitle} style={{ color: drawerHeaderStyle === "transparent" ? "inherit" : "#fff" }}>
                                            {appName}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className={styles.closeBtn}
                                        style={{ color: drawerHeaderStyle === "transparent" ? "inherit" : "#fff" }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className={styles.drawerItems}>
                                    {menuItems.map(item => (
                                        <MenuRow
                                            key={item.id}
                                            item={item}
                                            onNavigate={handleMenuClick}
                                            renderIcon={renderIcon}
                                            primaryColor={primaryColor}
                                        />
                                    ))}
                                    {menuItems.length === 0 && <div className={styles.emptyMenu}>No items added</div>}
                                </div>

                                {/* Footer Utility Bar */}
                                {showFooterNav && (
                                    <div className={styles.drawerFooter}>
                                        <button className={styles.footerItem}>
                                            <Settings size={20} />
                                            <span>Settings</span>
                                        </button>
                                        <button className={styles.footerItem}>
                                            <Share2 size={20} />
                                            <span>Share</span>
                                        </button>
                                        <button className={styles.footerItem} onClick={() => setIsDarkMode(!isDarkMode)}>
                                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                            <span>{isDarkMode ? "Light" : "Dark"}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={styles.drawerBackdrop} onClick={() => setIsDrawerOpen(false)}></div>
                        </div>
                    )}

                    {url ? (
                        <div style={{ width: "100%", height: (navStyle === "tabbar") ? "calc(100% - 60px)" : "100%", overflow: "hidden" }}>
                            <iframe
                                ref={iframeRef}
                                src={internalUrl}
                                className={styles.iframe}
                                title="App Preview"
                                sandbox="allow-scripts allow-same-origin allow-forms"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                            />
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <p>Welcome</p>
                        </div>
                    )}
                </div>

                {/* Tab Bar */}
                {navStyle === "tabbar" && (
                    <div className={styles.tabBar}>
                        {menuItems.slice(0, 5).map(item => (
                            <div key={item.id} className={styles.tabItem} style={{ color: primaryColor }} onClick={() => handleMenuClick(item.link)}>
                                {renderIcon(item.icon, 20)}
                                <span style={{ fontSize: 10 }}>{item.label}</span>
                            </div>
                        ))}
                        {menuItems.length === 0 && (
                            <div className={styles.tabItem} style={{ color: primaryColor }}>
                                {renderIcon("Home", 24)}
                                <span style={{ fontSize: 10 }}>Home</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
