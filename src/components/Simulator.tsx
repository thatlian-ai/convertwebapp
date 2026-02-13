
import { clsx } from "clsx";
import { useRef, useState } from "react";
import { MenuItem, AVAILABLE_ICONS } from "./MenuBuilder";
import { Link as LinkIcon, Menu, X, Settings, Share2, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Simulator.module.css";

import { NavStyle } from "./DesignForm";

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
        <>
            <div className={styles.drawerItem} onClick={handleClick}>
                <div className={styles.drawerItemContent}>
                    <div className={styles.drawerIcon} style={{ color: primaryColor }}>
                        {renderIcon(item.icon)}
                    </div>
                    <span>{item.label}</span>
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
                            <span>{child.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
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
    screenshotSize
}: SimulatorProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Helper to render icon
    const renderIcon = (iconName: string, size = 20) => {
        const IconComponent = AVAILABLE_ICONS.find(i => i.name === iconName)?.icon || LinkIcon;
        return <IconComponent size={size} />;
    };

    const handleMenuClick = (link: string) => {
        if (iframeRef.current && link) {
            // Basic iframe navigation
            // Check if link is absolute or relative
            const target = link.startsWith("http") ? link : url ? new URL(link, url).toString() : link;
            // We can't easily force the iframe to navigate if it's cross-origin, but we can try setting src
            // Or if we are using the proxy, we send a message?
            // For now, let's just set src, which reloads.
            if (iframeRef.current.src !== target) {
                iframeRef.current.src = target;
            }
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
                    isDarkMode ? styles.darkMode : '',
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
                                    marginRight: navPosition === "left" && showAppName ? '0' : 'auto',
                                    marginLeft: navPosition === "right" && showAppName ? '0' : 'auto'
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

                {/* Drawer Overlay */}
                {navStyle === "drawer" && isDrawerOpen && (
                    <div className={styles.drawerOverlay}>
                        <div
                            className={clsx(styles.drawerContent, isDarkMode && styles.drawerContentDark)}
                            style={{
                                left: navPosition === "left" ? 0 : 'auto',
                                right: navPosition === "right" ? 0 : 'auto',
                                borderTopRightRadius: navPosition === "left" ? 16 : 0,
                                borderBottomRightRadius: navPosition === "left" ? 16 : 0,
                                borderTopLeftRadius: navPosition === "right" ? 16 : 0,
                                borderBottomLeftRadius: navPosition === "right" ? 16 : 0,
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
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
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

                {/* Screen Content */}
                <div className={styles.screen} style={{ position: 'relative' }}>
                    {url ? (
                        <iframe
                            ref={iframeRef}
                            src={url}
                            className={styles.iframe}
                            title="App Preview"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            style={{
                                height: (navStyle === "tabbar") ? "calc(100% - 60px)" : "100%",
                                // Look cleaner by matching new header height
                                paddingTop: (navStyle === "drawer" || navStyle === "tabbar") ? "96px" : "0"
                            }}
                        />
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
