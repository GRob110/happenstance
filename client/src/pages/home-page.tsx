import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";
import { getAllUsers, getUserData, saveUserData } from "../services/user.service";
import { PageLoader } from "../components/page-loader";

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [protectedMessage, setProtectedMessage] = useState<string>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const { getAccessTokenSilently, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const fetchUserDatandMessage = async () => {
      if (!isAuthenticated || !user || !user.sub) {
        console.log('User not authenticated');
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        console.log('accessToken: ', accessToken);

        await saveUserData(
          user.sub, 
          { 
            userId: user.sub, 
            name: user.name, 
            email: user.email,
            friends: [],
          }, 
          accessToken
        );

        console.log('Saved user data');

        const [
          { data: userData, error: userError }, 
          { data: messageData, error: messageError },
          { data: usersData, error: usersError}
        ] = await Promise.all([
          getUserData(user.sub, accessToken),
          getProtectedResource(accessToken),
          getAllUsers(accessToken),
        ]);

        window.postMessage({ 
          type: 'STORE_TOKEN',
          token: accessToken,
          userId: user.sub,
        }, '*');

        if (!isMounted) {
          return;
        }

        if (userData) {
          setUserData(userData);
          console.log('Fetched user data: ', userData);
        } else if (userError) {
          console.error(userError);
        }

        if (messageData) {
          setProtectedMessage(JSON.stringify(messageData, null, 2));
        } else if (messageError) {
          console.log(JSON.stringify(messageError, null, 2));
        }

        if (Array.isArray(usersData)) {
          setAllUsers(usersData);
          console.log('Fetched all users: ', usersData);
        } else if (usersError) {
          console.error(usersError);
        }

      } catch (error: any) {
        console.error(error);
      }
    };

    if (isAuthenticated && user && user.sub) {
      fetchUserDatandMessage();
    }

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, isAuthenticated, user]);

  console.log('isAuthenticated: ', isAuthenticated);
  console.log('message: ', protectedMessage);

  const handleAddFrend = async (friendUserId: string) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const updatedUser = {
        ...userData,
        friends: [...(userData.friends || []), friendUserId],
      };
      await saveUserData(user!.sub!, updatedUser, accessToken);
      setUserData(updatedUser);
      } catch (error) {
        console.error('Error adding friend',error);
      }
    };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Happenstance
          </h1>
          {isAuthenticated && (
            <div className="content__body">
              <p id="page-description">
                <span>
                  Welcome, {userData ? userData.name : 'Guest'}!
                </span>
              </p>
              <div>
                <p>
                Here is your user information:
                </p>
                <pre>{userData && JSON.stringify(userData, null, 2)}</pre>
              </div>
              <div>
                <p>
                Here is your protected message:
                </p>
                <pre>{protectedMessage}</pre>
              </div>
              <h2>All Users</h2>
              <ul>
                {allUsers.map((u) => (
                  <li key={u.userId}>
                    {u.name} ({u.email}){' '}
                    {userData && userData.friends && !userData.friends.includes(u.userId) && (
                      <button onClick={() => handleAddFrend(u.userId)}>Add Friend</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isAuthenticated && (
            <div className="content__body">
              <p>Please login to see your user information and protected message.</p>
            </div>
          )}
        </div>
    </PageLayout>
  );
};
