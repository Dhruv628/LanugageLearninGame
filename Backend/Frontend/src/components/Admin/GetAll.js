import React, { useEffect, useState } from 'react'
import Update from './Update'
import Add from './Add'
import DeleteOne from './DeleteOne'
import Alert from '../Alert'

const GetAll = () => {
   const [Questions, setQuestions] = useState("")
   const [id, setid] = useState("")
   const [token,setToken]=useState("")
   const [Question, setQuestion] = useState("")
   const [optionOne, setoptionOne] = useState("")
   const [optionTwo, setoptionTwo] = useState("")
   const [optionThree, setoptionThree] = useState("")
   const [Difficulty, setDifficulty] = useState("")
   const [Score, setScore] = useState("")
   const [Answer, setAnswer] = useState("")
   const [Lanuguage, setLanuguage] = useState("")
   const [updateDisplay,setUpdateDisplay]=useState(false)
   const [addDisplay,setAddDisplay]=useState(false)
   const [DeleteDisplay,setDeleteDisplay]=useState(false)
    useEffect(() => {
        //Cookie
        function getCookie(name) {
            const cookieName = `${name}=`;
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
              let cookie = cookieArray[i].trim();
              if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
              }
            }
            return '';
          }
          setToken(getCookie("authtoken"))
    //Fetching ALL
    const fetchAll=async()=>{
     
        const response=await fetch("http://localhost:5000/api/game/get",{
            method:"GET",
            headers:{
                token:getCookie("authtoken")
            }
        }).then(res=>res.json());
        setQuestions(response.questions )
    }
    fetchAll();
    }, [])
    
    //Deleting
    const ConfirmDelete=async()=>{
        const updatedQuestions = Questions.filter((question) => question._id !== id);
        setQuestions(updatedQuestions);
        await fetch(`http://localhost:5000/api/game/delete/${id}`,{
            method:"DELETE",
            headers:{
                token:token
            }
        }).then(res=>res.json());
        Alert("Deleted","info")
        setDeleteDisplay(false);
    }
   
    

    // Updating 
    const ConfirmUpdate=async ()=>{
      const sentData={
        question:Question,
        answer:Answer,
        options:[`${optionOne}`,`${optionTwo}`,`${optionThree}`],
        score:Score,
        difficulty:Difficulty,
        language:Lanuguage,
      }
      const updatedQuestions = Questions.map((questionItem) => {
        if (questionItem._id === id) {
          return {
            ...questionItem,
            question: sentData.question,
            score: sentData.score,
            difficulty: sentData.difficulty,
            language: sentData.language,
            options: sentData.options,
            answer:sentData.answer
          };
        } else {
          return questionItem;
        }
      });
      setQuestions(updatedQuestions);

     await fetch(`http://localhost:5000/api/game/update/${id}`,{
          method:"PUT",
          headers:{
              "Content-type":"application/json",
              token:token,

          },
          body:JSON.stringify(sentData)
      }).then(res=>res.json());
      Alert("Updated","info")
      setUpdateDisplay(false);
  }

  //Adding 
  const ConfirmAdd=async()=>{
    const sentData={
      question:Question,
      answer:Answer,
      options:[`${optionOne}`,`${optionTwo}`,`${optionThree}`],
      score:Score,
      difficulty:Difficulty,
      language:Lanuguage,
    }

    setQuestions((prevQuestions) => [sentData, ...prevQuestions]);

    const response=await fetch("http://localhost:5000/api/game/create",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            token:token,

        },
        body:JSON.stringify(sentData)
    }).then(res=>res.json());
    if(response.success===false){
      setAddDisplay(false);
     return  Alert("Already exists","error");
    }
    else{
      Alert("Added","info")
      setAddDisplay(false);
    }
 
  }
  return (
    <>
    <div className='px-6 py-2 bg-[url("https://images03.nicepage.com/c461c07a441a5d220e8feb1a/caf57d9ff38259f88bf67bb9/sdc-min.jpg")] '> 
      <div className='flex flex-wrap justify-center lg:px-10  '>
        {
         Questions && Questions.map((e,index)=>{
            return (
                <>
                  {/* Add button  */}
                 <div className='absolute top-12 right-8 py-5'>
                    <button onClick={()=>setAddDisplay(true)} className='border text-xl  text-white px-3 pb-1 transition origin-center ease-linear duration-100 lg:text-3xl hover:bg-white hover:text-black font-extralight'>+</button>
                  </div>
                   {/*A D D I N G  */}
                  <Add addDisplay={addDisplay} Heading={"Add"} setQuestion={setQuestion} setoptionOne={setoptionOne} setoptionTwo={setoptionTwo} setoptionThree={setoptionThree} setAnswer={setAnswer} setDifficulty={setDifficulty} setScore={setScore} setLanuguage={setLanuguage} ConfirmAdd={ConfirmAdd} setAddDisplay={setAddDisplay}/>
                
                  {/* U P D A T I N G   */}
                  <Update Heading={"Update"} updateDisplay={updateDisplay} Question={Question} setQuestion={setQuestion} ConfirmUpdate={ConfirmUpdate} setUpdateDisplay={setUpdateDisplay} optionOne={optionOne } setoptionOne={setoptionOne} optionTwo={optionTwo} setoptionTwo={setoptionTwo} optionThree={optionThree} setoptionThree={setoptionThree} Answer={Answer} setAnswer={setAnswer} Difficulty={Difficulty} setDifficulty={setDifficulty} Score={Score} setScore={setScore} Lanuguage={Lanuguage} setLanuguage={setLanuguage}/>

                  {/* D E L E T I N G  */}
                  <DeleteOne DeleteDisplay={DeleteDisplay} Heading={"Delete"} ConfirmDelete={ConfirmDelete} setDeleteDisplay={setDeleteDisplay}/>
               
                  {/* Q U E S T I O N     C A R D  */}
                <div key={index+100} className='bg-white text-start mt-10 lg:mx-12 lg:my-8 my-3 lg:w-[38vw] rounded-sm flex flex-col items-start p-3 space-y-2 lg:space-y-4 lg:px-10 lg:py-4 shadow-sm'>
                 {/* Question  */}
                <div className='font-semibold w-full text-start'>  
                   Q {index+1}. {e.question}
                </div>
                {/* Options  */}
                <div className='text-sm lg:text-base'>
                    {
                        e.options.map((a,index)=>{
                            return (
                                <div className=' flex justify-start' key={index+200}>{index+1}. {a}</div>
                            )
                        })
                    }
                </div>
                {/* Answer  */}
                <div className='text-sm lg:text-base'>
                  Answer : {e.answer}
                </div>
                {/* Difficulty/ Score / Lanugage  */}
                <div className='flex flex-col sm:flex-row space-y-3 lg:space-y-0 items-center justify-between w-[80vw] lg:w-full'>
                    <div className='flex w-full lg:w-fit justify-between items-center lg:space-x-4 text-xs sm:text-sm'>
                       <div className='lg:uppercase'>Difficulty: {e.difficulty}</div>
                       <div>Score: {e.score}</div>
                       <div>Language: {e.language}</div>
                    </div>
                    {/* Button - update / delete  */}
                   <div className='flex w-full justify-end lg:justify-normal lg:w-fit items-center space-x-5'>
                     <button onClick={()=>{setid(e._id); setUpdateDisplay(true); setScore(e.score); setAnswer(e.answer); setDifficulty(e.difficulty); setLanuguage(e.language); setQuestion(e.question); 
                                           for(let i=0;i<e.options.length;i++){
                                            if(i===1){
                                              setoptionOne(e.options[i])
                                            }
                                            else if(i===2){
                                             setoptionTwo(e.options[i]);
                                            }
                                            else{
                                              setoptionThree(e.options[i]);
                                            }
                                           }
                    }}><i class="fa-regular fa-pen-to-square hover:scale-105 transition duration-100"></i></button>
                     <button onClick={()=>{setid(e._id); setDeleteDisplay(true);}}><i class="fa-regular fa-trash-can hover:scale-105 transition duration-100"></i></button>
                    </div>
                   </div>
                </div>      
                </>
            )
         })
        }
      </div>       
    </div>
    </>
  )
}

export default GetAll