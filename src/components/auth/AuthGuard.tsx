import React from 'react';
import { useCRMStore } from '../../store';
import { AuthLayout } from './AuthLayout';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { auth } = useCRMStore();
  const [isSignIn, setIsSignIn] = React.useState(true);

  if (!auth.isAuthenticated) {
    return (
      <AuthLayout title={isSignIn ? 'Sign in to your account' : 'Create your account'}>
        {isSignIn ? (
          <SignInForm onToggleForm={() => setIsSignIn(false)} />
        ) : (
          <SignUpForm onToggleForm={() => setIsSignIn(true)} />
        )}
      </AuthLayout>
    );
  }

  return <>{children}</>;
};