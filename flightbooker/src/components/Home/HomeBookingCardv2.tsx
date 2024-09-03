import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Homev2.module.css';
import useContextHandler from '../../hooks/useHomeBookingCard';
import logo from '../../assets/logo.jpg';
import languageHome from '../../assets/languageHome.jpg';
import loginHome from '../../assets/loginHome.jpg';
import menuHome from '../../assets/menuHome.jpg';
import bookHome from '../../assets/bookHome.jpg';
import searchHome from '../../assets/searchHome.jpg';
import bookPicHome from '../../assets/bookPicHome.jpg';
import BookingButton from './BookingButtonv2';
import TypeCard from './TypeCardv2';
import DestinationFromCard from './DestinationFromCardv2';
import DestinationToCard from './DestinationToCardv2';
import PassengerCard from './PassengerCardv2';
import useLanguageLocation from '../../hooks/useLanguageLocation';

const HomeBookingCard: React.FC = () => {
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

    const { types, travelers, ticketClasses } = useContextHandler();
    const language = localStorage.getItem('language');
    const location = localStorage.getItem('location');

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

    return (
        <div className={styles.mainContainer}>
            <div className={styles.bookContainer} style={{ backgroundImage: `url(${bookPicHome})` }}></div>

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
                <div className={styles.menu}>
                    <img src={menuHome}></img>
                    <span>Menu</span>
                </div>
                <div className={styles.book}>
                    <img src={bookHome}></img>
                    <span>Book</span>
                </div>
                <div className={styles.search}>
                    <img src={searchHome}></img>
                    <span>Search</span>
                </div>
            </div>
        </div>
    );
    {
        /* <div className={styles.centerColumn}>
            <div className={styles.bookRow}>
                {isTypeCardVisible && (
                    <TypeCard closeCard={closeTypeCard} setIsTypeCardVisible={setIsTypeCardVisible} ref={typeCardRef} />
                )}

                {isFromCardVisible && (
                    <DestinationFromCard
                        closeCard={closeFromCard}
                        to={to}
                        from={from}
                        setTo={setTo}
                        setFrom={setFrom}
                        ref={fromCardRef}
                    />
                )}

                {isToCardVisible && (
                    <DestinationToCard
                        closeCard={closeToCard}
                        to={to}
                        from={from}
                        setTo={setTo}
                        setFrom={setFrom}
                        ref={toCardRef}
                    />
                )}

                {isPassengerCardVisible && <PassengerCard closeCard={closePassengerCard} ref={passengerCardRef} />}

                <div className={styles.bookType}>
                    <BookingButton
                        type="Trip type"
                        value={types.find((x) => x.complete == true)!.name ?? ''}
                        onClick={() => showCard('type')}
                    />
                </div>
                <div className={styles.bookFrom}>
                    <BookingButton type="From" value={from ?? ''} onClick={() => showCard('from')} />
                </div>
                <div className={styles.bookTo}>
                    <BookingButton type="To" value={to ?? ''} onClick={() => showCard('to')} />
                </div>
                {isOneWayPhaseTwo() && (
                    <div className={styles.bookPassengers}>
                        <BookingButton
                            type="Passengers and class"
                            value={`${travelers.reduce((sum, type) => sum + type.count!, 0).toString()}, ${ticketClasses.find((tc) => tc.complete == true)?.name}`}
                            onClick={() => showCard('passengers')}
                        />
                    </div>
                )}
                {isOneWayPhaseTwo() && (
                    <div className={styles.bookDateOneWay}>
                        <BookingButton type="Depart" value={to ?? ''} onClick={() => showCard('to')} />
                    </div>
                )}
            </div>
        </div> */
    }
};

export default HomeBookingCard;
