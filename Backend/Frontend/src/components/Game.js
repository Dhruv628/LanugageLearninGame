import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import gj4 from "../assets/img/gj4.svg";
import GameResults from "./GameResults";
const Game = () => {
  const [Questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [answered, setAnswered] = useState("");
  const [scored, setScored] = useState(0);
  const [session, setSession] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [results, setResults] = useState();
  // Shuffle function to randomize question order
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex,
      temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch("http://localhost:5000/api/game/get", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => res.json());

      setQuestions([
        ...shuffle(response.questions.filter((e) => e.score === 1).slice(0, 5)),
        ...shuffle(response.questions.filter((e) => e.score === 3).slice(0, 5)),
        ...shuffle(response.questions.filter((e) => e.score === 5).slice(0, 5)),
      ]);
    };
    fetchGame();
  }, [session]);

  // Handling Next Question
  const handleNextQuestion = () => {
    setCounter((prev) => prev + 1);
    const Thesession = {
      _id: Questions[counter]._id,
      question: Questions[counter].question,
      options: Questions[counter].options,
      answer: Questions[counter].answer,
      difficulty: Questions[counter].difficulty,
      language: Questions[counter].language,
      score: Questions[counter].score,
      answered: answered,
      scored: scored,
    };
    
    setSession([...session, Thesession]);
    console.log(session)
    setAnswered("");
    setScored(0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Helper function to get cookies
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

  // Submitting the game
  const handleSessionSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("authtoken"),
      },
      body: JSON.stringify({ session: session }),
    }).then((res) => res.json());
    if (response.success) {
      setResults(response.gameSession.totalScore);
      console.log(response)
      setResultDisplay(true);
    }
  };

  return (
    <>
      {resultDisplay ? (
        <>
          <GameResults results={results} />
        </>
      ) : (
        <>
          <div id="Game" className="bg-blue-100 h-[90.7vh] w-full py-10 ">
            {/* PLAYING the GAME */}
            {/*Q. Counter  */}
            <div className="lg:px-6">
              {counter < Questions.length && (
                <div className="relative my-2 h-4 px-2 lg:px-0 lg:w-[80vw]  m-auto">
                  <div
                    className={`h-1 bg-blue-300 rounded-full hidden lg:block`}
                  >
                    <div
                      className={` h-1 bg-blue-400 transition duration-500 rounded-full`}
                      style={{
                        width: `${(counter / (Questions.length - 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between  lg:-translate-y-[1.2rem]">
                    {Questions &&
                      Questions.map((element, index) => {
                        return (
                          <div
                            key={element._id}
                            className={`  rounded-sm text-xs sm:text-sm ${
                              counter >= index
                                ? " bg-blue-500 text-white "
                                : "bg-white  text-blue-500"
                            }  lg:py-[0.4rem] px-1 shadow  lg:w-8`}
                          >
                            {index + 1}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
             {/*Questions */}
            {counter < Questions.length ? (
              <>
                <div>
                  {Questions &&
                    Questions.map((element, index) => {
                      return (
                        <div
                          key={element._id}
                          className="flex flex-col space-y-4 items-center"
                        >
                            {/* Question / difficulty  */}
                          <div className="rounded-sm w-[95vw] lg:w-[80vw] justify-between flex items-center lg:text-xl  bg-white  text-blue-700 py-4 text-start my-4 px-4 mx-2">
                            <div>
                              Q.{index + 1}&nbsp; {element.question}
                            </div>
                            <div className=" shadow hidden lg:block text-sm lg:text-[1rem] text-blue-600 bg-white px-2 lg:px-4 py-1 rounded-md  tracking-widest translate-x-3 lg:translate-x-7 -translate-y-8">
                              {element.difficulty}
                            </div>
                            <div className=" shadow lg:hidden text-sm lg:text-[1rem] text-blue-600 bg-white px-2 lg:px-4 py-1 rounded-md  tracking-widest translate-x-3 lg:translate-x-7 -translate-y-8">
                              {element.difficulty.slice(0, 1).toUpperCase()}
                            </div>
                          </div>
                          {/* Options  */}
                          <div className="space-y-2">
                            {element.options.map((e, i) => {
                              return (
                                <button
                                  onClick={() => {
                                    setAnswered(e);
                                    e === element.answer
                                      ? setScored(element.score)
                                      : setScored(0);
                                  }}
                                  key={i + 10}
                                  className={`rounded-md text-sm lg:text-lg w-[95vw] lg:w-[80vw]  bg-white text-blue-500 hover:text-green-500 focus:text-green-600 transition duration-150 ease-in-out  py-3 text-start bg-transparent border px-4 mx-2`}
                                >
                                  {i + 1}. &nbsp; {e}
                                </button>
                              );
                            })}
                          </div>
                            {/* Save and next button  */}
                          <div
                            onClick={handleNextQuestion}
                            className=" w-[95vw] lg:w-[80vw] text-right px-1"
                          >
                            <button className="lg:px-4 px-2 py-1 lg:py-2  lg:text-lg  bg-blue-400 hover:bg-blue-500 text-white rounded-sm transition duration-75 ease-in-out ">
                              Save & Next
                            </button>
                          </div>
                        </div>
                      );
                    })[counter]}
                </div>
                {/* Submit Game button */}
                <div
                  onClick={openModal}
                  className="w-full bottom-5 absolute text-right px-2 lg:px-6"
                >
                  <button className="lg:px-4 px-2 py-1 lg:py-2  lg:text-lg  bg-blue-400 hover:bg-blue-500 text-white rounded-sm transition duration-150 ease-in-out ">
                    Submit{" "}
                    <i
                      className="fa fa-arrow-right text-sm"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
                {/*Submit Game Modal */}
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  className="h-[100vh] bg-black bg-opacity-20 px-3 flex justify-center items-center"
                  contentLabel="Submit Game "
                  ariaHideApp={false}
                >
                  <div className="bg-white shadow flex flex-col items-center space-y-6  px-5 py-8  rounded-md">
                    <div className="text-lg">
                      Do you want to submit the game?
                    </div>
                    <button
                      onClick={() => {
                        handleSessionSubmit();
                        closeModal();
                      }}
                      className="w-full text-white bg-blue-500 hover:bg-blue-700 py-2 rounded-md flex justify-center tracking-widest"
                    >
                      YES
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full text-white bg-red-500 hover:bg-red-700 py-2 rounded-md flex justify-center tracking-widest "
                    >
                      NO
                    </button>
                  </div>
                </Modal>
              </>
            ) : (
              <>
                {/* Congrats for completing  */}
                <div className="flex flex-col h-full lg:flex-row justify-evenly w-[100%] items-center">
                  <div className="z-30 text-blue-700 flex tracking-wider flex-col items-start">
                    <h1 className="text-lg lg:text-[1.5rem] font-bold">
                      GAME COMPLETED, GOOD JOB.
                    </h1>
                    <h2 className="text-5xl mt-3 lg:text-[5rem] font-extrabold">
                      IMPRESSIVE
                    </h2>
                    <h2 className="text-5xl mt-3 lg:text-[5rem]  font-bold">
                      EXCELLENT
                    </h2>
                    <h2 className="text-5xl mt-3 lg:text-[5rem]  font-bold">
                      WELLDONE
                    </h2>
                    <button
                      onClick={() => {
                        handleSessionSubmit();
                      }}
                      className="lg:px-6 lg:py-2 px-4 py-2 mt-3 lg:text-lg font-semibold bg-blue-500  text-white rounded-sm transition-all duration-75 hover:bg-blue-700"
                      to="/login "
                    >
                      Submit
                    </button>
                  </div>
                  <div>
                    <img src={gj4} className="h-[35vh] lg:h-[65vh]" alt="" />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Game;
