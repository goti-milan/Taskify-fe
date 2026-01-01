
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';
import { TaskModalProvider } from './context/TaskModalContext';
import { FilterProvider } from './context/FilterContext';
import TaskBoard from './pages/Tasks';
import MobileLayout from './layouts/MobileLayout';
import Layout from './layouts/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <TaskModalProvider>
            <FilterProvider>
              <div className="App">
                <Toaster />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />

                  {/* Protected Routes */}
                  <Route
                    path="/tasks"
                    element={
                      <ResponsiveLayout>
                        <TaskBoard />
                      </ResponsiveLayout>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </FilterProvider>
          </TaskModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}


// Responsive layout component that switches between mobile and desktop layouts
const ResponsiveLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile ? (
    <MobileLayout>
      {children}
    </MobileLayout>
  ) : (
    <Layout>{children}</Layout>
  );
};

export default App;
