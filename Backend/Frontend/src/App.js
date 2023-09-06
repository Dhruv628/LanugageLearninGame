
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GameDetails from './components/GameDetails';
import Game from './components/Game';
import GameResults from './components/GameResults';
import Profile from './components/Profile';
import GamePlayed from './components/GamePlayed';
import GamesPlayed from './components/GamesPlayed';
import Leaderboard from './components/Leaderboard';
import AvailaibleGames from './components/AvailaibleGames';
import HIndi from './components/HIndi';
import GetAll from './components/Admin/GetAll';


function App() {
  return (
    <div className='App h-screen w-screen bg-[url("https://images03.nicepage.com/c461c07a441a5d220e8feb1a/caf57d9ff38259f88bf67bb9/sdc-min.jpg")] sm:w-full' >
    <Router>
      <Navbar/>
       <Routes>
          <Route  exact path="/" element={<Home/> }   />
          <Route  exact path="/login" element={<Login/>  }   />
          <Route  exact path="/signup" element={<Signup/> }   />
          <Route  exact path="/details" element={<GameDetails/> }   />
          <Route  exact path="/start" element={<Game/> }   />
          <Route  exact path="/profile" element={<Profile/> }   />
          <Route  exact path="/user/games" element={<GamesPlayed/> }   />
          <Route  exact path="/game/:id" element={<GamePlayed/> }   />
          <Route  exact path="/leaderboard" element={<Leaderboard/> }   />
          <Route  exact path="/allgames" element={<AvailaibleGames/> }   />
          <Route  exact path="/hindi" element={<HIndi/> }   />
          <Route  exact path="/admin/dashboard" element={<GetAll/> }   />
      </Routes>
   </Router>
</div>
 );
}

export default App;
