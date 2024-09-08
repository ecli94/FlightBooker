import styles from '../../styles/Homev2.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';
import SelectedTypes from './SelectedTypesv2';
import useHomeBookingCardContextHandler from '../../hooks/useHomeBookingCard';

interface TypeCardProps {
    closeCard: () => void;
    setIsTypeCardVisible: Dispatch<SetStateAction<boolean>>;
}
const TypeCard = forwardRef<HTMLDivElement, TypeCardProps>((props, ref) => {
    const { typesDispatch } = useHomeBookingCardContextHandler();
    const onChangeType = (type: string, id: number) => {
        typesDispatch({ type: type, id: id });
        props.setIsTypeCardVisible(false);
    };
    return (
        <div className={styles.overlayContainer} onClick={props.closeCard}>
            <div ref={ref} id="tripType" className={styles.typeCardContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.typeCardHeader}>
                    <div className={styles.typeCardTitle}>
                        <span> Trip type</span>
                    </div>
                    <div className={styles.typeCardCloseButton}>
                        <button onClick={props.closeCard}> X </button>
                    </div>
                </div>
                <SelectedTypes onChangeCallback={onChangeType} />
                <div className={styles.typeCardContentDone}>
                    <button onClick={props.closeCard}> Done </button>
                </div>
            </div>
        </div>
    );
});

export default TypeCard;
