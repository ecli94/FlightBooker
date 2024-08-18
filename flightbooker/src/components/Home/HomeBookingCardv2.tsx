import React, { useEffect, useRef, useState } from "react";
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

  const [isTypeCardVisible, setIsTypeCardVisible] = useState(false);
  const [isFromCardVisible, setIsFromCardVisible] = useState(false);
  const [isToCardVisible, setIsToCardVisible] = useState(false);
  const [isPassengerCardVisible, setIsPassengerCardVisible] = useState(false);
  const [to, setTo] = useState<number | undefined>(undefined);
  const [from, setFrom] = useState<number | undefined>(undefined);

  const {
    types,
    locationTo,
    locationFrom,
    travelers,
    locationsToDispatch,
    locationsFromDispatch,
  } = useContextHandler();

  const showCard = (cardType: "type" | "from" | "to" | "passengers") => {
    // Prevent click from propagating to the document
    if (cardType == "type") setIsTypeCardVisible(true);
    if (cardType == "from") setIsFromCardVisible(true);
    if (cardType == "to") setIsToCardVisible(true);
    if (cardType == "passengers") setIsPassengerCardVisible(true);
  };

  const isOneWayPhaseTwo = (): boolean => {
    const oneWaySelected = types.find((x) => x.name == "One way")?.complete;
    const toSelected = locationTo.some((x) => x.complete == true);
    const fromSelected = locationFrom.some((x) => x.complete == true);
    return (oneWaySelected ?? false) && toSelected && fromSelected;
  };

  useEffect(() => {
    const toId =
      locationTo.find((it) => it.complete) !== undefined
        ? (locationTo.find((it) => it.complete)!.id ?? 0)
        : 0;
    const fromId =
      locationFrom.find((it) => it.complete) !== undefined
        ? (locationFrom.find((it) => it.complete)!.id ?? 0)
        : 0;

    if (toId == fromId && toId != 0) {
      locationsToDispatch({ type: "INCOMPLETE", id: toId });
      setTo(undefined);
    }
  }, [locationTo]);

  useEffect(() => {
    const toId =
      locationTo.find((it) => it.complete) !== undefined
        ? (locationTo.find((it) => it.complete)!.id ?? 0)
        : 0;
    const fromId =
      locationFrom.find((it) => it.complete) !== undefined
        ? (locationFrom.find((it) => it.complete)!.id ?? 0)
        : 0;

    if (toId == fromId && fromId != 0) {
      locationsFromDispatch({ type: "INCOMPLETE", id: toId });
      setFrom(undefined);
    }
  }, [locationTo]);

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
    <div className={styles.centerColumn}>
      <div className={styles.bookRow}>
        {isTypeCardVisible && (
          <div className={styles.overlay} onClick={closeTypeCard}>
            <div
              ref={typeCardRef}
              id="tripType"
              className={styles.card}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectedTypes />
            </div>
          </div>
        )}

        {isFromCardVisible && (
          <div className={styles.overlay} onClick={closeFromCard}>
            <div
              ref={fromCardRef}
              id="from"
              className={styles.card}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectDestination direction="Departure locations" />
            </div>
          </div>
        )}

        {isToCardVisible && (
          <div className={styles.overlay} onClick={closeToCard}>
            <div
              ref={toCardRef}
              id="to"
              className={styles.card}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectDestination direction="Destinations" />
            </div>
          </div>
        )}

        {isPassengerCardVisible && (
          <div className={styles.overlay} onClick={closePassengerCard}>
            <div
              ref={passengerCardRef}
              id="to"
              className={styles.passengerCard}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectPassengers />
            </div>
          </div>
        )}

        <div className={styles.bookType}>
          <BookingButton
            type="Trip type"
            value={types.find((x) => x.complete == true)!.name ?? ""}
            onClick={() => showCard("type")}
          />
        </div>
        <div className={styles.bookFrom}>
          <BookingButton
            type="From"
            value={
              locationFrom.find((x) => x.complete == true) !== undefined
                ? (locationFrom.find((x) => x.complete == true)!.city ?? "")
                : ""
            }
            onClick={() => showCard("from")}
          />
        </div>
        <div className={styles.bookTo}>
          <BookingButton
            type="To"
            value={
              locationTo.find((x) => x.complete == true) !== undefined
                ? (locationTo.find((x) => x.complete == true)!.city ?? "")
                : ""
            }
            onClick={() => showCard("to")}
          />
        </div>
        {isOneWayPhaseTwo() && (
          <div className={styles.bookPassengers}>
            <BookingButton
              type="Passengers and class"
              value={travelers
                .reduce((sum, type) => sum + type.count!, 0)
                .toString()}
              onClick={() => showCard("passengers")}
            />
          </div>
        )}
        {isOneWayPhaseTwo() && (
          <div className={styles.bookDateOneWay}>
            <BookingButton
              type="Depart"
              value={
                locationTo.find((x) => x.complete == true) !== undefined
                  ? (locationTo.find((x) => x.complete == true)!.city ?? "")
                  : ""
              }
              onClick={() => showCard("to")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBookingCard;
