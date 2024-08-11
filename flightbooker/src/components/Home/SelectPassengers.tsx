import useContextHandler from "../../hooks/useHomeBookingCard";
import styles from "../../styles/Home.module.css";


const SelectPassengers: React.FC = () => {
    const {travelers, passengerDispatch} = useContextHandler();
    return (
            <>
            <div className={styles.passengerSelectVerticalMenu}>
            <label className={styles.cardHeading}> Passengers and class</label>
            
            {travelers.map((t, index) => (
                        <div key={index} className={styles.passengerRow}>
                        <div className={styles.passengerColumn}>
                        <div><span>{t.type}</span></div>
                        <div><span>{t.description}</span></div>
                        </div>

                        <button className={styles.addPassengerColumn} onClick={() => passengerDispatch({ type: "ADD-PASSENGER", id: t.id })}>
                        <span>+</span>
                        </button>
                        </div>

                        ))} 
            </div>
            </>
           );
}

export default SelectPassengers;
