import React from "react";
import HomeBookingCard from "../components/Home/HomeBookingCardv3";
import { HomeBookingCardContextProvider } from "../providers/HomeBookingCardContextProvider";

const Home: React.FC = () => {
  return (
    <HomeBookingCardContextProvider>
      <HomeBookingCard />
    </HomeBookingCardContextProvider>
  );
};

export default Home;
