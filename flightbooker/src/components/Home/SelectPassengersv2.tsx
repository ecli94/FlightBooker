import useContextHandler from '../../hooks/useHomeBookingCard';
import { Passenger } from '../../providers/HomeBookingCardContextProvider';
import styles from '../../styles/Homev2.module.css';

const SelectPassengers: React.FC = () => {
    const { travelers, passengerDispatch } = useContextHandler();
    const disableRemove = (traveler: Passenger): boolean => {
        if (traveler.id == 1) {
            return traveler.count == 1 ? true : false;
        }
        return traveler.count == 0 ? true : false;
    };
    return (
        <>
            <div className={styles.passengerCardContentContainer}>
                {travelers.map((t, index) => (
                    <div key={index} className={styles.passengerCardContent}>
                        <div className={styles.passengerCardContentLabel}>
                            <span>{t.type}</span>
                        </div>
                        <div className={styles.passengerCardContentLabelDescription}>
                            <span>{t.description}</span>
                        </div>

                        <div className={styles.passengerCardContentButtonsContainer}>
                            <div className={styles.passengerCardContentRemoveButton}>
                                <button
                                    className={
                                        disableRemove(t)
                                            ? styles.removePassengerButton
                                            : styles.removePassengerButtonActive
                                    }
                                    disabled={disableRemove(t)}
                                    onClick={() => passengerDispatch({ type: 'REMOVE-PASSENGER', id: t.id })}
                                >
                                    <span>-</span>
                                </button>
                            </div>

                            <div className={styles.passengerCardContentCountLabel}>
                                <span>{t.count}</span>
                            </div>
                            <div className={styles.passengerCardContentAddButton}>
                                <button
                                    className={styles.addPassengerButton}
                                    onClick={() => passengerDispatch({ type: 'ADD-PASSENGER', id: t.id })}
                                >
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SelectPassengers;
