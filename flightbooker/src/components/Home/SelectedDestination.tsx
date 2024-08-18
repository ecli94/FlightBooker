import { Dispatch, SetStateAction } from "react";
import useContextHandler from "../../hooks/useHomeBookingCard";
import styles from "../../styles/Home.module.css";

interface SelectDestinationProps {
  direction: "Departure locations" | "Destinations";
  closeCallback: () => void;
  to: number | undefined;
  setTo: Dispatch<SetStateAction<number | undefined>>;
  from: number | undefined;
  setFrom: Dispatch<SetStateAction<number | undefined>>;
}

const SelectDestination: React.FC<SelectDestinationProps> = (props) => {
  const {
    locationsToDispatch,
    locationsFromDispatch,
    locationTo,
    locationFrom,
  } = useContextHandler();

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = parseInt(event.target.value, 10);
    switch (props.direction) {
      case "Departure locations":
        locationsFromDispatch({ type: "COMPLETE", id: id });
        console.log(locationFrom);
        props.closeCallback();
        props.setFrom(locationFrom.find((loc) => loc.id == id)?.id);
        if (props.to == props.from) {
          console.log("from");
          locationsToDispatch({ type: "INCOMPLETE", id: id });
          props.setTo(undefined);
        }
        break;
      case "Destinations":
        locationsToDispatch({ type: "COMPLETE", id: id });
        props.closeCallback();
        props.setTo(locationTo.find((loc) => loc.id == id)?.id);
        // handle same location as from
        if (props.to == props.from) {
          console.log("to");
          locationsFromDispatch({ type: "INCOMPLETE", id: id });
          props.setFrom(undefined);
        }
        break;
      default:
        throw new TypeError("Incorrect direction was provided");
    }
  };
  console.log(locationFrom);

  return (
    <>
      <div className={styles.citySelectVerticalMenu}>
        <label className={styles.cardHeading}> {props.direction}</label>
        <select
          id="locations"
          name="locations"
          size={8}
          value={props.direction == "Destinations" ? props.to : props.from}
          onChange={handleLocationChange}
        >
          {props.direction == "Destinations" &&
            locationTo.map((t) => (
              <option
                className={styles.citySelectOptions}
                key={t.id}
                value={t.id}
              >
                {t.city}, {t.country}
              </option>
            ))}
          {props.direction == "Departure locations" &&
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
