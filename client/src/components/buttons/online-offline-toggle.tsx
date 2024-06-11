import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveActiveTab, getMostRecentActiveTab } from "../../services/user.service";

export const OnlineOfflineToggle: React.FC = () => {
    const [isOnline, setIsOnline] = useState(true);
    const { user, getAccessTokenSilently } = useAuth0();

    const handleToggle = async() => {
        setIsOnline(!isOnline);
        const accessToken = await getAccessTokenSilently();
        const activeTab = async () => {
            if (!isOnline) {
                return {
                    url: "offline",
                    timestamp: new Date(),
                    title: "offline",
                };
            } else {
                return await getMostRecentActiveTab(user!.sub!, accessToken);
            }
        }
        const activeTabData = await activeTab();
        await saveActiveTab(user!.sub!, activeTabData, accessToken);
    };

    return (
        <button onClick={handleToggle}>
            {isOnline ? "Offline" : "Online"}
        </button>
    );
};