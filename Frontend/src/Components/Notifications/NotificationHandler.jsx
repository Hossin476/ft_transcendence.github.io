import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import TourResponseNotification from './TourResponseNotification'
import TournamentInvitation from './TourInvitation'
import GameRequest from './GameRequest'
import { useLocation } from "react-router"

function NotificationHandler() {

    const { socket, socketMessage } = useAuth();
    const location = useLocation();
    const gameType = location.pathname.split('/')[2] === "tictactoe" ? 'T' : 'P';

    useEffect(() => {
        if (socketMessage) {
            const data = socketMessage
            if (data.type === 'game_request') {
                toast.custom((t) => (
                    <GameRequest t={t} toast={toast} data={data} socketMessage={socketMessage} gameType={gameType} socket={socket} />
                ))
            }
            if (data.type === 'tour_invite') {
                toast.custom((t) => (
                    <TournamentInvitation t={t} toast={toast} data={data} socket={socket} />
                ))
            }
            if (data.type == 'tour_accept') {
                toast.custom((t) => (
                    <TourResponseNotification toast={toast} t={t} data={data} />
                ))
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