import useContextHandler from '../../hooks/useHomeBookingCard';
import styles from '../../styles/Homev2.module.css';

interface SelectedTypesProps {
    onChangeCallback: (type: string, id: number) => void;
}
const SelectedTypes = (props: SelectedTypesProps) => {
    const { types } = useContextHandler();
    return (
        <form>
            {types.map((t) => (
                <div
                    onClick={() => props.onChangeCallback('COMPLETE', t.id)}
                    key={t.id}
                    className={styles.checkboxContainer}
                >
                    <span className={styles.checkboxLabel}>{t.name}</span>
                    <span className={styles.checkboxBox}>
                        <input
                            type="checkbox"
                            checked={t.complete}
                            onChange={() => props.onChangeCallback('COMPLETE', t.id)}
                        />
                    </span>
                </div>
            ))}
        </form>
    );
};

export default SelectedTypes;
