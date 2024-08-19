import styles from '../../styles/Home.module.css';
import { forwardRef } from 'react';
import SelectPassengers from './SelectPassengers';
import SelectedClasses from './SelectClasses';
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
        <div className={styles.overlay} onClick={props.closeCard}>
            <div ref={ref} id="passenger" className={styles.passengerCard} onClick={(e) => e.stopPropagation()}>
                <SelectPassengers />
                <div style={{ marginTop: '15px' }}>
                    <SelectedClasses onChangeCallback={onChangeClass} />
                </div>
            </div>
        </div>
    );
});

export default PassengerCard;
