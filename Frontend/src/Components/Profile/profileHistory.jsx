import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function Match_victory({ match }) {
  const { t } = useTranslation();
  return (
    (match.player1 && match.player2) && <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90 bg-green-800">
      <hr className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-green-400" />
      <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20 ">
            <img
              src={match.player1.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player1.username}</h3>
        </div>
        <div className="flex flex-col sm:gap-y-2">
          <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">
            {t("VICTORY")}
          </h2>
          <p className="xsm:text-xs sm:text-md">
            {match.score1} - {match.score2}
          </p>
          <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">
            {match.game_type}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
            <img
              src={match.player2.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player2.username}</h3>
        </div>
      </div>
    </div>
  );
}

function Match_defeat({ match }) {
  const { t } = useTranslation();
  return (
    (match.player1 && match.player2) && <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90 bg-red-800">
      <hr className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-red-400" />
      <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
            <img
              src={match.player1.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player1.username}</h3>
        </div>
        <div className="flex flex-col sm:gap-y-2">
          <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">
            {t("DEFEAT")}
          </h2>
          <p className="xsm:text-xs sm:text-md">
            {match.score1} - {match.score2}
          </p>
          <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">
            {match.game_type}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
            <img
              src={match.player2.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player2.username}</h3>
        </div>
      </div>
    </div>
  );
}

function Match_draw({ match }) {
  const { t } = useTranslation();
  return (
    (match.player1 && match.player2) && <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90 bg-gray-600">
      <hr className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-gray-400" />
      <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
            <img
              src={match.player1.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player1.username}</h3>
        </div>
        <div className="flex flex-col sm:gap-y-2">
          <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">
            {t("DRAW")}
          </h2>
          <p className="xsm:text-xs sm:text-md">
            {match.score1} - {match.score2}
          </p>
          <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">
            {match.game_type}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
            <img
              src={match.player2.profile_image}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="xsm:text-xs sm:text-lg">{match.player2.username}</h3>
        </div>
      </div>
    </div>
  );
}

async function getAllMatches(tokens, userId, customFetch) {
  try {
      const response = await customFetch(
        `/api/users/profile/match/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: "JWT " + tokens.access,
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        return data;
      }
      return null;
  } catch (error) {
      return null;
  }
}

function Profile_history({ user }) {
  const { t } = useTranslation();
  const { tokens, customFetch } = useAuth();
  const [matches, setMatches] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllMatches(tokens, user, customFetch);
      if(data){
          data.sort((a, b) => {
            return a.created < b.created;
          });
          setMatches(() => data);
      }
    };
    fetchData();
  }, [user]);
  
  return (
    <div className="bg-secondaryColor text-center p-6  rounded-3xl grow">
      <h2 className="text-4xl font-semibold mb-8">{t("MATCH HISTORY")}</h2>
      <div className="h-5/6 overflow-scroll ">
        {matches  &&
          matches.map((match, index) =>
            match.player1 && match.player2  && match.winner ? (
              match.winner.id == user ? (
                <Match_victory key={index}  match={match} />
              ) : (
                <Match_defeat key={index} match={match} />
              )
            ) : (
              <Match_draw key={index} match={match} />
            )
          )}
      </div>
    </div>
  );
}

export default Profile_history;