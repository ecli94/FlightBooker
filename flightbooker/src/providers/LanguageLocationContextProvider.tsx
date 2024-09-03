import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export interface Language {
    language?: string;
    setLanguage: Dispatch<SetStateAction<string | undefined>>;
}

export interface Location {
    location?: google.maps.places.AutocompletePrediction;
    setLocation: Dispatch<SetStateAction<google.maps.places.AutocompletePrediction | undefined>>;
}

export interface LanguageLocationContextProps extends Language, Location {}

const LanguageLocationContext = createContext<LanguageLocationContextProps | undefined>(undefined);

const LanguageLocationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<google.maps.places.AutocompletePrediction | undefined>();

    const values = {
        language,
        setLanguage,
        location,
        setLocation,
    };

    return <LanguageLocationContext.Provider value={values}>{children}</LanguageLocationContext.Provider>;
};

export { LanguageLocationContext, LanguageLocationContextProvider };
