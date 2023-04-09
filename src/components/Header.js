import React from "react";
import gameLogo from "../assets/img/gameLogo.png";
import Leaderboard from "./Leaderboard";
import Rules from "./Rules";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeItem } from "../utils/storage";

const Header = (props) => {
  const user = useSelector((state) => state.user);

  let history = useNavigate();
  const { setIsLobby, isLobby } = props;

  //To exit game //
  const exitGame = () => {
    //removing user from local storage //
    removeItem("user");
    setIsLobby(true);
    //redirecting in lobby
    history("/");
  };

  return (
    <section className="flex relative z-10 text-white items-center justify-between">
      {!isLobby ? (
        <div className="flex items-center">
          <img alt="" className="w-20" src={gameLogo} />
          <p className="text-xl font-bold">Exploding Kitten </p>
        </div>
      ) : (
        <div></div>
      )}
      {!isLobby && user?.username && (
        <div className="flex space-x-2  pl-6">
          <div className="flex bg-white px-4 py-1 text-xl rounded-md space-x-3">
            <p className=" text-black font-bold">NAME : </p>
            <p className="font-bold  text-[rgb(132,204,22)]">{user.username}</p>
          </div>
          <div className="flex bg-white px-4 py-1 text-xl rounded-md space-x-3">
            <p className=" text-black  font-bold">POINTS :</p>
            <p className="font-bold   text-[rgb(132,204,22)]">{user.matchesWon}</p>
          </div>
        </div>
      )}
      <div className="flex text-xl px-14 py-4 space-x-8 items-center">
        <Rules />
        {!isLobby && <Leaderboard />}
        {!isLobby && (
          <p onClick={exitGame} className="cursor-pointer font-bold">
            Exit
          </p>
        )}
      </div>
    </section>
  );
};

export default Header;
