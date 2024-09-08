import useContextHandler from '../../hooks/useHomeBookingCard';
import styles from '../../styles/Homev2.module.css';

interface SelectedClassesProps {
    onChangeCallback: (type: string, id: number) => void;
}
const SelectedClasses = (props: SelectedClassesProps) => {
    const { ticketClasses } = useContextHandler();
    return (
        <div className={styles.classCardContentContainer}>
            {ticketClasses.map((t) => (
                <div
                    onClick={() => props.onChangeCallback('COMPLETE', t.id)}
                    key={t.id}
                    className={styles.classCardContent}
                    style={t.complete ? { backgroundColor: 'darkgray' } : {}}
                >
                    <div className={styles.classCardContentLabel}>
                        <span>{t.name}</span>
                    </div>
                    <div className={styles.classCardContentBox}>
                        <span>
                            <input
                                type="checkbox"
                                checked={t.complete}
                                onChange={() => props.onChangeCallback('COMPLETE', t.id)}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedClasses;
