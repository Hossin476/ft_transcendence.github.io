import { useEffect, useState, useCallback } from 'react';
import Request from "./Request";
import Blocked from "./Blocked";
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Manage() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState("requests");
    const { tokens, socketMessage } = useAuth();
    const [friends, setFriends] = useState([]);
    const BASE_URL = '/api/notification/friends';

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL}/?type=${selected}`, {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setFriends(data);
        } catch (error) {
            console.error('Fetch failed: ', error);
            setFriends([]);
        }
    }, [selected, tokens.access, setFriends]);

    useEffect(() => {
        fetchData();
    }, [fetchData, socketMessage]);

    const handleSelection = (type) => {
        if (type !== selected)
            setSelected(type);
    };

    return (
        <div className="w-full h-[100%] sm:p-8">
            <div className="flex justify-center xsm:mb-8 sm:mb-12 sm:text-2xl font-semibold gap-x-8 items-center">
                <button onClick={() => handleSelection('blocked')} className={`${selected === 'blocked' ? 'text-thirdColor border-b-4 border-thirdColor' : ''} h-12`}>{t("Blocked")}</button>
                <button onClick={() => handleSelection('requests')} className={`${selected === 'requests' ? 'text-thirdColor border-b-4 border-thirdColor' : ''} h-12`}>{t("Requests")}</button>
            </div>
            <div className="w-full sm:px-4 h-[95%] overflow-scroll border border-thirdColor">
                {
                    friends.map((item, index) => {
                        if (item.type === 'blocked')
                            return <Blocked key={item.blocked_user || index} friends={item} setFriends={setFriends} />
                        else if (item.type === 'requests')
                            return <Request key={item.from_user || index} friends={item} setFriends={setFriends} />
                        return null;
                    })
                }
            </div>
        </div>
    );
}