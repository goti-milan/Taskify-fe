import React from "react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    error?: string;
    type?: "text" | "email" | "password" | "date" | "textarea" | "select";
    options?: Option[];
    required?: boolean;
    placeholder?: string;
};

export function FormField({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    options = [],
    required,
    placeholder,
}: Props) {
    const baseClass =
        "w-full rounded-lg border theme-border theme-surface px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all";

    return (
        <div>
            <label className="block text-sm font-medium theme-text-primary mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {type === "textarea" && (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClass}
                    rows={3}
                />
            )}

            {type === "select" && (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClass}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}

            {type !== "textarea" && type !== "select" && (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={baseClass}
                />
            )}

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
