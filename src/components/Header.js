import React from "react";
import gameLogo from "../assets/img/gameLogo.png";
import Leaderboard from "./Leaderboard";
import Rules from "./Rules";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const user = useSelector((state) => state.user);

  let history = useNavigate();
  const { setIsLobby, isLobby } = props;

  //To exit game //
  const exitGame = () => {
    //removing user from local storage //
    localStorage.clear("user");
    setIsLobby(true);
    //redirecting in lobby
    history("/");
  };

  return (
    <section className="flex relative z-10 text-white items-center justify-between">
      {!isLobby ? (
        <div className="flex items-center">
          <img alt="" className="w-20" src={gameLogo} />
          <p className="text-lg font-bold">Exploding Kitten </p>
        </div>
      ) : (
        <div></div>
      )}
      {!isLobby && user?.username && (
        <div className="flex space-x-8 pl-6">
          <div className="flex space-x-3">
            <p className="text-white font-bold">USERNAME : </p>
            <p className="font-bold ">{user.username}</p>
          </div>
          <div className="flex space-x-3">
            <p className=" font-bold">POINTS :</p>
            <p className="font-bold ">{user.matchesWon}</p>
          </div>
        </div>
      )}
      <div className="flex px-14 py-4 space-x-8 items-center">
        <Rules />
        {!isLobby && <Leaderboard />}
        {!isLobby && (
          <p onClick={exitGame} className="cursor-pointer font-bold text-lg ">
            Exit
          </p>
        )}
      </div>
    </section>
  );
};

export default Header;
