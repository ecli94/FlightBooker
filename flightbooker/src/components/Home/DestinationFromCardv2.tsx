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
        <div className={styles.overlayContainer} onClick={props.closeCard}>
            <div ref={ref} id="from" className={styles.cityCardContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cityCardHeader}>
                    <div className={styles.cityCardTitle}>
                        <span> {direction} </span>
                    </div>
                    <div className={styles.cityCardCloseButton}>
                        <button onClick={props.closeCard}> X </button>
                    </div>
                </div>
                <SelectDestination
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
