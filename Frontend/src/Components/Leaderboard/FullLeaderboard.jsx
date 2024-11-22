import React from "react";
import { useTranslation } from "react-i18next";

function FullLeaderboard({ leaderboardData }) {

  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="overflow-auto w-full">
        <table className="text-sm text-left w-full table-auto sm:table-fixed">
          <thead className="text-xs uppercase bg-gray-700 sticky top-0">
            <tr>
              <th className="px-2 py-3 w-1/5 xsm:w-auto">{t("Rank")}</th>
              <th className="px-2 py-3 w-1/5 xsm:w-auto">{t("player")}</th>
              <th className="px-2 py-3 w-1/5 xsm:w-auto">{t("Games Won")}</th>
              <th className="px-2 py-3 w-1/5 xsm:w-auto">{t("Games Lost")}</th>
              <th className="px-2 py-3 w-1/5 xsm:w-auto">{t("Win Rate")}</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {leaderboardData.map((player) => (
              <tr key={player.username} className="border-b border-gray-700">
                <td className="px-2 py-3 w-1/5 xsm:w-auto">{player.rank}</td>
                <td className="px-2 py-3 w-1/5 xsm:w-auto">
                  {player.username}
                </td>
                <td className="px-2 py-3 w-1/5 xsm:w-auto">{player.wins}</td>
                <td className="px-2 py-3 w-1/5 xsm:w-auto">{player.loses}</td>
                <td className="px-2 py-3 w-1/5 xsm:w-auto">
                  {player.win_rate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullLeaderboard;
