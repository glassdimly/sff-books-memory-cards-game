import React, { MouseEvent, useState } from "react";
import "./App.scss";
import Card from "./Card";
import shuffle from "shuffle-array";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

type cardId = number;
type cardIdArray = cardId[];
type cardIndex = number;

const defaultMatchedState: () => Set<cardId> = () => new Set();
const defaultSelectedState: () => Set<cardIndex> = () => new Set();

export const getNewCards = (): cardIdArray => {
  let cards: cardIdArray = [];
  for (let i = 1; i <= 12; i++) {
    cards = [...cards, ...[i, i]];
  }

  return shuffle(cards);
};

function App() {
  // @TODO use useReducer if this becomes more complicated.
  const [selectedState, setSelectedState] = useState<Set<cardId>>(defaultSelectedState);
  const [matchedState, setMatchedState] = useState<Set<cardIndex>>(defaultMatchedState);
  const [cardsState, setCardsState] = useState<cardIdArray>(getNewCards());
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  const handleCardClickWithCardInfo = (cardNumber: number, index: number) => (
    e: MouseEvent<HTMLButtonElement>
  ): void => {
    const doArrayValsMatch = (
      i: number,
      secondI: number,
      array: cardIdArray
    ): boolean => (i === secondI ? false : array[i] === array[secondI]);

    if (isLoadingState) {
      return;
    }

    const selectedSize = selectedState.size;

    if (selectedSize >= 2) {
      setSelectedState(defaultSelectedState);
      return;
    }

    setSelectedState(new Set(selectedState.add(index)));

    if (selectedSize === 0) {
      return;
    }

    if (selectedSize === 1) {
      if (doArrayValsMatch([...selectedState][0], index, cardsState)) {
        setMatchedState(new Set(matchedState.add(cardNumber)));
      }
    }

    setIsLoadingState(true);
    setTimeout(() => {
      selectedState.clear();
      setSelectedState(defaultSelectedState);
      setIsLoadingState(false);
    }, 2000);
  };

  const shuffleCards = () => {
    setMatchedState(defaultMatchedState);
    setCardsState(getNewCards());
    setSelectedState(defaultSelectedState);
  };

  const loadingAttribute = isLoadingState ? { "data-loading": true } : {};
  const hasWon = matchedState.size === cardsState.length / 2;
  const { width, height } = useWindowSize();
  if (hasWon) {
    setTimeout(shuffleCards, 10000);
  }
  return (
    <div className="gr_cards">
      <button className="gr_cards--shuffle-button" onClick={shuffleCards}>
        <span className="gr_cards--shuffle-button-text">Shuffle</span>
      </button>
      {hasWon ? <Confetti width={width} height={height} /> : ""}
      <div className="gr_cards--container" {...loadingAttribute}>
        {cardsState.map((cardNumber, i) => (
          <Card
            key={`${cardNumber}--${i}`}
            cardNumber={cardNumber}
            clickHandler={handleCardClickWithCardInfo(cardNumber, i)}
            selected={selectedState.has(i)}
            matched={matchedState.has(cardNumber)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
