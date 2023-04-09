import React, { useEffect, useState } from "react";
import { fetchUsers } from "../redux/slice/leaderboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import io from "socket.io-client";
const ENDPOINT = "localhost:4000";
var socket;

function Leaderboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [usersDetails, setusersDetails] = useState([]);
  const data = useSelector((state) => state.leaderboard);
  const { users, loading } = data;

  useEffect(() => {
    dispatch(fetchUsers());
    socket = io(ENDPOINT);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (users) {
      setusersDetails(users);
    }
  }, [users]);

  useEffect(() => {
    //listening  to update leaderboard in runtime //
    if (!socket) return;
    socket.on("sendUsers", () => {
      dispatch(fetchUsers());
    });
  }, [users]);

  return (
    <div>
      <p className="cursor-pointer font-bold  " onClick={onOpen}>
        Leaderboard
      </p>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          position={"relative"}
          padding="5"
          backgroundColor="transparent"
          width={"full"}
        >
          <div className="bg-[rgb(155,5,21)] w-full z-0 absolute h-full rounded-md opacity-80"></div>
          <div className="px-4 text-white font-bold text-2xl py-2 z-10 flex items-center">
            <p>Leaderboard </p>
            <ModalCloseButton marginTop={"1.5rem"} />
          </div>
          <div className="flex flex-col pb-6  space-y-4  border-[1px] rounded-md py-2 z-10 w-[26rem] ml-4 mt-4 border-white text-white">
            <div className="flex relative justify-between pb-2 border-b-[1px]  border-white">
              <p className="w-[50%] border-r-2 text-center">Username</p>
              <p className="w-[50%] text-center">Points</p>
            </div>
            <div className="max-h-[19rem]  flex flex-col  space-y-4  overflow-y-scroll styleScroll">
              {loading && (
                <div className="flex justify-center h-44 items-center">
                  <Spinner />
                </div>
              )}
              {usersDetails?.length > 0 &&
                !loading &&
                usersDetails.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="flex border-2 py-[7px] hover:bg-[rgb(247,30,51)] rounded-xl mx-4 px-8 justify-between"
                    >
                      <p className="w-[50%] text-center font-bold text-white">
                        {user.username}
                      </p>
                      <p className="w-[50%] text-center font-bold  text-white">
                        {user.matchesWon}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Leaderboard;
