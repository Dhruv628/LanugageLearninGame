import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LBscoreCard from "./LBscoreCard";

const Leaderboard = () => {
  const [Games, setGames] = useState([]);

  useEffect(() => {
    // Fetching all GAMES
    const fetchGames = async () => {
      const response = await fetch(
        "http://localhost:5000/api/session/all/sessions",
        {
          method: "GET",
        }
      ).then((res) => res.json());

      if (response.Sessions && response.Sessions.length > 0) {
        const sortedGames = response.Sessions.sort(
          (a, b) =>
            b.totalScore.totalScored.scored - a.totalScore.totalScored.scored
        );
        setGames(sortedGames);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="grid bg-[url('https://images03.nicepage.com/c461c07a441a5d220e8feb1a/caf57d9ff38259f88bf67bb9/sdc-min.jpg')]  px-4 py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Games.map((e, index) => (
        <div
          className={`bg-blue-50 rounded-lg shadow-md p-4 md:p-6 lg:p-8`}
          key={index}
        >
          <div className="flex items-center justify-between">
            {/* Ranking number  */}
            <div className="flex items-center space-x-2">
              <div
                className={`text-2xl font-semibold ${
                  index === 0 ? "text-yellow-800" : "text-gray-700"
                }`}
              >
                #{index + 1}
              </div>
              <i className="fas fa-trophy text-yellow-500"></i>
            </div>
            {/* Top right percentage  */}
            <div className="w-20">
              <CircularProgressbar
                value={
                  (e.totalScore.totalScored.scored /
                    e.totalScore.totalScored.score) *
                  100
                }
                text={`${(
                  (e.totalScore.totalScored.scored /
                    e.totalScore.totalScored.score) *
                  100
                ).toFixed(2)}%`}
                styles={{
                  root: { width: "100%" },
                  text: {
                    fontSize: "16px",
                    fill: index === 0 ? "#FFC107" : "#888",
                  },
                  path: { stroke: index === 0 ? "#FFC107" : "#888" },
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            {/* Score */}
            <div className="mb-4">
              <LBscoreCard e={e} />
            </div>

            {/* User */}
            <div className="flex items-center space-x-2">
              <i className="far fa-user text-gray-600"></i>
              <div className="text-lg font-semibold">Name:</div>
              <div className="text-xl border-b border-gray-300">
                {e.user.name}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <i className="far fa-envelope text-gray-600"></i>
              <div className="text-lg font-semibold">Email:</div>
              <div className="text-xl border-b border-gray-300">
                {e.user.email}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
