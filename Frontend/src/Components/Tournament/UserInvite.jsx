import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next'

function UserInvite({user, tour_id, setUsers }) {
    const { socket } = useAuth()
    const { t } = useTranslation()

    function send_tour_invite() {
        if (socket) {
            const message = JSON.stringify({
                "type": 'tour_invite',
                "tour_id": tour_id,
                "receiver": {
                "id": user.id,
                "username": user.username
                }
            })
            socket.send(message);
            setUsers(prevUsers => prevUsers.filter(users => users.username !== user.username));
        }
    }

    return (
        <div className="w-[100%] relative h-[5rem] rounded-lg mt-4 shadow-lg flex justify-center items-center bg-gray-200">
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 my-auto ml-4">
                <img src={user.profile_image} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="flex-grow ml-4">
                <h3 className="text-black text-lg my-auto max-w-[15rem] flex-wrap">
                    {user.username}
                </h3>
                <p className="text-sm text-gray-400 ">{t("Rank")} {user.rank}</p>
            </div>
            <button className="w-[6rem] flex align-center justify-center py-3.5 px-6 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-600 focus:outline-none" onClick={send_tour_invite}>{t("Invite")}</button>
        </div>
    )
}

export default UserInvite