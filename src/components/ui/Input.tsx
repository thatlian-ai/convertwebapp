import { clsx } from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className={styles.container}>
                {label && (
                    <label className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={clsx(
                        styles.input,
                        error && styles.error,
                        className
                    )}
                    {...props}
                />
                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
