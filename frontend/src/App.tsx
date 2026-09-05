import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useAuth, AuthProvider } from './context/AuthContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './pages/Login';
import Register from './pages/Register';
import { LayoutDashboard, ListChecks, LogOut, Moon, Sun } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      
      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
              ✅
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.name}!</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex gap-2 bg-white/5 rounded-xl p-1">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 bg-purple-500/20 text-purple-400"
              >
                <ListChecks className="w-4 h-4" />
                Tasks
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.header>

        <Routes>
          <Route path="/" element={
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <TaskForm />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <TaskList />
              </motion.div>
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;