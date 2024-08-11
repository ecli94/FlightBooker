import useContextHandler from "../../hooks/useHomeBookingCard";
import styles from "../../styles/Home.module.css";

const SelectedTypes = () => {
  const { types, typesDispatch, setIsTypeCardVisible } = useContextHandler();
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
                onChange={() => {
                  typesDispatch({ type: "COMPLETE", id: t.id });
                  setIsTypeCardVisible(false);
                }}
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
