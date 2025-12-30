
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskModalProvider>
          <FilterProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes with responsive layout */}
                  <Route
                    path="/tasks"
                    element={
                      // <ProtectedRoute>
                      <ResponsiveLayout>
                        <TaskBoard />
                      </ResponsiveLayout>
                      // </ProtectedRoute>
                    }
                  />

                  {/* Redirect unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </FilterProvider>
        </TaskModalProvider>
      </ThemeProvider>
    </AuthProvider>
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
