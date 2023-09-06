import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const ScoreCard = (props) => {
    const navigate=useNavigate();
    const {e}=props;
    
  const convertDate=(value)=>{
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}  ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} (IST)`;
      return formattedDateTime;
  }
  return (
    <div className="mx-3 lg:mx-8 my-5">
      {/* to score card  */}
      <button
        onClick={() => navigate(`/game/${e._id}`)}
        className="rounded-md hover:scale-105 focus:scale-105 text-blue-600 border bg-blue-50 transition duration-150 w-[70vw] ss:w-[43vw] md:w-[25vw] p-4  "
      >
        <div>
          {/* Date  */}
          <div className="lg:text-sm text-xs py-3 lg:py-4 ">{convertDate(e.date)}</div>
          {/* Percentage  */}
          <CircularProgressbar
            className="h-[6rem] w-[6rem] lg:h-[10rem] lg:w-[10rem]"
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
          <div className="text-sm lg:text-base my-2">
            {e.totalScore.totalScored.scored} / {e.totalScore.totalScored.score}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ScoreCard;
