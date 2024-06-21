import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { PageLayout } from '../components/page-layout';
import { Sidebar } from '../components/sidebar';
import { Opening } from '../components/opening';
import { AllUsersList } from '../components/all-users-list';
import { UserHistory } from '../components/user-history';
import '../styles/main.css';

export const HomePage: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <PageLayout>
      {user ? (
        <>
          <Sidebar />
          <div className="main-content">
            <h1 className="content__title text-center text-3xl font-bold my-6">
              Happenstance
            </h1>
            <UserHistory />
            <AllUsersList />
          </div>
        </>
      ) : (
        <Opening />
      )}
    </PageLayout>
  );
};
