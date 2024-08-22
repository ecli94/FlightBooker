import useContextHandler from '../../hooks/useHomeBookingCard';
import { Passenger } from '../../providers/HomeBookingCardContextProvider';
import styles from '../../styles/Home.module.css';

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
            <div className={styles.passengerSelectVerticalMenu}>
                {travelers.map((t, index) => (
                    <div key={index} className={styles.passengerRow}>
                        <div className={styles.passengerColumn}>
                            <div>
                                <span>{t.type}</span>
                            </div>
                            <div>
                                <span>{t.description}</span>
                            </div>
                        </div>

                        <div className={styles.removePassengerColumn}>
                            <button
                                className={styles.removePassengerButton}
                                disabled={disableRemove(t)}
                                onClick={() => passengerDispatch({ type: 'REMOVE-PASSENGER', id: t.id })}
                            >
                                <span>-</span>
                            </button>
                        </div>
                        <div className={styles.passengerCountColumn}>
                            <label className={styles.countPassengerLabel}>{t.count}</label>
                        </div>
                        <div className={styles.addPassengerColumn}>
                            <button
                                className={styles.addPassengerButton}
                                onClick={() => passengerDispatch({ type: 'ADD-PASSENGER', id: t.id })}
                            >
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SelectPassengers;
