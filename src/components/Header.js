import React from "react";
import gameLogo from "../assets/img/gameLogo.png";
import Leaderboard from "./Leaderboard";
import Rules from "./Rules";
import {useNavigate} from "react-router-dom"; 



const Header = (props) => {
  
  let history=useNavigate();
  const {setIsLobby,isLobby} =props;
   const exitGame =()=>{
     
    localStorage.clear('user');
    setIsLobby(true);
     history('/'); 
   }
   
  return (
    <section className="flex relative z-10 text-white items-center justify-between">
      {!isLobby? <div className="flex items-center">
         <img  alt="" className="w-20" src={gameLogo} />
      </div>:<div></div>}
      <div className="flex px-8 py-4 space-x-8 items-center">
        <Rules/>
        <Leaderboard/>
         {!isLobby && <p onClick={exitGame} className="cursor-pointer font-bold text-lg ">Exit</p>}
      </div>
    </section>
  );
};

export default Header;
