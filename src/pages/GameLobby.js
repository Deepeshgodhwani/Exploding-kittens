import React, { useState } from "react";



import { useToast } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"; 

import bgImage from '../assets/img/bg-picture.jpg'


const GameLobby = (props) => {
  const [username, setUsername] = useState("");
  const {setIsLobby} =props;
  let history=useNavigate();
  const toast = useToast()

  const startGame = async () => {
    if (!username) {
      toast({
        description: "Enter username to start the game",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      return;
    }
     try {
         let response=await fetch("http://localhost:8000/api/users/createUser",{
            method:'POST',
            mode: "cors",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({username:username})
         })  

         let result=await response.json();
         let user=result.data;
         localStorage.setItem('user',
         JSON.stringify({
            username:user.username,
            matchesWon:user.matchesWon,
            defuseCards:[],
            openedCard:"",
            deck:[]
         }))
         setIsLobby(false);
         history("/home");

     } catch (error) {
           console.log(error);
     }
  };

  return (
    <main className="flex w-full items-center  h-[87vh] justify-end ">
      <img  alt="" className="absolute w-full h-[100vh] top-0 z-0" src={bgImage}></img>
        <div className="z-10  flex flex-col border-2 border-l-4 border-b-4 border-[black] bg-[rgb(134,30,27)] justify-center
         space-y-8 mr-60 rounded-lg px-6 h-72 
         ">
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
