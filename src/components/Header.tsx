import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTaskModal } from '../context/TaskModalContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { isOpen } = useTaskModal();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* Header - Hidden on mobile when modal is open */}
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
                        {user && (
                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                                <span className="theme-text-secondary">Welcome, {user?.name}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Navigation - Only show for authenticated users, hidden on mobile when modal is open */}
            {user && (
                <nav className={`theme-surface border-b theme-border transition-theme ${isOpen ? 'hidden md:block' : ''}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8">
                            <Link
                                to="/dashboard"
                                className="border-b-2 border-primary-600 text-primary-600 py-4 px-1 text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/tasks"
                                className="border-b-2 border-transparent theme-text-muted hover:theme-text-secondary hover:theme-border-hover py-4 px-1 text-sm font-medium transition-colors"
                            >
                                Tasks
                            </Link>
                            <Link
                                to="/profile"
                                className="border-b-2 border-transparent theme-text-muted hover:theme-text-secondary hover:theme-border-hover py-4 px-1 text-sm font-medium transition-colors"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Header;
