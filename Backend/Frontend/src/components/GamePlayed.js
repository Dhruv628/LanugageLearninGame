import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";

const GamePlayed = (props) => {
  const { id } = useParams();
  const [results, setresults] = useState();

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(
        `http://localhost:5000/api/session/user/session/${id}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
      console.log(response.session.totalScore.easy.score);
      setresults(response.session.totalScore);
    };
    fetchGame();
  }, [id]);

  //   Calculate percentages
  const easyPercentage =
    (results && results.easy.scored / results.easy.score) * 100;
  const intermediatePercentage =
    (results && results.intermediate.scored / results.intermediate.score) * 100;
  const advancedPercentage =
    (results && results.advanced.scored / results.advanced.score) * 100;
  const totalPercentage =
    (results && results.totalScored.scored / results.totalScored.score) * 100;

  return (
    <div className="flex h-[90.7vh] py-10 md:py-0 bg-blue-100 flex-col items-center">
      <div className="flex w-[100%] items-center justify-evenly ]">
          {/* Easy percentage  */}
        <div>
          <h2 className=" text-lg md:text-2xl text-blue-500 mt-5 mb-2">Easy</h2>
          <CircularProgressbar
            className=" h-24 w-24 md:h-[10rem] md:w-[10rem]"
            value={easyPercentage}
            text={`${easyPercentage.toFixed(2)}%`}
            styles={{
              path: {
                stroke: "#3182CE",
                strokeLinecap: "butt", // To create a progress pie chart that fills from the bottom left
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              text: {
                fill: "#3182CE",
                fontSize: "12px",
              },
            }}
          />
          <div className="md:text-lg my-2 text-blue-400">
            {results && results.easy.scored} / {results && results.easy.score}
          </div>
        </div>
         {/* Intermediate percentage  */}
        <div>
          <h2 className="text-lg md:text-2xl text-blue-500 mt-5 mb-2">
            Intermediate
          </h2>
          <CircularProgressbar
            className=" h-24 w-24 md:h-[10rem] md:w-[10rem]"
            value={intermediatePercentage}
            text={`${intermediatePercentage.toFixed(2)}%`}
            styles={{
              path: {
                stroke: "#3162CE",
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              text: {
                fill: "#3162CE",
                fontSize: "12px",
              },
            }}
          />
          <div className="md:text-lg my-2 text-blue-400">
            {results && results.intermediate.scored} /{" "}
            {results && results.intermediate.score}
          </div>
        </div>
         {/* Advanced percentage  */}
        <div>
          <h2 className="text-lg md:text-2xl text-blue-500 mt-5 mb-2">
            Advanced
          </h2>
          <CircularProgressbar
            className=" h-24 w-24 md:h-[10rem] md:w-[10rem]"
            value={advancedPercentage}
            text={`${advancedPercentage.toFixed(2)}%`}
            styles={{
              path: {
                stroke: "#4F46E5",
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              text: {
                fill: "#4F46E5",
                fontSize: "12px",
              },
            }}
          />
          <div className="md:text-lg my-2 text-blue-400">
            {results && results.advanced.scored} /{" "}
            {results && results.advanced.score}
          </div>
        </div>
      </div>
      {/* Total Percentage  */}
      <div>
        <h2 className="text-2xl text-blue-600 mt-5 mb-2">Total</h2>
        <CircularProgressbar
          className="h-[10rem] w-[10rem] md:h-[13rem] md:w-[13rem]"
          value={totalPercentage}
          text={`${totalPercentage.toFixed(2)}%`}
          styles={{
            path: {
              stroke: "#4F46E5",
              strokeLinecap: "butt",
              transition: "stroke-dashoffset 0.5s ease 0s",
            },
            text: {
              fill: "#4F46E5",
              fontSize: "12px",
            },
          }}
        />
        <div className="text-lg my-2 text-blue-400">
          {results && results.totalScored.scored} /{" "}
          {results && results.totalScored.score}
        </div>
      </div>
    </div>
  );
};

export default GamePlayed;
