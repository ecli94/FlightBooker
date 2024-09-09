import SelectDestination from './SelectedDestinationv2';
import styles from '../../styles/Homev2.module.css';
import { Dispatch, forwardRef, SetStateAction, useState } from 'react';

interface DestinationFromCardProps {
    closeCard: () => void;
    to: string | undefined;
    from: string | undefined;
    setTo: Dispatch<SetStateAction<string | undefined>>;
    setFrom: Dispatch<SetStateAction<string | undefined>>;
}

const DestinationFromCard = forwardRef<HTMLDivElement, DestinationFromCardProps>((props, ref) => {
    const direction = 'Departure locations';
    const [showLocations, setShowLocations] = useState(false);
    const toggleLocationsOn = () => {
        setShowLocations(true);
    };
    const toggleLocationsOff = () => {
        setShowLocations(false);
    };
    return (
        <div className={styles.overlayContainer} onClick={props.closeCard}>
            <div
                ref={ref}
                id="from"
                className={styles.cityCardContainer}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleLocationsOff();
                }}
            >
                <div className={styles.cityCardHeader}>
                    <div className={styles.cityCardTitle}>
                        <span> {direction} </span>
                    </div>
                    <div className={styles.cityCardCloseButton}>
                        <button onClick={props.closeCard}> X </button>
                    </div>
                </div>
                <SelectDestination
                    show={showLocations}
                    showLocationsCallback={toggleLocationsOn}
                    hideLocationsCallback={toggleLocationsOff}
                    closeCallback={props.closeCard}
                    direction={direction}
                    to={props.to}
                    setTo={props.setTo}
                    from={props.from}
                    setFrom={props.setFrom}
                />
                <div className={styles.cityCardContentDone}>
                    <button onClick={props.closeCard}> Done </button>
                </div>
            </div>
        </div>
    );
});

export default DestinationFromCard;
