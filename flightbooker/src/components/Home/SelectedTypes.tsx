import useContextHandler from "../../hooks/useHomeBookingCard";
import styles from "../../styles/Home.module.css";

interface SelectedTypesProps {
  onChangeCallback: (type: string, id: number) => void;
}
const SelectedTypes = (props: SelectedTypesProps) => {
  const { types } = useContextHandler();
  return (
    <>
      <div>
        <form>
          <label className={styles.cardHeading}>Trip types</label>
          {types.map((t) => (
            <label key={t.id}>
              <input
                type="checkbox"
                checked={t.complete}
                onChange={() => props.onChangeCallback("COMPLETE", t.id)}
              />
              {t.name}
            </label>
          ))}
        </form>
      </div>
    </>
  );
};

export default SelectedTypes;
