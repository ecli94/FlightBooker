import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { tripTypes, locations, passengers, classes } from '../components/Home/Constants';

interface StateOperations {
    id: number;
    complete?: boolean;
    count?: number;
}

export interface TripType extends StateOperations {
    name?: string;
}

export interface Location extends StateOperations {
    city?: string;
    country?: string;
}

export interface Action extends StateOperations {
    type?: string;
    id: number;
}

export interface Passenger extends StateOperations {
    type?: string;
    description?: string;
}

export interface Class extends StateOperations {
    name?: string;
}

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

interface PassengerHandlerResponse {
    travelers: Passenger[];
    passengerDispatch: Dispatch<Action>;
}

interface ClassHandlerResponse {
    ticketClasses: Class[];
    classDispatch: Dispatch<Action>;
}

export interface HomeBookingCardContextProps
    extends TypeHandlerResponse,
        LocationToHandlerResponse,
        LocationFromHandlerResponse,
        PassengerHandlerResponse,
        ClassHandlerResponse {}

const HomeBookingCardContext = createContext<HomeBookingCardContextProps | undefined>(undefined);

interface State extends Location, TripType, Passenger {}

const reducer = (state: State[], action: Action) => {
    switch (action.type) {
        case 'COMPLETE':
            return state.map((type) => {
                if (type.id === action.id) {
                    return { ...type, complete: true };
                } else {
                    return { ...type, complete: false };
                }
            });
        case 'INCOMPLETE':
            return state.map((type) => {
                return { ...type, complete: false };
            });
        case 'ADD-PASSENGER':
            return state.map((type) => {
                if (type.id === action.id) {
                    return { ...type, count: type.count!++ };
                } else {
                    return type;
                }
            });
        case 'REMOVE-PASSENGER':
            return state.map((type) => {
                if (type.id === action.id) {
                    if (type.id != 1) {
                        const count = type.count! > 0 ? type.count!-- : 0;
                        return { ...type, count: count };
                    }
                    const count = type.count! > 1 ? type.count!-- : 1;
                    return { ...type, count: count };
                } else {
                    return type;
                }
            });
        default:
            return state;
    }
};

// Create a provider component
const HomeBookingCardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [types, typesDispatch] = useReducer(reducer, tripTypes);
    const [locationTo, locationsToDispatch] = useReducer(reducer, locations);
    const [locationFrom, locationsFromDispatch] = useReducer(reducer, locations);
    const [travelers, passengerDispatch] = useReducer(reducer, passengers);
    const [ticketClasses, classDispatch] = useReducer(reducer, classes);

    const values = {
        types,
        typesDispatch,
        locationTo,
        locationsToDispatch,
        locationFrom,
        locationsFromDispatch,
        travelers,
        passengerDispatch,
        ticketClasses,
        classDispatch,
    };

    return <HomeBookingCardContext.Provider value={values}>{children}</HomeBookingCardContext.Provider>;
};

export { HomeBookingCardContext, HomeBookingCardContextProvider };
