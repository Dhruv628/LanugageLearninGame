import React, { useState } from 'react'
import LoginImg from "../assets/img/LoginImg.png"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')




const submitHandler= async ()=>{


  // Email validation regex pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return toast.error('Invalid email address', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }

  else if(password !== confirmpassword){
    return toast.error(`Password doesn't match`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // To keep the toaster open until the user closes it manually
      });
    }
    else{
        try {
            const url = 'http://localhost:5000/api/user/signup'; // Replace with your API endpoint URL
            const headers = {
              'Content-Type': 'application/json', // Adjust the content type as per your API requirements
            };
            const data = {
              name : name,
              email: email,
              password : password
            };
        
            const response = await fetch(url, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(data),
            }).then(res=>res.json());
              if(response.success===false){
              
             toast.error(`Email already exists`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            }
            else{
             navigate("/login");
             toast.success('Account created', {
             position: toast.POSITION.TOP_CENTER,
             autoClose: 3000,
             });
            } 
       
      
          }catch (error) {
            console.error('Error:', error);
         }    
    }
  
}


  return (
    <div className="flex lg:h-[90vh] w-[100vw] py-4 lg:items-center lg:justify-center">
    <div className="ss:mx-4 xs:px-8 sm:px-16 md:px-4 w-full lg:w-[80vw] xl:w-[60vw]">
      <div className="bg-white w-full  lg:h-full shadow-md rounded-lg md:px-8 pt-6 pb-12 md:pt-12 md:pb-20 mb-4">
      <div className='flex flex-col md:flex-row space-y-6 lg:space-y-0 w-full  items-start lg:flex lg:flex-row md:items-center md:justify-center min-h-[24rem] min-w-[30vw] px-7 lg:px-10 lg:space-x-28 '>
        {/* image  */}
        <div className='w-full flex justify-center '>
          <img src={LoginImg} className='h-32 w-32 md:h-40 md:w-40 lg:h-52 lg:w-52' alt="" />
         </div>
       {/* form  */}
        <div className='w-full xs:px-10 md:space-y-5 md:px-10 lg:min-w-[15vw]'>
          <div className='mb-7 mt-4 text-xl font-semibold'>
            Signup
          </div>
        <div className="mb-4 text-sm sm:text-base lg:w-full">
          <input required onChange={(e)=>{setemail(e.target.value)}}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4 text-sm sm:text-base lg:w-full">
          <input required onChange={(e)=>{setname(e.target.value)}}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4 text-sm sm:text-base lg:w-full">
        <input required onChange={(e)=>{setpassword(e.target.value)}}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            />
        </div>
        <div className="mb-4 text-sm sm:text-base lg:w-full">
        <input required onChange={(e)=>{setconfirmpassword(e.target.value)}}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Confirmpassword"
            type="password"
            placeholder="Confirm password"
            />
        </div>
       <div className="mb-4 text-sm sm:text-base lg:w-full lg:mb-10">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white lg:mt-5 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-all duration-200"
            type="submit"
            onClick={submitHandler}     >
            SIGNUP
          </button>
        </div>
            </div>
            </div>
            {/* Login to you acc  */}
            <div className='float-right mt-4 mr-[4rem]'>
             <button onClick={()=>{navigate("/login")}}>  Login to you account &nbsp; <button  ><i className="fa-solid text-[0.85rem] fa-arrow-right"></i></button></button> 
            </div>
      </div>
     
    </div>
  </div>
  )
}

export default Signup