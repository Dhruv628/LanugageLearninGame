import React, { useEffect, useState } from 'react'
import User from "../assets/img/user.svg"
import User2 from "../assets/img/usertwo.svg"
const Profile = () => {
    const [user, setuser] = useState()
    const [userDate, setuserDate] = useState()
    useEffect(() => {
        //Fetching the TOKEN
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
           const tokn=getCookie("authtoken")

    //Fetching the USER DATA
     const fetchUser=async()=>{
        const response = await fetch("http://localhost:5000/api/user/getuser",{
            method:"GET",
            headers:{
                token:tokn
            }
        }).then(res=>res.json());
        setuser(response.user)
        //Converting Date
        const timestamp = response.user.date;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}  ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} (IST)`;
        setuserDate(formattedDateTime);
     }
     fetchUser();
    }, [])
    
  return (
    <div className=' xs:px-16 px-3 sm:px-20 md:px-7 w-full min-h-[85vh] flex items-center justify-center'>
        {/* U S E R     D E T A I L S  */}
        <div className='flex md:flex-row mx-1 flex-col space-y-4 md:space-y-0 py-4 px-4 w-full md:py-4 md:px-4 items-center justify-evenly h-full lg:h-[60vh] bg-white  md:mx-[18vw] rounded-sm '>
            {/* Image  */}
            <div>
                <img src={User2} className='h-[30vh] md:h-[40vh] ' alt="" />
            </div>
        <div className=' flex flex-col items-start justify-center space-y-4 md:space-y-8 p-5'>
            {/* Name  */}
            <div className='flex mx-2 flex-col '>
                <div className='flex text-sm md:text-base items-center '>
                   <i class="fa-regular fa-user mr-2"></i>
                    <div className=''>Name</div>
                </div>
                <div className='md:min-w-[20vw] min-w-[70vw] py-2 my-1 text-start text-lg md:text-xl border-b border-opacity-30 border-b-black'>{user && user.name}</div>
            </div>
            {/* Email  */}
            <div className='flex mx-2 flex-col '>
                <div className='flex text-sm md:text-base items-center'>
                  <i class="fa-regular fa-envelope mr-2"></i>
                    <div>Email</div>
                </div>
                <div className='md:min-w-[20vw] min-w-[70vw] py-2 my-1 text-start text-lg md:text-xl border-b border-opacity-30 border-b-black'>{user && user.email}</div>
            </div>
            {/* Date Joined  */}
            <div className='flex mx-2 flex-col '>
                <div className='flex text-sm lg:text-base items-center '>
                   <i class="fa-regular fa-calendar-days mr-2"></i>
                    <div>Joined on</div>
                </div>
                <div className='md:min-w-[20vw] min-w-[70vw] py-2 my-1 text-start text-lg md:text-xl border-b border-opacity-30 border-b-black'>{userDate && userDate}</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Profile