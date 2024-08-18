import SelectDestination from './SelectedDestination';
import styles from '../../styles/Home.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';

interface DestinationToCard {
  closeCard: () => void;
  to: number | undefined;
  from: number | undefined;
  setTo: Dispatch<SetStateAction<number | undefined>>;
  setFrom: Dispatch<SetStateAction<number | undefined>>;
}

const DestinationToCard = forwardRef<HTMLDivElement, DestinationToCard>((props, ref) => {
  return (
    <div className={styles.overlay} onClick={props.closeCard}>
      <div ref={ref} id="to" className={styles.card} onClick={(e) => e.stopPropagation()}>
        <SelectDestination
          direction="Destinations"
          closeCallback={props.closeCard}
          to={props.to}
          setTo={props.setTo}
          from={props.from}
          setFrom={props.setFrom}
        />
      </div>
    </div>
  );
});

export default DestinationToCard;
