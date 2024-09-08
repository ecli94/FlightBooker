import useContextHandler from '../../hooks/useHomeBookingCard';
import styles from '../../styles/Homev2.module.css';

interface SelectedTypesProps {
    onChangeCallback: (type: string, id: number) => void;
}
const SelectedTypes = (props: SelectedTypesProps) => {
    const { types } = useContextHandler();
    return (
        <div className={styles.typeCardContentContainer}>
            {types.map((t) => (
                <div
                    onClick={() => props.onChangeCallback('COMPLETE', t.id)}
                    key={t.id}
                    className={styles.typeCardContent}
                >
                    <div className={styles.typeCardContentLabel}>
                        <span>{t.name}</span>
                    </div>
                    <div className={styles.typeCardContentBox}>
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

export default SelectedTypes;
