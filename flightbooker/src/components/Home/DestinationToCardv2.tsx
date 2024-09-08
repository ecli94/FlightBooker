import SelectDestination from './SelectedDestinationv2';
import styles from '../../styles/Homev2.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';

interface DestinationToCard {
    closeCard: () => void;
    to: string | undefined;
    from: string | undefined;
    setTo: Dispatch<SetStateAction<string | undefined>>;
    setFrom: Dispatch<SetStateAction<string | undefined>>;
}

const DestinationToCard = forwardRef<HTMLDivElement, DestinationToCard>((props, ref) => {
    const direction = 'Destinations';
    return (
        <div className={styles.overlayContainer} onClick={props.closeCard}>
            <div ref={ref} id="to" className={styles.cityCardContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cityCardHeader}>
                    <div className={styles.cityCardTitle}>
                        <span> {direction} </span>
                    </div>
                    <div className={styles.cityCardCloseButton}>
                        <button onClick={props.closeCard}> X </button>
                    </div>
                </div>
                <SelectDestination
                    direction={direction}
                    closeCallback={props.closeCard}
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

export default DestinationToCard;
