import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetail,
  getUserDetail,
  updateUserPoints,
} from "../redux/slice/userSlice";

import bgImage from "../assets/img/bg.jpg";
import cardImage from "../assets/img/card.png";
import defuseCardImg from "../assets/img/defuseCard.jpg";
import explodeCard from "../assets/img/explodeCard.png";
import shuffleCard from "../assets/img/shuffleCard.png";
import catCard from "../assets/img/catcard.jpg";
import Popover from "../components/Popover";

const GamePlayArea = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [deck, setDeck] = useState([]);
  const [defuseCards, setDefuseCards] = useState([]);
  const [openedCard, setOpenedCard] = useState("");
  const cards = ["CAT", "DEFUSE", "SHUFFLE", "EXPLODE"];

  useEffect(() => {
    dispatch(getUserDetail());
  }, []);

  useEffect(() => {
    if (!user.deck) return;

    updateGameState();
  }, [user]);

  const updateUserState = (data) => {
    const { deck, defuseCards, openedCard, gameStatus } = data;

    dispatch(
      editUserDetail({
        username: user?.username,
        matchesWon:
          gameStatus === "won"
            ? Number(user?.matchesWon + 1)
            : user?.matchesWon,
        deck,
        defuseCards,
        openedCard,
      })
    );

    if (gameStatus === "won") {
      updateUserPoints({
        username: user?.username,
        matchesWon: user?.matchesWon + 1,
      });
    }
  };

  const sendDataToUpdate = (deck, defuseCards, openedCard, gameStatus) => {
    let data = { deck, defuseCards, openedCard, gameStatus };
    updateUserState(data);
  };

  const updateGameState = () => {
    if (user?.deck?.length < 5 && user?.deck?.length > 0) {
      setDeck(user?.deck);
      setDefuseCards(user.defuseCards);
      setOpenedCard(user?.openedCard);
    } else if (user?.deck.length === 5) {
      setDeck(user?.deck);
      setDefuseCards([]);
      setOpenedCard("");
    } else {
      setDeck(generateRandomDeck());
      setDefuseCards([]);
      setOpenedCard("");
    }
  };

  const generateRandomDeck = () => {
    const c1 = Math.floor(Math.random() * 4);
    const c2 = Math.floor(Math.random() * 4);
    const c3 = Math.floor(Math.random() * 4);
    const c4 = Math.floor(Math.random() * 4);
    const c5 = Math.floor(Math.random() * 4);

    let randromDeck = [cards[c1], cards[c2], cards[c3], cards[c4], cards[c5]];

    let shuffleCount = 0;
    randromDeck = randromDeck.map((card) => {
      if (card === "SHUFFLE") {
        shuffleCount++;
        if (shuffleCount > 1) {
          card = "CAT";
        }
      }
      return card;
    });
    return randromDeck;
  };

  const showMessageAndReset = (msg, btnText) => {
    setPopupData({ message: msg, btnText });
    setPopupVisible(true);
  };

  const revealCard = () => {
    let cards = [...deck];
    const poppedCard = cards.pop();
    setOpenedCard(poppedCard);
    setDeck([...cards]);

    if (poppedCard === "SHUFFLE") {
      setTimeout(() => {
        sendDataToUpdate(generateRandomDeck(), [], "", "none");
      }, 500);
      showMessageAndReset("Game Shuffled", "Continue");
    } else if (poppedCard === "CAT") {
      if (!cards.length) {
        sendDataToUpdate(generateRandomDeck(), [], "", "won");
        showMessageAndReset("You won", "Play Again");
      } else {
        sendDataToUpdate(cards, defuseCards, poppedCard, "none");
      }
    } else if (poppedCard === "DEFUSE") {
      if (!cards.length) {
        sendDataToUpdate(generateRandomDeck(), [], "", "won");
        showMessageAndReset("You won", "Play Again");
      } else {
        let updatedDefusedCard = [...defuseCards];
        updatedDefusedCard.push(poppedCard);
        setDefuseCards(updatedDefusedCard);
        sendDataToUpdate(cards, updatedDefusedCard, poppedCard, "none");
      }
    } else if (poppedCard === "EXPLODE") {
      if (defuseCards.length) {
        if (!cards.length) {
          sendDataToUpdate(generateRandomDeck(), [], "", "won");
          showMessageAndReset("You won", "Play Again");
        } else {
          let updatedDefuseCards = [...defuseCards];
          updatedDefuseCards.pop();
          setDefuseCards(updatedDefuseCards);
          sendDataToUpdate(cards, updatedDefuseCards, poppedCard, "none");
        }
      } else {
        setTimeout(() => {
          sendDataToUpdate(generateRandomDeck(), [], "", "lost");
        }, 500);
        showMessageAndReset("Game Over", "Play Again");
      }
    }
  };

  const setOpenedCardSrc = () => {
    if (openedCard === "") {
      return "";
    } else if (openedCard === "SHUFFLE") {
      return shuffleCard;
    } else if (openedCard === "DEFUSE") {
      return defuseCardImg;
    } else if (openedCard === "CAT") {
      return catCard;
    } else if (openedCard === "EXPLODE") {
      return explodeCard;
    }
  };

  return (
    <main className="z-40 w-full h-[89vh]  py-10 px-40">
      <Popover
        popupData={popupData}
        setPopupVisible={setPopupVisible}
        popupVisible={popupVisible}
      />
      <img
        className="absolute w-full h-[100vh] left-0 top-0 z-0"
        src={bgImage}
        alt=""
      ></img>
      <section className="flex justify-center space-x-80 z-10 relative h-[80vh]  text-white">
        <div className="z-20 absolute max-h-44  bottom-0  w-96 ">
          <div className="text-center font-semibold">
            Click on the deck to open a card
          </div>
          {deck.map((card, index) => {
            let right = index * 4;
            let top = index * 9.6;
            return (
              <img
                key={card + index}
                onClick={revealCard}
                alt=""
                style={{
                  position: "relative",
                  width: "7rem",
                  left: right.toString() + "rem",
                  bottom: top.toString() + "rem",
                }}
                src={cardImage}
              ></img>
            );
          })}
        </div>

        <section className="openedCard-container relative mb-4 w-48 h-64 flex-col items-center flex ">
          <h3 className="font-semibold text-lg">Current Card</h3>
          <div className="relative w-48 h-64 flex justify-center items-center">
            <div className="w-full bg-black h-60  top-0 absolute opacity-30"></div>

            {openedCard && (
              <img
                className="w-40 z-20 h-52"
                src={setOpenedCardSrc()}
                alt={openedCard}
              />
            )}
          </div>
        </section>

        <section className=" flex flex-col items-center">
          <h3 className="font-semibold text-lg">Defuse Cards</h3>
          <div className=" max-h-60 h-60 w-48  relative ">
            <div className="w-full bg-black h-full  top-0 absolute opacity-30"></div>

            {defuseCards.map((defuseCard, index) => {
              let right = index * 2;
              let top = index * 12.7;
              return (
                <div key={defuseCard + index} className="defuseCard">
                  <img
                    style={{
                      position: "relative",
                      width: "10rem",
                      left: right.toString() + "rem",
                      bottom: top.toString() + "rem",
                      height: "13rem",
                    }}
                    src={defuseCardImg}
                    alt="defuse-card"
                  />
                </div>
              );
            })}
            {!defuseCards?.length && (
              <div className={`openedCard ${"card-zeroState"}`}></div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default GamePlayArea;
