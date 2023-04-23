import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/img/bg-picture.jpg";
import gameLogo from "../assets/img/gameLogo.png";
import { useToast } from "@chakra-ui/react";
import { request } from "../api/request";
import { setItem } from "../utils/storage";
import { setToast } from "../utils/taost";

const GameLobby = (props) => {
  const [username, setUsername] = useState("");
  const { setIsLobby } = props;
  let history = useNavigate();
  const toast = useToast();

  //onclicking start game button
  const startGame = async () => {
    //if user clicks button without entering username//
    let button = document.getElementById("button");
    if (!username) {
      setToast(toast, "warning", "Enter username to start the game");
      return;
    }

    button.value = "STARTING...";
    let response = await request("POST", "/createUser", { username });

    if (response.success) {
      setItem("user", response.data);
      setIsLobby(false);
      button.value = "START GAME";
      history("/playGame");
    }
  };

  const togglePreLoader = () => {
    let elem = document.getElementById("preloader");
    elem.style.display = "none";
  };

  return (
    <main className="flex w-full items-center  h-[87vh] justify-end ">
      <div
        id="preloader"
        className="w-full flex flex-col justify-center -space-y-6 items-center h-[100vh] absolute bg-[rgb(84,3,25)] top-0 z-20"
      >
        <img alt="logo" src={gameLogo}></img>
        <p className="text-2xl font-bold text-white">Exploding Kitten </p>
      </div>
      <img
        alt="Background"
        className="absolute w-full h-[100vh] top-0 z-0"
        src={bgImage}
        onLoad={togglePreLoader}
      ></img>
      <div
        className="z-10  flex flex-col border-2 border-l-4 border-b-4 border-[black] bg-[rgb(134,30,27)] justify-center
         space-y-8 mr-60 rounded-lg px-6 h-72 
         "
      >
        <p className=" text-2xl -mb-4  font-bold text-white">ENTER USERNAME</p>
        <input
          type="text"
          placeholder=""
          className="w-80 px-4 py-2  outline-none rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="button"
          value="START GAME"
          id="button"
          className="bg-white rounded-lg w-full py-2 border-b-8 cursor-pointer border-black "
          onClick={() => startGame()}
        />
      </div>
    </main>
  );
};

export default GameLobby;
