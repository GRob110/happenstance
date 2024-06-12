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
                const lastTab = await getMostRecentActiveTab(user!.sub!, accessToken);
                console.log("lastTab: ", lastTab.data);
                return lastTab.data;
            }
        }
        const activeTabData = await activeTab();
        if (activeTabData) {
            await saveActiveTab(user!.sub!, activeTabData, accessToken);
        } else {
            console.log("No active tab data");
        }
    };

    return (
        <button onClick={handleToggle}>
            {isOnline ? "You're Offline" : "You're Online"}
        </button>
    );
};