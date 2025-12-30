import React from 'react';
import { Footer } from '../components/Footer';
import Header from '../components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen theme-bg transition-theme">
            <Header />
            <main className="flex-1 flex items-start justify-center p-4">
                <div className="w-full max-w-7xl">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
