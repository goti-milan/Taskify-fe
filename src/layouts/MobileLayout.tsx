import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTaskModal } from '../context/TaskModalContext';
import { useFilter } from '../context/FilterContext';
import { FaPlus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TaskFilters } from '../components/TaskFilter';
import ThemeToggle from '../components/ThemeToggle';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface MobileLayoutProps {
    children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    const { user } = useAuth();
    const { openCreateTask } = useTaskModal();
    const { onFilterChange } = useFilter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleAddTask = () => {
        openCreateTask();
    };

    const handleProfileClick = () => {
        // TODO: Implement profile menu functionality
        console.log('Profile clicked');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen theme-bg theme-text-primary flex flex-col">
            {/* Top Bar with Dark Mode Toggle */}
            <header className="flex items-center justify-between p-4 theme-surface border-b theme-border">
                <div className="w-10"></div>

                <h1 className="text-lg font-semibold">Taskify</h1>

                {/* Dark Mode Toggle */}
                <div className=" flex items-center justify-center">
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 theme-surface border-t theme-border z-40">
                <div className="flex items-center justify-around h-16 px-4">
                    {/* Profile Icon - Left */}
                    <button
                        onClick={handleProfileClick}
                        className="flex items-center justify-center w-10 h-10 rounded-full theme-surface-hover transition-colors"
                        aria-label="Profile"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                            {user?.name ? (
                                <span className="text-white text-sm font-medium">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <CgProfile />
                            )}
                        </div>
                    </button>

                    {/* Center Space for + Button */}
                    <div className="flex-1 flex justify-center">
                        {/* Add Task Button - Center */}
                        <button
                            onClick={handleAddTask}
                            className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                            aria-label="Add Task"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Hamburger Menu - Right */}
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center justify-center w-10 h-10 rounded-full theme-surface-hover transition-colors"
                        aria-label="Open filters"
                    >
                        <GiHamburgerMenu />
                    </button>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-90 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
                        onClick={closeSidebar}
                    />

                    {/* Sidebar */}
                    <div className="relative flex-1 max-w-xs w-full theme-surface shadow-xl">
                        <div className="flex flex-col h-full">
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-4 border-b theme-border">
                                <h2 className="text-lg font-semibold theme-text-primary">Filters</h2>
                                <button
                                    onClick={closeSidebar}
                                    className="p-2 rounded-lg theme-surface-hover transition-colors"
                                    aria-label="Close filters"
                                >
                                    <IoMdCloseCircleOutline />
                                </button>
                            </div>

                            {/* Sidebar Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <TaskFilters onFilterChange={onFilterChange} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileLayout;
