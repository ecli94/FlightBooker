import SelectDestination from './SelectedDestination';
import styles from '../../styles/Home.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';

interface DestinationFromCardProps {
    closeCard: () => void;
    to: number | undefined;
    from: number | undefined;
    setTo: Dispatch<SetStateAction<number | undefined>>;
    setFrom: Dispatch<SetStateAction<number | undefined>>;
}

const DestinationFromCard = forwardRef<HTMLDivElement, DestinationFromCardProps>((props, ref) => {
    return (
        <div className={styles.overlay} onClick={props.closeCard}>
            <div ref={ref} id="from" className={styles.card} onClick={(e) => e.stopPropagation()}>
                <SelectDestination
                    closeCallback={props.closeCard}
                    direction="Departure locations"
                    to={props.to}
                    setTo={props.setTo}
                    from={props.from}
                    setFrom={props.setFrom}
                />
            </div>
        </div>
    );
});

export default DestinationFromCard;
