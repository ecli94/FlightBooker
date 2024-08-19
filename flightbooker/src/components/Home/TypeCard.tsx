import styles from '../../styles/Home.module.css';
import { Dispatch, forwardRef, SetStateAction } from 'react';
import SelectedTypes from './SelectedTypes';
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
        <div className={styles.overlay} onClick={props.closeCard}>
            <div ref={ref} id="tripType" className={styles.card} onClick={(e) => e.stopPropagation()}>
                <SelectedTypes onChangeCallback={onChangeType} />
            </div>
        </div>
    );
});

export default TypeCard;
