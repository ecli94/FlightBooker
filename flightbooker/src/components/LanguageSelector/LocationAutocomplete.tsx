import { useEffect, useState } from 'react';
import GoogleMapsLoader from '../../services/GoogleMapsLoader';
import useLanguageLocation from '../../hooks/useLanguageLocation';

interface LocationAutocompleteProps {
    show: boolean;
    showLocationsCallback: () => void;
    hideLocationsCallback: () => void;
}

const LocationAutocomplete = (props: LocationAutocompleteProps) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const { setLocation, setLanguage, location } = useLanguageLocation();

    useEffect(() => {
        if (!window.google) {
            console.error('Google Maps JavaScript API is not loaded.');
            return;
        }

        const service = new window.google.maps.places.AutocompleteService();

        const types = ['country'];
        const language = 'en';

        if (input) {
            service.getPlacePredictions({ input, types, language }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            });
        } else {
            service.getPlacePredictions({ input: 'nor', types, language }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            });
        }
    }, [input, props.show]);

    useEffect(() => {
        setInput(location?.description ?? '');
    }, [props.show, location?.description]);

    const onLocationSelect = (value?: google.maps.places.AutocompletePrediction) => {
        setLocation(value);
        setLanguage(undefined);
        setInput(value?.description ?? '');
        props.hideLocationsCallback();
    };

    return (
        <>
            <GoogleMapsLoader />
            <span>Location</span>
            <form>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search your country"
                    onClick={(e) => {
                        props.showLocationsCallback();
                        e.stopPropagation();
                    }}
                />
            </form>
            {props.show && (
                <form>
                    <select size={5} defaultValue={location?.description} onClick={(e) => e.stopPropagation()}>
                        {suggestions &&
                            suggestions.map((suggestion) => (
                                <option key={suggestion.place_id} onClick={() => onLocationSelect(suggestion)}>
                                    {suggestion.description}
                                </option>
                            ))}
                    </select>
                </form>
            )}
        </>
    );
};

export default LocationAutocomplete;
