import React from "react";
import { render } from "@testing-library/react";
import App, { getNewCards } from "./App";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("getCards returns 24 matching cards", () => {
  const getRandomFromRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);
  const cards = getNewCards();
  expect(cards.length).toBe(24);
  const cardNumToTest = getRandomFromRange(1, 12);
  console.log("cardNumToTest", cardNumToTest);
  const matchingCards = cards.filter(x => x === cardNumToTest);
  expect(matchingCards.length).toBe(2);
});
