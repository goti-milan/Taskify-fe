import React from 'react';
import { Link } from 'react-router-dom';

interface CenterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    as?: 'button' | 'link';
    to?: string;
}

const CenterButton: React.FC<CenterButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    as = 'button',
    to,
    className = '',
    ...props
}) => {
    const baseClasses = 'flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 bg-blue-500! text-white',
        secondary: 'theme-surface theme-text-primary hover:theme-surface-hover',
        outline: 'theme-border theme-text-primary hover:theme-surface-hover',
        ghost: 'theme-text-primary hover:theme-surface-hover'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    if (as === 'link' && to) {
        return (
            <Link to={to} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};

export default CenterButton;