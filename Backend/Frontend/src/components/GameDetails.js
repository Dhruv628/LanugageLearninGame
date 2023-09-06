import React from "react";
import { Link } from "react-router-dom";

const GameDetails = () => {
  return (
    <>
      <div
        style={{ fontFamily: "'Nunito', sans-serif" }}
        className="h-[90vh] sm:px-20 xs:h-[70vh] md:h-[80vh] xl:h-[86vh]  py-6 md:py-0 mt-6 flex items-center px-3 md:px-0 justify-center z-50 "
      >
        <div className="bg-white text-black w-full space-y-8 md:space-y-8 p-3 max-w-xl md:px-20 md:py-5 xl:py-8 rounded-lg border  shadow-sm">
          {/* Heading  */}
          <h1 className="text-xl md:text-3xl text-black tracking-wider font-semibold text-start mb-4">
            WELCOME TO THE GAME
          </h1>
          {/* Subheading  */}
          <p className="text-lg text-black mb-6 text-start">
            Improve your proficiency by playing this exciting trivia game. Here
            are the details of the game:
          </p>
          {/* Points  */}
          <div className=" text-sm md:text-lg space-y-2 md:space-y-1 xl:space-y-3 flex flex-col items-start text-start text-black">
            {/* #1  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>Reloading the page will reset the game.</div>
            </div>
            {/* #2  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>
                Easy questions are worth <span class="text-blue-500">1</span>{" "}
                mark.
              </div>
            </div>
            {/* #3  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>
                Intermediate questions are worth{" "}
                <span class="text-blue-500">3</span> marks.
              </div>
            </div>
            {/* #4  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>
                Advanced questions are worth{" "}
                <span class="text-blue-500">5</span> marks.
              </div>
            </div>
            {/* #5  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>
                There will be a total of <span class="text-blue-500">15</span>{" "}
                questions.
              </div>
            </div>
            {/* #6  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>There is no time limit.</div>
            </div>
            {/* #7  */}
            <div className="mb-2 flex space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>Once a question is attempted, it cannot be reattempted.</div>
            </div>
            {/* #8  */}
            <div className="mb-2 flex  space-x-2">
              <div>
                <i class="fa fa-check-circle fa-fw text-green-500"></i>
              </div>
              <div>
                The game will include all 3 types of questions: Easy,
                Intermediate, and Advanced.
              </div>
            </div>
          </div>
          {/* #Start the game */}
          <Link
            to="/start"
            className=" text-black transition duration-75 ease-linear focus:text-blue-600 focus:border-b-blue-500 focus:bg-white hover:text-blue-600 hover:border-b-blue-500 hover:bg-white border-b border-b-black lg:tracking-widest float-right text-lg rounded-sm"
          >
            Start <i class=" text-sm fa-solid fa-arrow-right-long"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
