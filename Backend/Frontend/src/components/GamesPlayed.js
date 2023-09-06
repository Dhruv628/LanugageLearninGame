import React, { useEffect, useState } from "react";

import ScoreCard from "./ScoreCard";

const GamesPlayed = () => {
  const [Games, setGames] = useState([]);
  const [GamesDate, setGamesDate] = useState();
  const [id, setid] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //Fetching the TOKEN
    function getCookie(name) {
      const cookieName = `${name}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    }
    const tokn = getCookie("authtoken");
    //Fetching USER GAMES
    const fetchGames = async () => {
      const response = await fetch(
        "http://localhost:5000/api/session/user/sessions",
        {
          method: "GET",
          headers: {
            token: tokn,
          },
        }
      ).then((res) => res.json());
      // Sort the Games by date and time
      const sortedGames = response.Sessions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setGames(sortedGames);
    };
    fetchGames();
  }, [currentPage]);

  //Pagination
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const gamesToDisplay = Games.slice(startIndex, endIndex);
  const moreElementsRemaining = endIndex < Games.length;

  return (
    <>
      <div
        id="Games"
        className='py-2 bg-[url("https://images03.nicepage.com/c461c07a441a5d220e8feb1a/caf57d9ff38259f88bf67bb9/sdc-min.jpg")]'
      >
        <div className="flex flex-wrap justify-center">
          {gamesToDisplay.map((e, index) => {
            return (
              // Score Card 
              <div key={index}>
                <ScoreCard e={e} />
              </div>
            );
          })}
        </div>
        {/* Page buttons  */}
        <div className="flex justify-center mt-1">
          {currentPage === 1 ? (
            ""
          ) : (
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mr-2 px-3 py-1 rounded-sm border text-white transition duration-150 hover:bg-white hover:text-blue-500 hover: border-white`}
            >
              <i class="fa fa-arrow-left text-sm" aria-hidden="true"></i> Prev
            </button>
          )}
          {!moreElementsRemaining ? (
            ""
          ) : (
            <button
              onClick={nextPage}
              className={`mr-2 px-3 py-1 rounded-sm border text-white transition duration-150 hover:bg-white hover:text-blue-500 hover: border-white`}
            >
              Next <i class="fa fa-arrow-right text-sm" aria-hidden="true"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesPlayed;
