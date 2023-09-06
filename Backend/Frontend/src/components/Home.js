import React, { useEffect, useState } from "react";
import Bg from "../assets/img/Bg.svg";
import Bg1 from "../assets/img/Bg1.svg";
import { Link } from "react-router-dom";
import AvailaibleGames from "./AvailaibleGames";

const Home = () => {
  const [Token, setToken] = useState("");

  useEffect(() => {
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
    setToken(tokn);
  }, []);

  return (
    <>
      <div
        id="Home"
        className="px-10 md:px-0 lg:px-10 md:py-10 flex-col space-y-12 md:space-y-0 flex md:flex-row space-x-5 md:justify-evenly items-center min-h-[90vh] z-10"
      >
         {/* Image  */}
         <div>
          <img className="z-20 h-[38vh] md:h-[60vh]" src={Bg1} alt="" />
        </div>
        {/* Other  */}
        <div style={{fontFamily:"'Nunito', sans-serif"}} className="z-30 text-zinc-950 flex tracking-wider flex-col items-start" >
          <h1 className="lg:text-[1.5rem] font-bold">LEARN ANYTIME, ANYWHERE.</h1>
          <h2 className="text-5xl md:text-[4rem] lg:text-[5rem] mt-3 md:mt-5 lg:mt-5 font-bold">LANGUAGE</h2>
          <h2 className="text-5xl md:text-[4rem] lg:text-[5rem] mt-3  md:mt-5 lg:mt-5 font-bold">LEARNING</h2>
          <h2 className="text-5xl md:text-[4rem] lg:text-[5rem] mt-3 md:mt-5 lg:mt-5 font-bold">ONLINE</h2>
          {}
          {Token !== "" ? (
            <Link
              className="lg:px-6 px-3 py-2 text-sm mt-5 lg:py-2 lg:mt-3 lg:text-lg font-semibold bg-black bg-opacity-80 text-white rounded-sm transition-all duration-75 hover:bg-white hover:border-transparent hover:text-black"
              to="/allgames"
            >
            Start Playing
            </Link>
          ) : (
            <Link
              className="lg:px-6 px-3 py-2 text-sm mt-5 lg:py-2 lg:mt-3 lg:first-line:text-lg font-semibold bg-black bg-opacity-80 text-white rounded-sm transition-all duration-75 hover:bg-white hover:border-transparent hover:text-black"
              to="/login "
            >
             Start Playing
            </Link>
          )}
        </div>
       
      </div>
    </>
  );
};

export default Home;
