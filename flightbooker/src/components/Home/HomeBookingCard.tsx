import React, { createContext, Dispatch, MouseEventHandler, ReactNode, useContext, useReducer, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";

interface StateOperations {
    id: number;
    complete?: boolean;
    count?: number;

}

interface TripType extends StateOperations {
name?: string;
}

interface Location extends StateOperations {
    city?: string;
    country?: string;
}

interface Action extends StateOperations {
    type?: string;
    id: number;
}

interface Passenger extends StateOperations {
    type?: string;
    description?: string;
}

interface Class extends StateOperations {
    name?: string;
    
}

const tripTypes: TripType[] = [
{ id: 1, name: "One way", complete: true},
{ id: 2, name: "Round trip", complete: false },
{ id: 3, name: "Multi trip", complete: false },
];

const locations: Location[] = [
{ id: 1, city: "Oslo", country: "Norway", complete: false},
{ id: 2, city: "Stavanger", country: "Norway", complete: false },
{ id: 3, city: "Bergen", country: "Norway", complete: false },
{ id: 4, city: "Trondheim", country: "Norway", complete: false },
];

const passengers: Passenger[] = [
{ id: 1, type: "Adult", description: "hey man what", count: 1},
{ id: 2, type: "Child 12-15", description: "Age upon departure", count: 0},
{ id: 3, type: "Child 2-11", description: "Age upon departure", count: 0},
{ id: 4, type: "Infant 0-2", description: "Age upon return", count: 0},
];

const classes: Class[] = [
{ id: 1, name: "All travel classes"},
{ id: 2, name: "Economy"},
{ id: 3, name: "Business"},
];

const TypesContext = createContext<TypeHandlerResponse | undefined>(undefined);
const LocationsToContext = createContext<LocationToHandlerResponse | undefined>(undefined);
const LocationsFromContext = createContext<LocationFromHandlerResponse | undefined>(undefined);
const PassengerContext = createContext<PassengerHandlerResponse | undefined>(undefined);
const ClassContext= createContext<ClassHandlerResponse | undefined>(undefined);

interface State extends Location, TripType, Passenger {}

const reducer = (state: State[], action: Action) => {
    switch (action.type) {
        case "COMPLETE":
            return state.map((type) => {
                    if (type.id === action.id) {
                    return { ...type, complete: true};
                    } else {
                    return {...type, complete: false};
                    }
                    });
        case "ADD-PASSENGER":
            return state.map((type) => {
                if (type.id === action.id) {
                    return {...type, count: type.count!++}
                } else {
                    return type
                }
                })
        case "REMOVE-PASSENGER":
            return state.map((type) => {
                if (type.id === action.id) {
                    const count = type.count! > 0 ? type.count!-- : 0 
                    return {...type, count: count}
                } else {
                    return type
                }
                }) 
        default:
            return state;
    }
};

interface TypeHandlerResponse {
    types: TripType[];
    typesDispatch: Dispatch<Action>;
}

interface LocationToHandlerResponse {
    locationTo: Location[];
    locationsToDispatch: Dispatch<Action>;
}

interface LocationFromHandlerResponse {
    locationFrom: Location[];
    locationsFromDispatch: Dispatch<Action>;
}

interface PassengerHandlerResponse{
    travelers: Passenger[];
    passengerDispatch: Dispatch<Action>;
}

interface ClassHandlerResponse{
    ticketClasses: Class[];
    classDispatch: Dispatch<Action>;
}

// Create a provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [types, typesDispatch] = useReducer(reducer, tripTypes);
    const [locationTo, locationsToDispatch] = useReducer(reducer, locations)
    const [locationFrom, locationsFromDispatch] = useReducer(reducer, locations)
    const [travelers, passengerDispatch] = useReducer(reducer, passengers)
    const [ticketClasses, classDispatch] = useReducer(reducer, classes)

    return (
        <ClassContext.Provider value= {{ticketClasses, classDispatch}}>
        <PassengerContext.Provider value = {{travelers, passengerDispatch}}>
        <LocationsFromContext.Provider value={{locationFrom, locationsFromDispatch}}>
        <LocationsToContext.Provider value={{locationTo, locationsToDispatch}}>
        <TypesContext.Provider value={{types, typesDispatch }}>
            {children}
        </TypesContext.Provider>
        </LocationsToContext.Provider>
        </LocationsFromContext.Provider>
        </PassengerContext.Provider>
        </ClassContext.Provider>
    );
};

type HandlerResponse = TypeHandlerResponse | LocationToHandlerResponse | LocationFromHandlerResponse | PassengerHandlerResponse


// Generic hook to use either context
const useHandler = <T extends HandlerResponse>(context: React.Context<T | undefined>): T => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error('useHandler must be used within a DataProvider');
    }
    return ctx;
}


const HomeBookingCard: React.FC = () => {
    const [isTypeCardVisible, setIsTypeCardVisible] = useState(false);
    const typeCardRef = useRef<HTMLDivElement | null>(null);

    const [isFromCardVisible, setIsFromCardVisible] = useState(false);
    const fromCardRef = useRef<HTMLDivElement | null>(null);

    const [isToCardVisible, setIsToCardVisible] = useState(false);
    const toCardRef = useRef<HTMLDivElement | null>(null);
    
    const [isPassengerCardVisible, setIsPassengerCardVisible] = useState(false);
    const passengerCardRef = useRef<HTMLDivElement | null>(null);

    const showCard = (cardType: "type" | "from" | "to" | "passengers") => {
        // Prevent click from propagating to the document
        if (cardType=="type") setIsTypeCardVisible(true);
        if (cardType=="from") setIsFromCardVisible(true);
        if (cardType=="to") setIsToCardVisible(true);
        if (cardType=="passengers") setIsPassengerCardVisible(true);
    };

    

    interface BookingButtonProps {
        type: string;
        value: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }

    const BookingButton: React.FC<BookingButtonProps> = ({
            type,
            value,
            onClick,
            }) => {
        return (
                <div>
                <button className={styles.bookButton} onClick={onClick}>
                <div>
                <span style={{fontWeight:"lighter"}}> {type} </span>
                </div>
                <div>
                <span style={{fontWeight:"bolder"}}> {value} </span>
                </div>
                </button>
                </div>
               );
    };

    const {types, typesDispatch} = useHandler(TypesContext);    

    const SelectedTypes = () => {
        return (
                <>
                <div>
                <form>
                <label className={styles.cardHeading}>
                Trip types
                </label>
                {types.map((t) => (
                            <label key={t.id}>
                            <input
                            type="checkbox"
                            checked={t.complete}
                            onChange={() => {
                                typesDispatch({ type: "COMPLETE", id: t.id });
                                setIsTypeCardVisible(false);
                                }}
                            />
                            {t.name}
                            </label>))}
                </form>
                </div>
                </>
               );
    }

    interface SelectDestinationProps {
        direction: "Departure locations" | "Destinations"
    }
    
    const {locationTo, locationsToDispatch} = useHandler(LocationsToContext);
    const {locationFrom, locationsFromDispatch} = useHandler(LocationsFromContext);
    
    const SelectDestination: React.FC<SelectDestinationProps> = ({direction}) => {
        const handleLocationChange = (
            event: React.ChangeEvent<HTMLSelectElement>
        ) => {
            const id = parseInt(event.target.value, 10);
            switch (direction) {
                case "Destinations":
                    locationsToDispatch({ type: "COMPLETE", id: id });
                    setIsToCardVisible(false);
                    break;
                case "Departure locations":
                    locationsFromDispatch({ type: "COMPLETE", id: id });
                    setIsFromCardVisible(false);
                    break;
                default:
                    throw new TypeError("Incorrect direction was provided")
            }

        };
        return (
                <>
                <div className={styles.citySelectVerticalMenu}>
                <label className={styles.cardHeading}> {direction}</label>
                <select
                id="toLocations"
                name="toLocations"
                size={8}
                value={
                    (direction == "Destinations") ?
                    locationTo.find((loc) => loc.complete)?.id || "" :
                    locationFrom.find((loc) => loc.complete)?.id || ""
                    }
                onChange={handleLocationChange}
                >
                {(direction == "Destinations") && locationTo.map((t) => (
                            <option key={t.id} value={t.id}>
                            {t.city}, {t.country}
                            </option>
                            ))}
                {(direction == "Departure locations") && locationFrom.map((t) => (
                            <option className={styles.citySelectOptions} key={t.id} value={t.id}>
                            {t.city}, {t.country}
                            </option>
                            ))} 
                </select>
                </div>
                </>
               );
    }

    const {travelers, passengerDispatch} = useHandler(PassengerContext);
    
    const SelectPassengers: React.FC = () => {
        // const handlePassengerChange = (
        //     event: React.ChangeEventHandler<HTMLButtonElement>,
        //     operation: "add" | "remove"
        // ) => {
        //     const id = parseInt(event.target.value, 10);
        //     switch (operation) {
        //         case "add":
        //             passengerDispatch({ type: "ADD-PASSENGER", id: id });
        //             break;
        //         case "remove":
        //             passengerDispatch({ type: "REMOVE-PASSENGER", id: id });
        //             break;
        //         default:
        //             throw new TypeError("Incorrect passenger operation was provided")
        //     }

        // };
        return (
                <>
                <div className={styles.passengerSelectVerticalMenu}>
                <label className={styles.cardHeading}> Passengers and class</label>
                
                {travelers.map((t) => (
                            <div className={styles.passengerRow}>
                            <div className={styles.passengerColumn}>
                            <div><span>{t.type}</span></div>
                            <div><span>{t.description}</span></div>
                            </div>

                            <button className={styles.addPassengerColumn} onClick={() => passengerDispatch({ type: "ADD-PASSENGER", id: t.id })}>
                            <span>+</span>
                            </button>
                            </div>

                            ))} 
                </div>
                </>
               );
    } 

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

