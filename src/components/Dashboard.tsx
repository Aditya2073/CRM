import React from 'react';
import { Users, UserCheck, ClipboardList, TrendingUp } from 'lucide-react';
import { useCRMStore } from '../store';

const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { contacts, tasks } = useCRMStore();
  
  const metrics = {
    totalContacts: contacts.length,
    activeCustomers: contacts.filter((c) => c.status === 'customer').length,
    pendingTasks: tasks.filter((t) => t.status === 'pending').length,
    recentLeads: contacts.filter((c) => c.status === 'lead').length,
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contacts"
          value={metrics.totalContacts}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <MetricCard
          title="Active Customers"
          value={metrics.activeCustomers}
          icon={<UserCheck className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
        <MetricCard
          title="Pending Tasks"
          value={metrics.pendingTasks}
          icon={<ClipboardList className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <MetricCard
          title="Recent Leads"
          value={metrics.recentLeads}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          color="bg-purple-50"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Contacts</h3>
          <div className="space-y-4">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  contact.status === 'customer'
                    ? 'bg-green-100 text-green-700'
                    : contact.status === 'lead'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};