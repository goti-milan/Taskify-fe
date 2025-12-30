import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IoSunny } from 'react-icons/io5';
import { IoIosMoon } from 'react-icons/io';

type ToggleSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap = {
    sm: {
        track: 'h-7 w-12',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
        icon: 14,
        padding: 'px-1',
    },
    md: {
        track: 'h-9 w-14',
        thumb: 'h-7 w-7',
        translate: 'translate-x-6',
        icon: 16,
        padding: 'px-2',
    },
    lg: {
        track: 'h-10 w-16',
        thumb: 'h-8 w-8',
        translate: 'translate-x-7',
        icon: 18,
        padding: 'px-2',
    },
    xl: {
        track: 'h-12 w-20',
        thumb: 'h-10 w-10',
        translate: 'translate-x-9',
        icon: 20,
        padding: 'px-3',
    },
};

type Props = {
    size?: ToggleSize;
};

const ThemeToggle: React.FC<Props> = ({ size = 'sm' }) => {
    const { theme, toggleTheme } = useTheme();
    const styles = sizeMap[size];

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
        relative inline-flex items-center rounded-full
        bg-gray-200 dark:bg-gray-700
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-primary-500
        ${styles.track} ${styles.padding}
      `}
        >
            {/* Inactive icons on track */}
            <div className="flex w-full items-center justify-between text-gray-400 dark:text-gray-300 pointer-events-none">
                <IoSunny size={styles.icon} />
                <IoIosMoon size={styles.icon} />
            </div>

            {/* Thumb */}
            <span
                className={`
          absolute left-1
          flex items-center justify-center
          rounded-full bg-white shadow
          transition-transform duration-300
          ${styles.thumb}
          ${isDark ? styles.translate : 'translate-x-0'}
        `}
            >
                {/* Active icon inside thumb */}
                {isDark ? (
                    <IoIosMoon size={styles.icon - 2} className="text-gray-700" />
                ) : (
                    <IoSunny size={styles.icon - 2} className="text-yellow-500" />
                )}
            </span>
        </button>
    );
};

export default ThemeToggle;
