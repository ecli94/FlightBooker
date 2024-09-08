import React from 'react';
import HomeCard from '../components/Home/HomeCardv2';
import { HomeBookingCardContextProvider } from '../providers/HomeBookingCardContextProvider';

const Home: React.FC = () => {
    return (
        <HomeBookingCardContextProvider>
            <HomeCard />
        </HomeBookingCardContextProvider>
    );
};

export default Home;
