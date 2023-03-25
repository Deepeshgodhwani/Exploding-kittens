import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/img/bg-picture.jpg";
import gameLogo from "../assets/img/gameLogo.png";
import { useToast } from "@chakra-ui/react";
const URL=process.env.REACT_APP_USER_API;




const GameLobby = (props) => {
  const [username, setUsername] = useState("");
  const { setIsLobby } = props;
  let history = useNavigate();
  const toast = useToast();


  
  //onclicking start game button
  const startGame = async () => {
    //if user clicks button without entering username//
    if (!username) {
      toast({description:"Enter username to start the game",status:'warning',duration:2000,isClosable:true})
      return;
    }

    try {
      //making api call to create user with username //
      let response = await fetch(`${URL}createUser`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });

      let result = await response.json();
      let user = result.data;
      //setting user data with initial game values at localstorage//
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.username,
          matchesWon: user.matchesWon,
          defuseCards: [],
          openedCard: "",
          deck: [],
        })
      );
      setIsLobby(false);
      // redirecting to game play area //
      history("/playGame");
    } catch (error) {
      console.log(error);
      toast({description:"Internal server error",status:'warning',duration:2000,isClosable:true})
    }
  };

  const togglePreLoader=()=>{
      let elem=document.getElementById('preloader');
      elem.style.display="none"
  }

  return (
    <main onLoad={togglePreLoader}  className="flex w-full items-center  h-[87vh] justify-end ">
      <div  id="preloader" className="w-full flex flex-col justify-center -space-y-6 items-center h-[100vh] absolute bg-[rgb(84,3,25)] top-0 z-20">
           <img  src={gameLogo}></img>
           <p className="text-2xl font-bold text-white">Exploding Kitten </p>
      </div>
      <img
        alt=""
        className="absolute w-full h-[100vh] top-0 z-0"
        src={bgImage}
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
          className="bg-white rounded-lg  py-2 border-b-8 cursor-pointer border-black "
          onClick={() => startGame()}
        />
      </div>
    </main>
  );
};

export default GameLobby;
