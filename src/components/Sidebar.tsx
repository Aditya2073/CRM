import React from 'react';
import { LayoutDashboard, Users, CheckSquare, Settings } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItem> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-8 px-4">
        <Users className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">LocalCRM</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem
          label="Dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          active={activeView === 'dashboard'}
          onClick={() => onViewChange('dashboard')}
        />
        <NavItem
          label="Contacts"
          icon={<Users className="w-5 h-5" />}
          active={activeView === 'contacts'}
          onClick={() => onViewChange('contacts')}
        />
        <NavItem
          label="Tasks"
          icon={<CheckSquare className="w-5 h-5" />}
          active={activeView === 'tasks'}
          onClick={() => onViewChange('tasks')}
        />
        <NavItem
          label="Settings"
          icon={<Settings className="w-5 h-5" />}
          active={activeView === 'settings'}
          onClick={() => onViewChange('settings')}
        />
      </nav>
    </div>
  );
};