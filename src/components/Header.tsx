import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTaskModal } from '../context/TaskModalContext';
import ThemeToggle from './ThemeToggle';
import CenterButton from './CenterButton';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { isOpen } = useTaskModal();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className={`theme-surface shadow transition-theme ${isOpen ? 'hidden md:block' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h1 className="ml-3 text-2xl font-bold theme-text-primary">Taskify</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4 relative">
                            <ThemeToggle />

                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="theme-text-secondary hover:theme-text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <CenterButton
                                        as="link"
                                        to="/register"
                                        variant="primary"
                                        size="sm"
                                    >
                                        Sign up
                                    </CenterButton>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1 transition"
                                    >
                                        <FaUser className="h-6 w-6 theme-text-primary" />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg border theme-surface theme-border z-50">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="block px-4 py-2 text-sm theme-text-secondary hover:theme-text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                Profile
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
