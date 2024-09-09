import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/Homev2.module.css';
import GoogleMapsLoader from '../../services/GoogleMapsLoader';

interface SelectDestinationProps {
    direction: 'Departure locations' | 'Destinations';
    closeCallback: () => void;
    to: string | undefined;
    setTo: Dispatch<SetStateAction<string | undefined>>;
    from: string | undefined;
    setFrom: Dispatch<SetStateAction<string | undefined>>;
    show: boolean;
    hideLocationsCallback: () => void;
    showLocationsCallback: () => void;
}

const SelectDestination: React.FC<SelectDestinationProps> = (props) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [location, setLocation] = useState<google.maps.places.AutocompletePrediction | undefined>();

    useEffect(() => {
        if (!window.google) {
            console.error('Google Maps JavaScript API is not loaded.');
            return;
        }

        const service = new window.google.maps.places.AutocompleteService();

        const types = ['airport'];
        const language = 'en';
        const country = 'no';

        if (input) {
            service.getPlacePredictions(
                { input, types, language, region: country, componentRestrictions: { country } },
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setSuggestions(predictions);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        } else {
            service.getPlacePredictions(
                { input: 's', types, language, region: country, componentRestrictions: { country } },
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setSuggestions(predictions);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        }
    }, [input, props.show]);

    useEffect(() => {
        setInput(location?.description ?? '');
    }, [props.show, location?.description]);

    const onLocationSelect = (value?: google.maps.places.AutocompletePrediction) => {
        setLocation(value);
        setInput(value?.description ?? '');
    };
    // const cleanLocation = (loc?: string) => {
    //     if (loc === undefined) return;

    //     const locArray = loc.split(',');
    //     let cleanCity;
    //     const uncleanCity = locArray[locArray.length - 2].trim();
    //     switch (uncleanCity.split(' ').length) {
    //         case 1:
    //             cleanCity = uncleanCity;
    //             break;
    //         case 2:
    //             cleanCity = uncleanCity.split(' ')[1];
    //             break;
    //         default:
    //             cleanCity = uncleanCity;
    //     }
    //     return (cleanCity ? cleanCity : uncleanCity) + ',' + locArray[locArray.length - 1];
    // };
    const cleanLocation = (loc?: string) => {
        if (loc === undefined) return;

        return loc.split(',')[loc.split(',').length - 1];
    };

    const handleLocationChange = (event: MouseEvent<HTMLOptionElement>) => {
        const target = event.target as HTMLOptionElement & { value: string };
        switch (props.direction) {
            case 'Departure locations':
                props.closeCallback();
                props.setFrom(cleanLocation(target.value) ?? '');
                break;
            case 'Destinations':
                props.closeCallback();
                props.setTo(cleanLocation(target.value) ?? '');
                break;
            default:
                throw new TypeError('Incorrect direction was provided');
        }
    };

    return (
        <>
            <div
                className={styles.cityCardContentContainer}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.cityCardContent}>
                    <GoogleMapsLoader />
                    <input
                        type="text"
                        value={input}
                        autoFocus
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        placeholder="Search your city"
                        onClick={(e) => {
                            props.showLocationsCallback();
                            e.stopPropagation();
                        }}
                    />
                    {props.show && (
                        <select size={5} defaultValue={location?.description} onClick={(e) => e.stopPropagation()}>
                            {suggestions &&
                                suggestions.map((suggestion) => (
                                    <option
                                        key={suggestion.place_id}
                                        onClick={(e) => {
                                            handleLocationChange(e);
                                            onLocationSelect();
                                        }}
                                    >
                                        {suggestion.description}
                                    </option>
                                ))}
                        </select>
                    )}
                </div>
            </div>
        </>
    );
};

export default SelectDestination;
