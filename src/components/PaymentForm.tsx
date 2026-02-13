import { Button } from "./ui/Button";
import styles from "./PaymentForm.module.css";
import { useState } from "react";
import { clsx } from "clsx";
import { CreditCard, Smartphone, Check, ArrowLeft, User, Mail, Phone, ShieldCheck } from "lucide-react";

export type PlanType = "small" | "medium" | "large";

interface PaymentFormProps {
    onBack: () => void;
    onComplete: (plan: PlanType) => void;
    isProcessing: boolean;
}

const PLANS = [
    {
        id: "small" as PlanType,
        name: "Small",
        price: "$29",
        features: [
            "Android App Published",
            "iOS App Published",
            "Free App Updates",
            "Up to 250 Monthly Active Users"
        ]
    },
    {
        id: "medium" as PlanType,
        name: "Medium",
        price: "$49",
        features: [
            "Everything in Small",
            "Push Notifications (5/mo)",
            "Up to 2,500 Monthly Active Users"
        ]
    },
    {
        id: "large" as PlanType,
        name: "Large",
        price: "$99",
        features: [
            "Everything in Medium",
            "Unlimited Monthly Active Users",
            "Unlimited Push Notifications",
            "Priority Support & 1-on-1 Onboarding",
            "App Store Screenshot Editor",
            "Review Reminders & Inactive Alerts",
            "Done-For-You Publishing Service"
        ],
        popular: true
    }
];

export function PaymentForm({ onBack, onComplete, isProcessing }: PaymentFormProps) {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("medium");
    const [showCheckout, setShowCheckout] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });
    const [paymentMethod, setPaymentMethod] = useState<"card" | "apple">("card");

    const planData = PLANS.find(p => p.id === selectedPlan) || PLANS[1];

    if (showCheckout) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Secure Checkout</h2>
                    <div className={styles.subtitle}>Complete your subscription for {planData.name} Plan</div>
                </div>

                <div className={styles.checkoutBody}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>1. Personal Information</h3>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <User size={18} className={styles.inputIcon} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <Mail size={18} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <Phone size={18} className={styles.inputIcon} />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>2. Payment Method</h3>
                        <div className={styles.methodGrid}>
                            <div
                                className={clsx(styles.methodCard, paymentMethod === "card" && styles.selectedMethod)}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <CreditCard size={24} />
                                <span>Credit Card</span>
                            </div>
                            <div
                                className={clsx(styles.methodCard, paymentMethod === "apple" && styles.selectedMethod)}
                                onClick={() => setPaymentMethod("apple")}
                            >
                                <Smartphone size={24} />
                                <span>Apple Pay</span>
                            </div>
                        </div>

                        {paymentMethod === "card" && (
                            <div className={styles.cardFields}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className={styles.input}
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                        maxLength={19}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className={styles.input}
                                        style={{ flex: 1 }}
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                        maxLength={5}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        className={styles.input}
                                        style={{ flex: 1 }}
                                        value={formData.cvc}
                                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button variant="ghost" onClick={() => setShowCheckout(false)}>
                        <ArrowLeft size={16} className="mr-2" /> Back
                    </Button>
                    {paymentMethod === "apple" ? (
                        <button
                            className={styles.applePayButton}
                            onClick={() => onComplete(selectedPlan)}
                        >
                            <span style={{ fontSize: '1.2rem', marginRight: '4px' }}></span> Pay
                        </button>
                    ) : (
                        <Button
                            variant="primary"
                            size="lg"
                            isLoading={isProcessing}
                            onClick={() => onComplete(selectedPlan)}
                            style={{ flex: 1 }}
                        >
                            Subscribe & Start Trial
                        </Button>
                    )}
                </div>

                <div className={styles.secureBadge}>
                    <ShieldCheck size={14} />
                    <span>Secure 256-bit SSL Encrypted Payment</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Choose Your Plan</h2>
                <div className={styles.subtitle}>Start with a 5-day free trial. Cancel anytime.</div>
                <div className={styles.trialBadge}>NO CHARGE TODAY</div>
            </div>

            <div className={styles.pricingGrid}>
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={clsx(styles.planCard, selectedPlan === plan.id && styles.selected)}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        {plan.popular && <div className={styles.popularBadge}>MOST POPULAR</div>}
                        <div className={styles.planHeader}>
                            <div>
                                <div className={styles.planName}>{plan.name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className={styles.planPrice}>{plan.price}</div>
                                <div className={styles.planPeriod}>/month</div>
                            </div>
                        </div>
                        <ul className={styles.featureList}>
                            {plan.features.map((feature, i) => (
                                <li key={i} className={styles.featureItem}>
                                    <Check size={14} className={styles.checkIcon} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <Button variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    isLoading={isProcessing}
                    onClick={() => setShowCheckout(true)}
                    style={{ flex: 1 }}
                >
                    Continue to Payment
                </Button>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                Secure payment via Stripe. You won't be charged until your trial ends.
            </p>
        </div>
    );
}
