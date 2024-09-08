import styles from '../../styles/Homev2.module.css';
import { forwardRef } from 'react';
import SelectPassengers from './SelectPassengersv2';
import SelectedClasses from './SelectClassesv2';
import useHomeBookingCardContextHandler from '../../hooks/useHomeBookingCard';

interface PassengerCardProps {
    closeCard: () => void;
}

const PassengerCard = forwardRef<HTMLDivElement, PassengerCardProps>((props, ref) => {
    const { classDispatch } = useHomeBookingCardContextHandler();
    const onChangeClass = (ticketClass: string, id: number) => {
        classDispatch({ type: ticketClass, id: id });
    };
    return (
        <div className={styles.overlayContainer} onClick={props.closeCard}>
            <div
                ref={ref}
                id="passenger"
                className={styles.passengerCardContainer}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.passengerCardHeader}>
                    <div className={styles.passengerCardTitle}>
                        <span className={styles.cardHeading}> Passengers and class</span>
                    </div>
                    <div className={styles.passengerCardCloseButton}>
                        <button className={styles.passengerHeadingCloseButton} onClick={props.closeCard}>
                            {' '}
                            X{' '}
                        </button>
                    </div>
                </div>
                <SelectPassengers />
                <SelectedClasses onChangeCallback={onChangeClass} />
                <div className={styles.passengerCardContentDone}>
                    <button onClick={props.closeCard}> Done </button>
                </div>
            </div>
        </div>
    );
});

export default PassengerCard;
