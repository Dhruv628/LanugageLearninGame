import React, { useState } from 'react'
import LoginImg from "../assets/img/LoginImg.png"
import { useNavigate } from 'react-router-dom'
import Alert from "./Alert"

const Login = () => {
  const navigate= useNavigate();
  
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submitHandler= async ()=>{

      // Email validation regex pattern
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailRegex.test(email)) {
  return Alert("Invalid email address","error")
}

else if(!email || !password){
  return Alert("Please fill all the details","error")
}
else{
    try {
        const url = 'http://localhost:5000/api/user/login';
        const headers = {
          'Content-Type': 'application/json',
        };
        const data = {
          email: email,
          password : password
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        }).then(res=>res.json());

        if(response.success===false){
        return Alert("Incorrect email or password","error")
        }
        else{
          function setCookie(name, value, days) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
            const expires = `expires=${expirationDate.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/`;
          }
            setCookie('authtoken', response.authtoken, 30); 
            navigate("/");
           Alert("Welcome","success")
        }
      } catch (error) {
        console.error('Error:', error);
     }    
}
    
  }
  
  return (
<>

<div className=" flex lg:h-[90vh] w-[100vw] py-4 lg:items-center lg:justify-center ">
      <div className="ss:mx-4 xs:px-8 sm:px-16 md:px-4 w-full lg:w-[80vw] xl:w-[60vw]">
        <div className="bg-white w-full  lg:h-full shadow-md rounded-lg lg:px-8 pt-6 pb-12 lg:pb-20 mb-4">
        
        <div className='flex flex-col md:flex-row  lg:space-y-0 w-full  items-start lg:flex lg:flex-row md:items-center md:justify-center min-h-[24rem] min-w-[30vw] px-7 lg:px-10 lg:space-x-28 '>
          {/* IMAGE  */}
         <div className='w-full flex justify-center '>
          <img src={LoginImg} className='h-40 w-44 lg:h-52 lg:w-52' alt="" />
         </div>
         {/* Form  */}
          <div className='w-full xs:px-10 lg:space-y-8 lg:px-6 xl:px-10 lg:min-w-[15vw]'>
          <div className='mb-7 mt-4 text-xl font-semibold'>
              Login
            </div>
          <div className="mb-6">
            <input required onChange={(e)=>{setemail(e.target.value)}}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
          <input required onChange={(e)=>{setpassword(e.target.value)}}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              />
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-all duration-200"
              type="submit"
              onClick={submitHandler}
              >
              LOGIN
            </button>
          </div>
              </div>
              {/* Create account  */}
              </div>
              <div className='lg:float-right lg:mr-[4rem]'>
               <button onClick={()=>{navigate("/signup")}} className=''> Create an account &nbsp; <button  ><i className="fa-solid text-[0.85rem] fa-arrow-right"></i></button></button> 
              </div>
        </div>
       
      </div>
    </div>
  </>
  )
}

export default Login;