import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ContactList } from './components/ContactList';
import { TaskList } from './components/TaskList';
import { AuthGuard } from './components/auth/AuthGuard';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'contacts' && <ContactList />}
          {activeView === 'tasks' && <TaskList />}
          {activeView === 'settings' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
              <p className="text-gray-600 mt-4">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

export default App;