import React from 'react';
import HomeBookingCard from '../components/Home/HomeBookingCard';
import { HomeBookingCardContextProvider } from '../providers/HomeBookingCardContextProvider';
import TopOfPage from './TopOfPage';
import BottomOfPage from './BottomOfPage';

const Home: React.FC = () => {
    return (
        <>
            <TopOfPage />
            <HomeBookingCardContextProvider>
                <HomeBookingCard />
            </HomeBookingCardContextProvider>
            <BottomOfPage />
        </>
    );
};

export default Home;
