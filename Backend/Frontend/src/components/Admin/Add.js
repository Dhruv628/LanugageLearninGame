import React from 'react'

const Add = (props) => {
    const {addDisplay,Heading,setQuestion,setoptionOne,setoptionTwo,setoptionThree,setAnswer,setDifficulty,setScore,setLanuguage,ConfirmAdd,setAddDisplay}=props;
  return (
    <div className={`${addDisplay?"z-20 top-0 left-0 w-full flex justify-center items-center bg-black bg-opacity-[0.03] h-full fixed":"hidden"}`}>
     
    <div className=' lg:space-y-2 xl:space-y-2 space-y-3 rounded-md z-30 bg-white lg:px-8 w-[90vw] px-4 py-2 lg:py-5 sm:w-[50vw] lg:w-[40vw] xl:w-[30vw]'>
    <div className='text-center text-xl font-semibold'>{Heading}</div>
    {/* Question  */}
    <div className='text-sm lg:text-base'>
       <div className='flex font-semibold  mb-1 '>
          <label htmlFor="">Question</label>
      </div>
      <div>
          <input  onChange={(e)=>setQuestion(e.target.value)} placeholder='Question' className='py-1  px-2 w-full border rounded-sm border-black' type="text" />
      </div>
    </div>
    {/* Options  */}
    {/* #1  */}
     <div className='text-sm lg:text-base'>
          <div className='flex font-semibold  mb-1 text-sm'>
           <label htmlFor="">Option 1</label>
         </div>
         <div>
           <input  onChange={(e)=>setoptionOne(e.target.value)} placeholder='Option 1' className='py-1 px-2 border w-full rounded-sm border-black' type="text" />
       </div>
     </div>
    {/* #2  */}
     <div className='text-sm lg:text-base'>
          <div className='flex font-semibold  mb-1 text-sm'>
           <label htmlFor="">Option 2</label>
         </div>
         <div>
           <input  onChange={(e)=>setoptionTwo(e.target.value)} placeholder='Option 1' className='py-1 px-2 border w-full rounded-sm border-black' type="text" />
       </div>
     </div>
    {/* #3 */}
     <div className='text-sm lg:text-base'>
          <div className='flex font-semibold  mb-1 text-sm'>
           <label htmlFor="">Option 3</label>
         </div>
         <div>
           <input  onChange={(e)=>setoptionThree(e.target.value)} placeholder='Option 1' className='py-1 px-2 border w-full rounded-sm border-black' type="text" />
       </div>
     </div>
    {/* Answer  */}
    <div className='text-sm lg:text-base'>
       <div className='flex font-semibold  mb-1 text-sm'>
          <label htmlFor="">Answer</label>
      </div>
      <div>
          <input  onChange={(e)=>setAnswer(e.target.value)} placeholder='Answer' className='py-1 px-2 border w-full rounded-sm border-black' type="text" />
      </div>
    </div>
    {/* Difficulty  */}
    <div className='text-sm lg:text-base'>
      <div className='text-start font-semibold  mb-1 text-sm'>
        Difficulty
      </div>
    <select  onChange={(e)=>setDifficulty(e.target.value)} placeholder='Difficulty' name=""className='py-1 px-2 border rounded-sm border-black w-full' id="">
    <option selected value="" disabled>Difficulty</option>
      <option value="easy">Easy</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>   
    </div>
    {/* Score     */}
    <div className='text-sm lg:text-base'>
      <div className='text-start font-semibold  mb-1 text-sm'>
        Score
      </div>
    <select  onChange={(e)=>setScore(e.target.value)} placeholder='Score' className='py-1 px-2 border rounded-sm w-full border-black' name="" id="">
      <option selected value="" disabled>Score</option>
      <option value="1">1</option>
      <option value="3">3</option>
      <option value="5">5</option>
    </select> 
    </div>
    {/* Language  */}
    <div className='text-sm lg:text-base'>
       <div className='flex font-semibold  mb-1 text-sm'>
          <label htmlFor="">Language</label>
      </div>
      <div>
          <input  onChange={(e)=>setLanuguage(e.target.value)} placeholder='Language' className='py-1 px-2 border w-full rounded-sm border-black' type="text" />
      </div>
    </div>
    {/* Buttons  */}
    <div className='flex text-sm lg:text-base w-full justify-between'>
       <button onClick={ConfirmAdd} className='px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-sm'> Add</button>
       <button onClick={()=>setAddDisplay(false)} className='px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-sm'>Cancel</button>
    </div>
  </div>
  </div>
  )
}

export default Add