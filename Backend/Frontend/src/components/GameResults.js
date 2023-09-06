import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const GameResults = (props) => {
  const { results } = props;

  // Calculate percentages
  const easyPercentage = (results.easy.scored / results.easy.score) * 100;
  const intermediatePercentage =
    (results.intermediate.scored / results.intermediate.score) * 100;
  const advancedPercentage =
    (results.advanced.scored / results.advanced.score) * 100;
  const totalPercentage =
    (results.totalScored.scored / results.totalScored.score) * 100;

  return (
    <div className="flex h-[90.7vh] py-10 lg:py-0 bg-blue-100 flex-col items-center">
      <div className="flex w-[100%] items-center justify-evenly ]">
        {/* Easy  */}
        <div>
          <h2 className=" text-lg lg:text-2xl text-blue-500 mt-5 mb-2">Easy</h2>
          <CircularProgressbar
            className=" h-24 w-24 lg:h-[10rem] lg:w-[10rem]"
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
          <div className="lg:text-lg my-2 text-blue-400">
            {results.easy.scored} / {results.easy.score}
          </div>
        </div>
        {/* Intermediate  */}
        <div>
          <h2 className="text-lg lg:text-2xl text-blue-500 mt-5 mb-2">
            Intermediate
          </h2>
          <CircularProgressbar
            className=" h-24 w-24 lg:h-[10rem] lg:w-[10rem]"
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
          <div className="lg:text-lg my-2 text-blue-400">
            {results.intermediate.scored} / {results.intermediate.score}
          </div>
        </div>
        {/* Advanced  */}
        <div>
          <h2 className="text-lg lg:text-2xl text-blue-500 mt-5 mb-2">
            Advanced
          </h2>
          <CircularProgressbar
            className=" h-24 w-24 lg:h-[10rem] lg:w-[10rem]"
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
          <div className="lg:text-lg my-2 text-blue-400">
            {results.advanced.scored} / {results.advanced.score}
          </div>
        </div>
      </div>
      {/* Total  */}
      <div>
        <h2 className="text-2xl text-blue-600 mt-5 mb-2">Total</h2>
        <CircularProgressbar
          className="h-[10rem] w-[10rem] lg:h-[13rem] lg:w-[13rem]"
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
          {results.totalScored.scored} / {results.totalScored.score}
        </div>
        <Link
          to="/"
          className="border-b border-b-blue-500 text-blue-500 hover:scale-105 hover:text-blue-600 hover:border-b-blue-600 text-xl right-[19vw] -translate-y-9 absolute"
        >
          Finish
        </Link>
      </div>
    </div>
  );
};

export default GameResults;
