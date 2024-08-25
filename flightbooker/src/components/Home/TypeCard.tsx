import styles from '../../styles/Home.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';
import SelectedTypes from './SelectedTypes';
import useHomeBookingCardContextHandler from '../../hooks/useHomeBookingCard';

interface TypeCardProps {
    closeCard: () => void;
    setIsTypeCardVisible: Dispatch<SetStateAction<boolean>>;
}
const TypeCard = forwardRef<HTMLDivElement, TypeCardProps>((props, ref) => {
    const { typesDispatch } = useHomeBookingCardContextHandler();
    const onChangeType = (type: string, id: number) => {
        typesDispatch({ type: type, id: id });
        props.setIsTypeCardVisible(false);
    };
    return (
        <div className={styles.overlay} onClick={props.closeCard}>
            <div
                ref={ref}
                id="tripType"
                className={styles.passengerCard}
                style={{ height: '30%' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.passengerHeadingContainer}>
                    <span className={styles.cardHeading}> Trip type</span>
                    <button className={styles.passengerHeadingCloseButton} onClick={props.closeCard}>
                        {' '}
                        X{' '}
                    </button>
                </div>
                <SelectedTypes onChangeCallback={onChangeType} />
                <div className={styles.passengerDoneButton} style={{ marginTop: '40px' }}>
                    <button onClick={props.closeCard}> Done </button>
                </div>
            </div>
        </div>
    );
});

export default TypeCard;
