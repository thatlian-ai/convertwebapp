import React, { useState } from "react";
import styles from "./BuilderForm.module.css";
import { Button } from "@/components/ui/Button";
import {
    Plus, Trash2, Edit2, Link as LinkIcon,
    Home, User, Settings, Info, Search, Menu, Mail, Phone, Globe, FileText, Check,
    LayoutGrid, Image, Video, Music, Calendar, MapPin, ShoppingCart, CreditCard,
    Heart, Star, Bell, Share, MessageCircle, Camera, Lock, Unlock,
    Facebook, Twitter, Instagram, Linkedin, Github, Youtube,
    Book, Briefcase, Coffee, Gift, Headphones, Mic, Printer,
    Save, Send, Shield, Smartphone, Sun, Moon, Zap,

    // New additions
    BookOpen, Library, GraduationCap, Bookmark,
    Film, PlayCircle, Tv, Radio, Mic2, Speaker, Disc,
    Cloud, Flag, Tag,
    ChevronDown, ChevronRight
} from "lucide-react";

// Initial set of icons users can pick from

export const AVAILABLE_ICONS = [
    // Navigation & Core
    { name: "Home", icon: Home },
    { name: "User", icon: User },
    { name: "Search", icon: Search },
    { name: "Menu", icon: Menu },
    { name: "Settings", icon: Settings },

    // Communication & Social
    { name: "Mail", icon: Mail },
    { name: "Phone", icon: Phone },
    { name: "Message", icon: MessageCircle },
    { name: "Globe", icon: Globe },
    { name: "Share", icon: Share },

    // Content & Media
    { name: "File", icon: FileText },
    { name: "Image", icon: Image },
    { name: "Video", icon: Video },
    { name: "Film", icon: Film },
    { name: "Play", icon: PlayCircle },
    { name: "Music", icon: Music },
    { name: "Audio", icon: Speaker },
    { name: "Radio", icon: Radio },
    { name: "Mic", icon: Mic2 },
    { name: "TV", icon: Tv },
    { name: "Camera", icon: Camera },

    // Education & Books
    { name: "Book", icon: Book },
    { name: "Read", icon: BookOpen },
    { name: "Library", icon: Library },
    { name: "School", icon: GraduationCap },
    { name: "Bookmark", icon: Bookmark },

    // Commerce & Utility
    { name: "Cart", icon: ShoppingCart },
    { name: "Card", icon: CreditCard },
    { name: "Map", icon: MapPin },
    { name: "Calendar", icon: Calendar },
    { name: "Bell", icon: Bell },
    { name: "Cloud", icon: Cloud },
    { name: "Flag", icon: Flag },
    { name: "Tag", icon: Tag },

    // Engagement
    { name: "Heart", icon: Heart },
    { name: "Star", icon: Star },
    { name: "Gift", icon: Gift },
    { name: "Coffee", icon: Coffee },
    { name: "Shield", icon: Shield },

    // Links & Misc
    { name: "Link", icon: LinkIcon },
    { name: "Info", icon: Info },
    { name: "Lock", icon: Lock },
    { name: "Unlock", icon: Unlock },
    { name: "Zap", icon: Zap },

    // Device
    { name: "Mobile", icon: Smartphone },
    { name: "Printer", icon: Printer },
    { name: "Save", icon: Save },
    { name: "Send", icon: Send },
    { name: "Briefcase", icon: Briefcase },

    // Social Brands
    { name: "Facebook", icon: Facebook },
    { name: "Twitter", icon: Twitter },
    { name: "Instagram", icon: Instagram },
    { name: "LinkedIn", icon: Linkedin },
    { name: "YouTube", icon: Youtube },
];

export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    link: string;
    children?: MenuItem[];
}

interface MenuBuilderProps {
    items: MenuItem[];
    setItems: (items: MenuItem[]) => void;
}

export function MenuBuilder({ items, setItems }: MenuBuilderProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [label, setLabel] = useState("");
    const [link, setLink] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("Home");
    const [subItems, setSubItems] = useState<MenuItem[]>([]);

    // Sub Item Form State
    const [subLabel, setSubLabel] = useState("");
    const [subLink, setSubLink] = useState("");

    const resetForm = () => {
        setLabel("");
        setLink("");
        setSelectedIcon("Home");
        setSubItems([]);
        setIsAdding(false);
        setEditingId(null);
        setSubLabel("");
        setSubLink("");
    };

    const handleAdd = () => {
        if (!label) return; // Link is optional if it has children? But let's keep it simple.
        const newItem: MenuItem = {
            id: crypto.randomUUID(),
            label,
            link,
            icon: selectedIcon,
            children: subItems
        };
        setItems([...items, newItem]);
        resetForm();
    };

    const handleUpdate = () => {
        if (!label || !editingId) return;
        const updatedItems = items.map(item =>
            item.id === editingId
                ? { ...item, label, link, icon: selectedIcon, children: subItems }
                : item
        );
        setItems(updatedItems);
        resetForm();
    };

    const startEdit = (item: MenuItem) => {
        setLabel(item.label);
        setLink(item.link);
        setSelectedIcon(item.icon);
        setSubItems(item.children || []);
        setEditingId(item.id);
        setIsAdding(true);
    };

    const handleDelete = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    // Sub Item Handlers
    const addSubItem = () => {
        if (!subLabel || !subLink) return;
        const newSubItem: MenuItem = {
            id: crypto.randomUUID(),
            label: subLabel,
            link: subLink,
            icon: "Link", // Default icon for sub items
        };
        setSubItems([...subItems, newSubItem]);
        setSubLabel("");
        setSubLink("");
    };

    const removeSubItem = (id: string) => {
        setSubItems(subItems.filter(i => i.id !== id));
    };

    // Helper to render icon
    const renderIcon = (iconName: string, size = 16) => {
        const IconComponent = AVAILABLE_ICONS.find(i => i.name === iconName)?.icon || LinkIcon;
        return <IconComponent size={size} />;
    };

    if (isAdding) {
        return (
            <div className={styles.menuBuilderForm}>
                <h4 className={styles.subHeader}>{editingId ? "Edit Item" : "Add New Item"}</h4>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Label</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Home"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Link (Optional if using sub-items)</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. /about"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Icon</label>
                    <div className={styles.iconGrid}>
                        {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                            <div
                                key={name}
                                className={`${styles.iconOption} ${selectedIcon === name ? styles.selectedIcon : ''}`}
                                onClick={() => setSelectedIcon(name)}
                                title={name}
                            >
                                <Icon size={20} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sub Items Section */}
                <div className={styles.subItemsSection}>
                    <label className={styles.label}>Nested Menu Items</label>
                    <div className={styles.subItemsList}>
                        {subItems.map(sub => (
                            <div key={sub.id} className={styles.subItemRow}>
                                <span>{sub.label}</span>
                                <span className={styles.subItemLink}>{sub.link}</span>
                                <button onClick={() => removeSubItem(sub.id)} className={styles.iconBtnDestructive}>
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.addSubItemForm}>
                        <div className={styles.addSubItemInputs}>
                            <input
                                type="text"
                                className={styles.miniInput}
                                placeholder="Sub-item Label"
                                value={subLabel}
                                onChange={(e) => setSubLabel(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.miniInput}
                                placeholder="Sub-item Link"
                                value={subLink}
                                onChange={(e) => setSubLink(e.target.value)}
                            />
                        </div>
                        <Button size="sm" variant="outline" onClick={addSubItem} style={{ height: 'fit-content' }}>
                            Add
                        </Button>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <Button variant="ghost" onClick={resetForm} className="mr-2">Cancel</Button>
                    <Button onClick={editingId ? handleUpdate : handleAdd}>
                        {editingId ? "Update" : "Add"}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.menuListContainer}>
            <div className={styles.menuListHeader}>
                <span className={styles.label}>Menu Items ({items.length})</span>
                <Button size="sm" variant="outline" onClick={() => setIsAdding(true)}>
                    <Plus size={14} className="mr-1" /> Add
                </Button>
            </div>

            {items.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No items yet.</p>
                </div>
            ) : (
                <div className={styles.menuItemsList}>
                    {items.map(item => (
                        <div key={item.id} className={styles.menuItemRow}>
                            <div className={styles.itemIconWrapper}>
                                {renderIcon(item.icon, 18)}
                            </div>
                            <div className={styles.itemInfo}>
                                <div className={styles.itemName}>{item.label}</div>
                                <div className={styles.itemLink}>
                                    {item.link || (item.children?.length ? `${item.children.length} sub-items` : "No link")}
                                </div>
                            </div>
                            <div className={styles.itemActions}>
                                <button onClick={() => startEdit(item)} className={styles.iconBtn}>
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className={styles.iconBtnDestructive}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
