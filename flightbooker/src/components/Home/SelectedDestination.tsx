import { Dispatch, SetStateAction } from 'react';
import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';
import styles from '../../styles/Home.module.css';

interface SelectDestinationProps {
    direction: 'Departure locations' | 'Destinations';
    closeCallback: () => void;
    to: string | undefined;
    setTo: Dispatch<SetStateAction<string | undefined>>;
    from: string | undefined;
    setFrom: Dispatch<SetStateAction<string | undefined>>;
}

const SelectDestination: React.FC<SelectDestinationProps> = (props) => {
    const cleanLocation = (loc?: string) => {
        if (loc === undefined) return;

        const locArray = loc.split(',');
        let cleanCity;
        const uncleanCity = locArray[locArray.length - 2].trim();
        switch (uncleanCity.split(' ').length) {
            case 1:
                cleanCity = uncleanCity;
                break;
            case 2:
                cleanCity = uncleanCity.split(' ')[1];
                break;
            default:
                cleanCity = uncleanCity;
        }
        return (cleanCity ? cleanCity : uncleanCity) + ',' + locArray[locArray.length - 1];
    };
    const handleLocationChange = (event: Event) => {
        const target = event.target as HTMLInputElement & { value: { formattedAddress?: string } };
        switch (props.direction) {
            case 'Departure locations':
                props.closeCallback();
                props.setFrom(cleanLocation(target.value?.formattedAddress) ?? '');
                break;
            case 'Destinations':
                props.closeCallback();
                props.setTo(cleanLocation(target.value?.formattedAddress) ?? '');
                break;
            default:
                throw new TypeError('Incorrect direction was provided');
        }
    };
    // current scope is only within Norway
    const countries: string[] = ['no'];

    return (
        <>
            <div className={styles.citySelectVerticalMenu}>
                <APILoader
                    // api key will be ommitted when pushed to github.
                    // must implement env variables and use that instead here
                    apiKey={'YOUR-API-KEY'}
                    solutionChannel={'GMP_GCC_placepicker_to'}
                />
                <div>
                    <PlacePicker
                        className={styles.airportPicker}
                        country={countries}
                        type="airport"
                        itemType="city"
                        placeholder="Enter a location"
                        onPlaceChange={handleLocationChange}
                    />
                </div>
            </div>
        </>
    );
};

export default SelectDestination;
