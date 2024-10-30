import { create } from 'zustand';
import { Contact, Task, User, AuthState } from './types';

interface CRMStore {
  contacts: Contact[];
  tasks: Task[];
  auth: AuthState;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company?: string) => Promise<void>;
  signOut: () => void;
}

export const useCRMStore = create<CRMStore>((set) => ({
  contacts: [],
  tasks: [],
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, { ...contact, id: crypto.randomUUID() }],
    })),
  updateContact: (id, contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === id ? { ...c, ...contact } : c
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
    })),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),
  signIn: async (email: string, password: string) => {
    set((state) => ({
      auth: { ...state.auth, isLoading: true, error: null },
    }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email === 'demo@example.com' && password === 'demo') {
        const user: User = {
          id: '1',
          email,
          name: 'Demo User',
          company: 'Demo Company',
        };
        set((state) => ({
          auth: {
            ...state.auth,
            user,
            isAuthenticated: true,
            isLoading: false,
          },
        }));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        },
      }));
    }
  },
  signUp: async (email: string, password: string, name: string, company?: string) => {
    set((state) => ({
      auth: { ...state.auth, isLoading: true, error: null },
    }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user: User = {
        id: crypto.randomUUID(),
        email,
        name,
        company,
      };
      set((state) => ({
        auth: {
          ...state.auth,
          user,
          isAuthenticated: true,
          isLoading: false,
        },
      }));
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        },
      }));
    }
  },
  signOut: () => {
    set((state) => ({
      auth: {
        ...state.auth,
        user: null,
        isAuthenticated: false,
      },
    }));
  },
}));