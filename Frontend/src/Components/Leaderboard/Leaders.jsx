import React from 'react'
import { Medal, Crown } from 'lucide-react'
import { FaMedal } from "react-icons/fa6";
import { useTranslation } from 'react-i18next'

function Card({ children, className }) {
    return (
        <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
            {children}
        </div>
    )
}

function Leaders({ leaderboardData }) {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {leaderboardData.slice(0, 3).map((player, index) => (
                <Card key={player.username} className={`flex items-center p-4 ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-yellow-900"}`}>
                    <div className={`relative flex h-10  w-10 shrink-0 overflow-hidden rounded-full`}>
                        <img className="h-full w-full object-cover " src={'http://localhost:8000' + player.profile_image} alt={player.username || ''} />
                    </div>
                    <div className='ml-3'>
                        <p className="font-semibold text-xl">{player.username}</p>
                        <p className="text-sm">{t("Wins")}: {player.wins}</p>
                        <p className="text-sm">{t("Win Rate")}: {player.win_rate}%</p>
                    </div>
                    {index === 0 ? <Crown className="ml-auto h-8 w-8" /> : index === 1 ? <Medal className="ml-auto h-8 w-8" /> : <FaMedal className="ml-auto h-8 w-8" />}
                </Card>
            ))}
        </div>
    )
}

export default Leaders