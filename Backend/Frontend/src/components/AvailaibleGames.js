import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AvailaibleGames = () => {
    
    const [English, setEnglish] = useState(false)
    const [Hindi, setHindi] = useState(false)
    
  return (
    <div style={{fontFamily:"'Nunito', sans-serif"}} className=' h-[90vh] lg:h-[80vh] flex items-center py-8 z-0'>
        <div className='flex flex-col space-y-9 md:space-y-0 items-center md:flex-row md:justify-evenly md:space-x-10 py-10 w-full'>
            {/* E N G L I S H  */}
            <div id='English' className='h-[35vh] md:h-[40vh] relative rounded-md w-[90vw] sm:w-[80vw] md:w-[35vw]' onClick={()=>setEnglish(true)} onMouseEnter={()=>setEnglish(true)} onMouseLeave={()=>setEnglish(false)}>
                <div className={`${English?"absolute h-[100%] flex justify-center items-center transition duration-200 text-white w-[100%] bg-black bg-opacity-40":"h-[0%] transition duration-200"}`}>
                   <Link to="/details" className={`${English?"px-4 uppercase bg-white text-black focus:bg-black focus:text-white focus:border focus:border-white hover:bg-black hover:text-white hover:border hover:border-white tracking-widest transition duration-75 py-1   border opacity-100 border-white rounded-sm":"hidden"}`}>Play <i className="fa fa-arrow-right text-sm" aria-hidden="true"></i></Link>
                </div> 
            </div>
            {/* H I N D I  */}
            <div  className='Hindi h-[35vh] md:h-[40vh] relative rounded-md w-[90vw] sm:w-[80vw] md:w-[35vw]' onClick={()=>setHindi(true)} onMouseEnter={()=>setHindi(true)} onMouseLeave={()=>setHindi(false)}>
                <div className={`${Hindi?"absolute h-[100%] flex justify-center items-center transition duration-200 text-white w-[100%] bg-black bg-opacity-40":"h-[0%] transition duration-200"}`}>
                   <Link to="/hindi" className={`${Hindi?"px-4 uppercase bg-white text-black focus:bg-black focus:text-white focus:border focus:border-white hover:bg-black hover:text-white hover:border hover:border-white tracking-widest transition duration-75 py-1   border opacity-100 border-white rounded-sm":"hidden"}`}>Play  <i className="fa fa-arrow-right text-sm" aria-hidden="true"></i></Link>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default AvailaibleGames