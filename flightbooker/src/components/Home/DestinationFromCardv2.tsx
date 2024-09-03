import SelectDestination from './SelectedDestinationv2';
import styles from '../../styles/Homev2.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';

interface DestinationFromCardProps {
    closeCard: () => void;
    to: string | undefined;
    from: string | undefined;
    setTo: Dispatch<SetStateAction<string | undefined>>;
    setFrom: Dispatch<SetStateAction<string | undefined>>;
}

const DestinationFromCard = forwardRef<HTMLDivElement, DestinationFromCardProps>((props, ref) => {
    const direction = 'Departure locations';
    return (
        <div className={styles.overlay} onClick={props.closeCard}>
            <div ref={ref} id="from" className={styles.cityCard} onClick={(e) => e.stopPropagation()}>
                <div className={styles.passengerHeadingContainer}>
                    <span className={styles.cardHeading}> {direction} </span>
                    <button className={styles.passengerHeadingCloseButton} onClick={props.closeCard}>
                        {' '}
                        X{' '}
                    </button>
                </div>
                <SelectDestination
                    closeCallback={props.closeCard}
                    direction={direction}
                    to={props.to}
                    setTo={props.setTo}
                    from={props.from}
                    setFrom={props.setFrom}
                />
                <div className={styles.passengerDoneButton} style={{ marginTop: '250px' }}>
                    <button onClick={props.closeCard}> Done </button>
                </div>
            </div>
        </div>
    );
});

export default DestinationFromCard;
