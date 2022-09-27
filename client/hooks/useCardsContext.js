import { CardsContext } from "../context/CardsContext";
import { useContext } from "react";

export const useCardsContext = () => {
  const cardsContext = useContext(CardsContext);

  return cardsContext;
};