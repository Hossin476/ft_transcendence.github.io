import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import CreateTournament from "../Components/tour/CreateTournament";
import HistoryAndInvites from "../Components/tour/HistoryAndInvites";
import Header from "../Components/tour/Header";


const getTours = async (userId, tokens, customFetch) => {
    try {
        const response = await customFetch(`/api/tournament/tourlist/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'JWT ' + tokens.access
            }
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
        return null
    } catch (error) {
        return null
    }
}

export default function Chat() {

    const [tours, setTours] = useState(null)
    const [tournamentName, setTournamentName] = useState("")
    const { tokens, user, socketMessage, socket, customFetch } = useAuth()


    const fetchTours = async () => {
        const data = await getTours(user.user_id, tokens, customFetch)
        setTours(() => data)
    }

    useEffect(() => {
        fetchTours();
    }, [])

    useEffect(() => {

        if (socket && socketMessage) {
            const { type, response } = socketMessage
            if (type === "tour_accept" && response === "accepted") {
                fetchTours();
            }
        }
    }, [socketMessage])

    return (
            <div className="flex-1 h-[90%] flex items-center   justify-center">
                <div className="h-[90%] w-[90%] flex flex-col rounded-lg border-[2px] border-thirdColor bg-secondaryColor  items-center py-20">
                    <Header />
                    <CreateTournament setTournamentName={setTournamentName} tournamentName={tournamentName} setTours={setTours} />
                    <HistoryAndInvites tours={tours} />
                </div>
            </div>
    )
}