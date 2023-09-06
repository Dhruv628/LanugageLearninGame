import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const LBscoreCard = (props) => {
    const navigate=useNavigate();
    const {e}=props;
    
  const convertDate=(value)=>{
    // const timestamp = response.user.date;
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
    <div className="mx-8">
      {/* To Score Card  */}
      <button
        onClick={() => navigate(`/game/${e._id}`)}
        className="rounded-md hover:scale-105 transition duration-150 text-black bg-transparent lg:w-[17vw] "
      >
        <div>
          {/* Total Percentage and score  */}
          <div className="text-sm py-4 ">{convertDate(e.date)}</div>
          <CircularProgressbar
            className=" h-[9rem] w-[9rem]"
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
          {/* Total Score  */}
          <div className=" my-2">
            {e.totalScore.totalScored.scored} / {e.totalScore.totalScored.score}
          </div>
        </div>
      </button>
    </div>
  );
};

export default LBscoreCard;
