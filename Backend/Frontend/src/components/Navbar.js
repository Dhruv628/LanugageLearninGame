import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../assets/img/Divider';

function Navbar() {
  // State and variable declarations
  const [Token, setToken] = useState('');
  const [Iscrolled, setIscrolled] = useState(false);
  const [ProfileDisplay, setProfileDisplay] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Event listeners for click and scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    const handleScroll = () => {
      setIscrolled(window.scrollY > 50 );
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    setToken('');
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

 

  // Handle account menu
  const handleAccount = async () => {
    setProfileDisplay(true);
    const tokn = getCookie('authtoken');
    setToken(tokn);

    // Fetch user data if token is present
    if (tokn !== '') {
      const response = await fetch("http://localhost:5000/api/user/getuser", {
        method: "GET",
        headers: {
          token: tokn
        }
      }).then(res => res.json());

      if (response.user.role.toUpperCase() === "ADMIN") {
        setAdmin(true);
      }
    }
  };

  // Close account menu
  const closeMenu = () => {
    setProfileDisplay(false);
  };

  // Helper function to get cookies
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

  return (
    <div className={` ${Iscrolled ? 'bg-black fixed bg-opacity-30  w-full backdrop-blur-sm top-0 z-50' : 'z-50'}`}>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-transparent">
        {/* Logo */}
        <Link className="font-bold leading-none" to="/">
          <div className="text-xl sm:text-3xl text-white tracking-widest" style={{ fontFamily: "'Pacifico', cursive" }}>
            VocalVoyage
          </div>
        </Link>
        {/* Menu items */}
        <ul className={` absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6`}>
          {/* Home */}
          <li>
            <Link to="/" className="text-sm text-white hover:text-blue-500 hover:font-semibold focus:text-blue-500 focus:font-semibold">
              Home
            </Link>
          </li>
          <li className="text-gray-300">
           <Divider/>
          </li>
          {/* Games */}
          <li>
            <Link to="/allgames" className="text-sm text-white hover:text-blue-500 hover:font-semibold focus:text-blue-500 focus:font-semibold">
              Games
            </Link>
          </li>
          <li className="text-gray-300">
            <Divider/>
          </li>
          {/* Leaderboard */}
          <li>
            <Link to="/leaderboard" className="text-sm text-white hover:text-blue-500 hover:font-semibold focus:text-blue-500 focus:font-semibold">
              Leaderboard
            </Link>
          </li>
        </ul>
        {/* Profile and menu */}
        <div className={`${ProfileDisplay ? 'fixed flex z-50 items-end flex-col w-full h-[100vh] bg-opacity-50 backdrop-blur-[0.3px] left-0 top-0 bg-black' : 'hidden'}`}>
          <div ref={menuRef} className={`${ProfileDisplay ? 'bg-white absolute right-0 flex flex-col items-start h-full w-[65vw] sm:w-[35vw] lg:w-[18vw]' : 'hidden'}`}>
            <button onClick={closeMenu} className="absolute right-4 text-2xl top-[-0.3rem] opacity-40 hover:opacity-100">x</button>
            <Link onClick={() => setProfileDisplay(false)} to="/" className="hover:bg-gray-300 lg:hidden hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Home</Link>
                <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
                <Link onClick={() => setProfileDisplay(false)} to="/allgames" className="hover:bg-gray-300 lg:hidden hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Games</Link>
                <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
                <Link onClick={() => setProfileDisplay(false)} to="/leaderboard" className="hover:bg-gray-300 lg:hidden hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Leaderboard</Link>
                <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
            {Token !== '' ? (
              <>
                {/* Profile */}
                <Link onClick={() => setProfileDisplay(false)} to="/profile" className="hover:bg-gray-300 hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Profile</Link>
                <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
                {/* Games played */}
                <Link onClick={() => setProfileDisplay(false)} to="/user/games" className="hover:bg-gray-300 hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Games played</Link>
                <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
                {/* Admin dashboard (if admin) */}
                {Admin ? (
                  <>
                    <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400"></div>
                    <Link onClick={() => setProfileDisplay(false)} to="/admin/dashboard" className="hover:bg-gray-300 hover:bg-opacity-50 hover:text-lg w-full text-start py-4 px-3">Admin dashboard</Link>
                    <div className="h-[0.1px] w-full bg-opacity-50 bg-gray-400 mb-4"></div>
                  </>
                ) : null}
                {/* Logout */}
                <div className="w-full px-2 mt-4">
                  <button onClick={() => { handleLogout(); setProfileDisplay(false) }} className=" float-left inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign In and Sign Up */}
                <div className="flex mt-4 space-x-4 my-8 px-3">
                  <Link onClick={() => setProfileDisplay(false)} to="/login" className=" lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                    Sign In
                  </Link>
                  <Link onClick={() => setProfileDisplay(false)} to="/signup" className=" lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Account menu button */}
        <button onClick={handleAccount} className="navbar-burger  lg:flex scale-[1.15] items-center text-white hover:scale-[1.3] duration-150 transition p-3">
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
