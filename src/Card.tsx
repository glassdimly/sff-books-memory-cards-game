import React, { FunctionComponent, MouseEvent } from "react";
import ReactCardFlip from "react-card-flip";

const numberToBookMap = [
  "altered-carbon.jpg",
  "do-androids-dream-of-electric-sheep.jpg",
  "hyperion.jpg",
  "neuromancer.jpg",
  "sparrow.jpg",
  "ancillary-justice.jpg",
  "dune.jpg",
  "iron-dragons-daughter.jpg",
  "permutation-city.jpg",
  "windup-girl.jpg",
  "dawn.png",
  "feed.jpg",
  "solaris.jpg"
];

const booksPath = "./img/books";

type CardProps = {
  cardNumber: number;
  selected: boolean;
  matched: boolean;
  clickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
};

type CardHtmlAttributes = {
  "data-selected"?: boolean;
  "data-matched"?: boolean;
};

const Card: FunctionComponent<CardProps> = ({
  selected,
  matched,
  cardNumber,
  clickHandler
}) => {
  const attributes: CardHtmlAttributes = {};
  if (selected) attributes["data-selected"] = selected;
  if (matched) attributes["data-matched"] = matched;
  return (
    <div className="gr__card">
      <button {...attributes} className="gr__card--button" onClick={clickHandler}>
        {selected ? cardNumber : ""}
      </button>
      <ReactCardFlip isFlipped={selected} flipDirection="vertical">
        <div className="gr__card--front">
        </div>

        <div className="gr__card--back" style={{backgroundImage: `url(${booksPath}/${numberToBookMap[cardNumber]})`}}>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
