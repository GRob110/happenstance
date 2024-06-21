import React from 'react';
import { PageLayout } from '../components/page-layout';
import { LoginForm } from '../components/forms/login-form';

export const LoginPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen my-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-4">Log In</h2>
          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
};