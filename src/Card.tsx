import React, { FunctionComponent, MouseEvent } from "react";
import ReactCardFlip from "react-card-flip";
import { getBooks, cardBack } from "./assets";

type CardProps = {
  cardNumber: number;
  selected: boolean;
  matched: boolean;
  // @TODO support keyboard events, make accessible
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
    <div className="gr_cards--card" {...attributes}>
      <button className="gr_cards--button" onClick={clickHandler}>
        {selected ? cardNumber : ""}
      </button>
      {/* @TODO figure out what's wrong.
      // @ts-ignore */}
      <ReactCardFlip isFlipped={selected || matched} flipDirection="vertical">
        { /* @TODO implement srcset */ }
        <img
          className="gr_cards--card-side gr_cards--card-back"
          src={cardBack}
        />
        <div className="gr_cards--card-front--wrapper">
          <img
            className="gr_cards--card-side gr_cards--card-front"
            src={getBooks()[cardNumber]}
          />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
