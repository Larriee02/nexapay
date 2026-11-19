import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const workspaces = { customer: 'Personal workspace', merchant: 'Merchant workspace', admin: 'Administration' };

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 lg:pl-64">
        <header className="workspace-header">
          <button type="button" className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <Menu size={22} />
          </button>
          <span className="text-sm font-semibold">{workspaces[user.role]}</span>
          <span className="ml-auto text-xs font-medium text-slate-500">Demo environment</span>
          <ThemeToggle />
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-7 lg:p-9"><Outlet /></main>
      </div>
    </div>
  );
}
