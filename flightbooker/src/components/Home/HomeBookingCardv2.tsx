import React, { useRef } from "react";
import styles from "../../styles/Home.module.css";
import useContextHandler from "../../hooks/useHomeBookingCard";
import SelectedTypes from "./SelectedTypes";
import SelectDestination from "./SelectedDestination";
import SelectPassengers from "./SelectPassengers";
import BookingButton from "./BookingButton";

const HomeBookingCard: React.FC = () => {
    const typeCardRef = useRef<HTMLDivElement | null>(null);
    const fromCardRef = useRef<HTMLDivElement | null>(null);
    const toCardRef = useRef<HTMLDivElement | null>(null);
    const passengerCardRef = useRef<HTMLDivElement | null>(null);

    const {
            setIsTypeCardVisible,
            setIsFromCardVisible,
            setIsToCardVisible,
            setIsPassengerCardVisible,
            types,
            locationTo,
            locationFrom,
            travelers,
            isTypeCardVisible,
            isFromCardVisible,
            isToCardVisible,
            isPassengerCardVisible
        } = useContextHandler();
    

    const showCard = (cardType: "type" | "from" | "to" | "passengers") => {
        // Prevent click from propagating to the document
        if (cardType=="type") setIsTypeCardVisible(true);
        if (cardType=="from") setIsFromCardVisible(true);
        if (cardType=="to") setIsToCardVisible(true);
        if (cardType=="passengers") setIsPassengerCardVisible(true);
    };

    const isOneWayPhaseTwo = (): boolean => {
        const oneWaySelected = types.find((x) => x.name == "One way")?.complete;
        const toSelected = locationTo.some((x) => x.complete == true);
        const fromSelected = locationFrom.some((x) => x.complete == true);
        return ((oneWaySelected ?? false) && (toSelected) && (fromSelected))

    }

    return (
            <div className={styles.centerColumn}>
            <div className={styles.bookRow}>
            <div
                style={{visibility:(isTypeCardVisible ? undefined : "hidden")}}
                className={styles.overlay}
                onClick={() => setIsTypeCardVisible(false)}
            >

            <div
            style={{visibility:(isTypeCardVisible ? undefined : "hidden")}}
            ref={typeCardRef}
            id="tripType"
            className={styles.card}
            onClick={(e) => e.stopPropagation()}>
            <SelectedTypes />
            </div>
            </div>

            {isFromCardVisible && (
                    <div className={styles.overlay} onClick={() => setIsFromCardVisible(false)}>
                    <div
                    ref={fromCardRef}
                    id="from"
                    className={styles.card}
                    onClick={(e) => e.stopPropagation()}>
                    <SelectDestination direction="Departure locations"/>
                    </div>
                    </div>
                    )}

            {isToCardVisible && (
                    <div className={styles.overlay} onClick={() => setIsToCardVisible(false)}>
                    <div
                    ref={toCardRef}
                    id="to"
                    className={styles.card}
                    onClick={(e) => e.stopPropagation()}>
                    <SelectDestination direction="Destinations"/>
                    </div>
                    </div>
                    )}
             
            {isPassengerCardVisible && (
                    <div className={styles.overlay} onClick={() => setIsPassengerCardVisible(false)}>
                    <div
                    ref={passengerCardRef}
                    id="to"
                    className={styles.passengerCard}
                    onClick={(e) => e.stopPropagation()}>
                    <SelectPassengers/>
                    </div>
                    </div>
                    )}

    <div className={styles.bookType}>
        <BookingButton type="Trip type" value={types.find(x=>x.complete == true)!.name ?? ""} onClick={() => showCard("type")} />
        </div>
        <div className={styles.bookFrom}>
        <BookingButton type="From" value={locationFrom.find(x=>x.complete == true) !== undefined ? locationFrom.find(x=>x.complete == true)!.city ?? "": ""} onClick={() => showCard("from")} />
        </div>
        <div className={styles.bookTo}>
        <BookingButton type="To" value={locationTo.find(x=>x.complete == true) !== undefined ? locationTo.find(x=>x.complete == true)!.city ?? "": ""} onClick={() => showCard("to")} />
        </div>
        {(isOneWayPhaseTwo()) && <div className={styles.bookPassengers}>
        <BookingButton type="Passengers and class" value={travelers.reduce((sum, type)=>sum + type.count!, 0).toString()} onClick={() => showCard("passengers")} />
        </div>}
        {(isOneWayPhaseTwo()) && <div className={styles.bookDateOneWay}>
        <BookingButton type="Depart" value={locationTo.find(x=>x.complete == true) !== undefined ? locationTo.find(x=>x.complete == true)!.city ?? "": ""} onClick={() => showCard("to")} />
        </div>}
        </div>
        </div>
        );
};

export default HomeBookingCard;
