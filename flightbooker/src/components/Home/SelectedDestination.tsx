import useContextHandler from "../../hooks/useHomeBookingCard";
import styles from "../../styles/Home.module.css";

interface SelectDestinationProps {
  direction: "Departure locations" | "Destinations";
}

const SelectDestination: React.FC<SelectDestinationProps> = ({ direction }) => {
  const {
    locationsToDispatch,
    locationsFromDispatch,
    setIsToCardVisible,
    setIsFromCardVisible,
    locationTo,
    locationFrom,
  } = useContextHandler();

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = parseInt(event.target.value, 10);
    switch (direction) {
      case "Destinations":
        locationsToDispatch({ type: "COMPLETE", id: id });
        setIsToCardVisible(false);
        break;
      case "Departure locations":
        locationsFromDispatch({ type: "COMPLETE", id: id });
        setIsFromCardVisible(false);
        break;
      default:
        throw new TypeError("Incorrect direction was provided");
    }
  };
  return (
    <>
      <div className={styles.citySelectVerticalMenu}>
        <label className={styles.cardHeading}> {direction}</label>
        <select
          id="toLocations"
          name="toLocations"
          size={8}
          value={
            direction == "Destinations"
              ? locationTo.find((loc) => loc.complete)?.id || ""
              : locationFrom.find((loc) => loc.complete)?.id || ""
          }
          onChange={handleLocationChange}
        >
          {direction == "Destinations" &&
            locationTo.map((t) => (
              <option key={t.id} value={t.id}>
                {t.city}, {t.country}
              </option>
            ))}
          {direction == "Departure locations" &&
            locationFrom.map((t) => (
              <option
                className={styles.citySelectOptions}
                key={t.id}
                value={t.id}
              >
                {t.city}, {t.country}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default SelectDestination;
