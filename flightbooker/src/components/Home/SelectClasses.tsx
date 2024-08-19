import useContextHandler from '../../hooks/useHomeBookingCard';
import styles from '../../styles/Home.module.css';

interface SelectedClassesProps {
    onChangeCallback: (type: string, id: number) => void;
}
const SelectedClasses = (props: SelectedClassesProps) => {
    const { ticketClasses } = useContextHandler();
    return (
        <form>
            {ticketClasses.map((t) => (
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

export default SelectedClasses;
