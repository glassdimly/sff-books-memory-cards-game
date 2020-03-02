import React, { MouseEvent, useState } from "react";
import "./App.css";
import Card from "./Card";
import shuffle from "shuffle-array";

type cardArray = number[];

const defaultMatchedState: () => Set<any> = () => new Set();
const defaultSelectedState: () => Set<any> = () => new Set();

export const getNewCards = (): cardArray => {
  let cards: cardArray = [];
  for (let i = 1; i <= 12; i++) {
    cards = [...cards, ...[i, i]];
  }

  return shuffle(cards);
};

function App() {
  // @TODO use useReducer if this becomes more complicated.
  const [selectedState, setSelectedState] = useState(defaultSelectedState);
  const [matchedState, setMatchedState] = useState(defaultMatchedState);
  const [cardsState, setCardsState] = useState(getNewCards());
  const [isLoadingState, setIsLoadingState] = useState(false);

  const handleCardClickWithCardInfo = (cardNumber: number, index: number) => (
    e: MouseEvent<HTMLButtonElement>
  ): void => {
    const doArrayValsMatch = (
      i: number,
      secondI: number,
      array: cardArray
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
      // @ts-ignore @TODO fix typescript not liking how I get the first object in my set
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
  return (
    <div className="gr__card--container" {...loadingAttribute}>
      {cardsState.map((cardNumber, i) => (
        <Card
          key={`${cardNumber}--${i}`}
          cardNumber={cardNumber}
          clickHandler={handleCardClickWithCardInfo(cardNumber, i)}
          selected={selectedState.has(i)}
          matched={matchedState.has(cardNumber)}
        />
      ))}
      <button onClick={shuffleCards}>Shuffle</button>
    </div>
  );
}

export default App;
