import styles from "../../styles/Home.module.css";
import { forwardRef } from "react";
import SelectPassengers from "./SelectPassengers";

interface PassengerCardProps {
  closeCard: () => void;
}

const PassengerCard = forwardRef<HTMLDivElement, PassengerCardProps>(
  (props, ref) => {
    return (
      <div className={styles.overlay} onClick={props.closeCard}>
        <div
          ref={ref}
          id="passenger"
          className={styles.passengerCard}
          onClick={(e) => e.stopPropagation()}
        >
          <SelectPassengers />
        </div>
      </div>
    );
  },
);

export default PassengerCard;
