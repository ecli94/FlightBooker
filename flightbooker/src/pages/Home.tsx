import React from "react";
import HomeBookingCard from "../components/Home/HomeBookingCard";
import { HomeBookingCardContextProvider } from "../providers/HomeBookingCardContextProvider";

const Home: React.FC = () => {
  return (
    <HomeBookingCardContextProvider>
      <HomeBookingCard />
    </HomeBookingCardContextProvider>
  );
};

export default Home;
