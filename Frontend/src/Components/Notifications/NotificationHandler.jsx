import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import TourResponseNotification from './TourResponseNotification'
import TournamentInvitation from './TourInvitation'
import GameRequest from './GameRequest'

function NotificationHandler() {

    const { socket, socketMessage } = useAuth();



    useEffect(() => {
        if (socketMessage) {
            console.log("the socket message is ", socketMessage)
            if (socketMessage.type === 'game_request') {
                toast.custom((t) => (
                    <GameRequest t={t} toast={toast} socketMessage={socketMessage} socket={socket} />
                ))
            }
            if (socketMessage.type === 'tour_invite') {
                toast.custom((t) => (
                    <TournamentInvitation t={t} toast={toast} socketMessage={socketMessage} socket={socket} />
                ))
            }
            if (socketMessage.type == 'tour_accept') {
                toast.custom((t) => (
                    <TourResponseNotification toast={toast} t={t} socketMessage={socketMessage} />
                ))
            }
            if (socketMessage.type === 'next_matchtour') {
                toast(
                    socketMessage.message,
                    {
                        duration: 8000,
                    }
                );
            }
        }
    }, [socketMessage])

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: '',
                duration: 5000,
                style: {
                    background: 'white',
                    color: '#000',
                },
            }}
        />
    )
}

export default NotificationHandler;