/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const imgReactions = [
  { src: "/img/meme-reactions-01.jpg" },
  { src: "/img/meme-reactions-02.jpg" },
  { src: "/img/meme-reactions-03.jpg" },
  { src: "/img/meme-reactions-04.jpg" },
  { src: "/img/meme-reactions-05.jpg" },
  { src: "/img/meme-reactions-06.jpg" },
  { src: "/img/meme-reactions-07.jpg" },
  { src: "/img/meme-reactions-08.jpg" },
  { src: "/img/meme-reactions-09.jpg" },
  { src: "/img/meme-reactions-10.jpg" },
  { src: "/img/meme-reactions-11.jpg" },
  { src: "/img/meme-reactions-12.jpg" },
  { src: "/img/meme-reactions-13.jpg" },
];

const cardImages = [
  { src: "/img/leo-01.png", matched: false },
  { src: "/img/michael-01.png", matched: false },
  { src: "/img/spidey-01.png", matched: false },
  { src: "/img/frog-01.png", matched: false },
  { src: "/img/cat-01.png", matched: false },
  { src: "/img/behindtree-01.png", matched: false },
];

let errors = 0;

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    errors = 0;
  };

  const Header = () => {
    const errorIndex = Math.min(errors, imgReactions.length - 1);
    const reactionImage = imgReactions[errorIndex].src;

    return (
      <header className="reactions">
        <div>
          <h1>Memerize</h1>
          <button onClick={shuffleCards}>New Game</button>
          <p>Turns: {turns}</p>
        </div>
        <div>
          <img src={reactionImage} alt="reaction image" />
        </div>
      </header>
    );
  };

  //handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        errors++;
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice & increase turn

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
