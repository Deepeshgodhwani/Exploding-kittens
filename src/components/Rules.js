import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function Rules() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <p className="cursor-pointer font-bold " onClick={onOpen}>
        Rules
      </p>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent position={"relative"} backgroundColor="transparent">
          <div className="bg-[rgb(155,5,21)] w-full z-0 absolute h-full rounded-md opacity-80"></div>
          <div className="px-4 text-white font-bold text-2xl py-2 z-10 flex items-center">
            <p>Rules - </p>
            <ModalCloseButton />
          </div>
          <ul className="list-disc z-10 px-10 pb-4 text-lg font-semibold space-y-3 text-white">
            <li>
              If the card drawn from the deck is a cat card, then the card is
              removed from the deck.{" "}
            </li>
            <li>
              If the card is exploding kitten (bomb) then the player loses the
              game.
            </li>
            <li>
              {" "}
              If the card is defusing card, then the card is removed from the
              deck. This card can be used to defuse one bomb that may come in
              subsequent cards drawn from the deck.
            </li>
            <li>
              If the card is a shuffle card, then the game is restarted and the
              deck is filled with 5 cards again.
            </li>
          </ul>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Rules;
