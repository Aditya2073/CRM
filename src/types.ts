export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'lead' | 'customer' | 'inactive';
  lastContact: string;
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  contactId?: string;
}

export interface DashboardMetrics {
  totalContacts: number;
  activeCustomers: number;
  pendingTasks: number;
  recentLeads: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}