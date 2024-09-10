import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Homev2.module.css';
import logo from '../../assets/logoDarkMode.jpg';
import languageHome from '../../assets/languageHome.jpg';
import loginHome from '../../assets/loginHome.jpg';
import menuHome from '../../assets/menuHome.svg';
import bookHome from '../../assets/bookHome.svg';
import searchHome from '../../assets/searchHome.svg';
import bookPicHome from '../../assets/bookPicHome.jpg';
import manageHome from '../../assets/manageHome.svg';
import checkInHome from '../../assets/checkInHome.svg';
import statusCheck from '../../assets/statusCheck.svg';
import HomeBookingCard from './HomeBookingCardv2';
import useHomeBookingCardContextHandler from '../../hooks/useHomeBookingCard';
import TypeCard from './TypeCardv2';
import DestinationFromCard from './DestinationFromCardv2';
import DestinationToCard from './DestinationToCardv2';
import PassengerCard from './PassengerCardv2';

const HomeCard: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isBookingVisible, setIsBookingVisible] = useState(true);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const language = localStorage.getItem('language');
    const location = localStorage.getItem('location');

    const typeCardRef = useRef<HTMLDivElement | null>(null);
    const fromCardRef = useRef<HTMLDivElement | null>(null);
    const toCardRef = useRef<HTMLDivElement | null>(null);
    const passengerCardRef = useRef<HTMLDivElement | null>(null);

    const [isTypeCardVisible, setIsTypeCardVisible] = useState(false);
    const [isFromCardVisible, setIsFromCardVisible] = useState(false);
    const [isToCardVisible, setIsToCardVisible] = useState(false);
    const [isPassengerCardVisible, setIsPassengerCardVisible] = useState(false);
    const [to, setTo] = useState<string | undefined>(undefined);
    const [from, setFrom] = useState<string | undefined>(undefined);

    const { types } = useHomeBookingCardContextHandler();

    const showCard = (cardType: 'type' | 'from' | 'to' | 'passengers') => {
        // Prevent click from propagating to the document
        if (cardType == 'type') setIsTypeCardVisible(true);
        if (cardType == 'from') setIsFromCardVisible(true);
        if (cardType == 'to') setIsToCardVisible(true);
        if (cardType == 'passengers') setIsPassengerCardVisible(true);
    };

    const isOneWayPhaseTwo = (): boolean => {
        const oneWaySelected = types.find((x) => x.name == 'One way')?.complete;
        return (oneWaySelected ?? false) && to !== undefined && from !== undefined;
    };

    const isRoundTripPhaseTwo = (): boolean => {
        const roundTripSelected = types.find((x) => x.name == 'Round trip')?.complete;
        return (roundTripSelected ?? false) && to !== undefined && from !== undefined;
    };

    useEffect(() => {
        if (to === from) setTo(undefined);
    }, [from]); //eslint-disable-line

    useEffect(() => {
        if (to === from) setFrom(undefined);
    }, [to]); //eslint-disable-line

    const closeTypeCard = () => {
        setIsTypeCardVisible(false);
    };

    const closeFromCard = () => {
        setIsFromCardVisible(false);
    };

    const closeToCard = () => {
        setIsToCardVisible(false);
    };

    const closePassengerCard = () => {
        setIsPassengerCardVisible(false);
    };

    const onMenu = () => {
        setIsMenuVisible(true);
        setIsBookingVisible(false);
        setIsSearchVisible(false);
    };

    const onBook = () => {
        setIsMenuVisible(false);
        setIsBookingVisible(true);
        setIsSearchVisible(false);
    };

    const onSearch = () => {
        setIsMenuVisible(false);
        setIsBookingVisible(false);
        setIsSearchVisible(true);
    };

    return (
        <>
            {isTypeCardVisible && (
                <div className={styles.dialogContainer}>
                    <TypeCard closeCard={closeTypeCard} setIsTypeCardVisible={setIsTypeCardVisible} ref={typeCardRef} />
                </div>
            )}

            {isFromCardVisible && (
                <div className={styles.dialogContainer}>
                    <DestinationFromCard
                        closeCard={closeFromCard}
                        to={to}
                        from={from}
                        setTo={setTo}
                        setFrom={setFrom}
                        ref={fromCardRef}
                    />
                </div>
            )}

            {isToCardVisible && (
                <div className={styles.dialogContainer}>
                    <DestinationToCard
                        closeCard={closeToCard}
                        to={to}
                        from={from}
                        setTo={setTo}
                        setFrom={setFrom}
                        ref={toCardRef}
                    />
                </div>
            )}

            {isPassengerCardVisible && (
                <div className={styles.dialogContainer}>
                    <PassengerCard closeCard={closePassengerCard} ref={passengerCardRef} />
                </div>
            )}

            <div className={styles.mainContainer}>
                <div className={styles.heroBannerContainer} style={{ backgroundImage: `url(${bookPicHome})` }}>
                    {isBookingVisible && (
                        <div className={styles.bookCardContainer}>
                            <HomeBookingCard
                                showCard={showCard}
                                from={from}
                                to={to}
                                isOneWayPhaseTwo={isOneWayPhaseTwo}
                                isRoundTripPhaseTwo={isRoundTripPhaseTwo}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <img src={logo}></img>
                    </div>
                    <div className={styles.locationLanguage}>
                        <img src={languageHome}></img>
                        <span>{location + '-' + language}</span>
                    </div>
                    <div className={styles.login}>
                        <img src={loginHome}></img>
                        <span>Login</span>
                    </div>
                </div>
                <div className={styles.menuContainer}>
                    <div
                        className={styles.menu}
                        style={isMenuVisible ? { borderBottom: '0.25rem solid white' } : undefined}
                        onClick={onMenu}
                    >
                        <img src={menuHome}></img>
                        <span>Menu</span>
                    </div>
                    <div
                        className={styles.book}
                        style={isBookingVisible ? { borderBottom: '0.25rem solid white' } : undefined}
                        onClick={onBook}
                    >
                        <img src={bookHome}></img>
                        <span>Book</span>
                    </div>
                    <div
                        className={styles.search}
                        style={isSearchVisible ? { borderBottom: '0.25rem solid white' } : undefined}
                        onClick={onSearch}
                    >
                        <img src={searchHome}></img>
                        <span>Search</span>
                    </div>
                </div>
                <div className={styles.lowerMenuContainer}>
                    <div className={styles.manage}>
                        <img src={manageHome}></img>
                        <span>Manage</span>
                    </div>
                    <div className={styles.checkIn}>
                        <img src={checkInHome}></img>
                        <span>Check in</span>
                    </div>
                    <div className={styles.statusCheck}>
                        <img src={statusCheck}></img>
                        <span>Status check</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCard;
