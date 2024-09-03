import { MouseEventHandler } from 'react';
import styles from '../../styles/Homev2.module.css';

interface BookingButtonProps {
    type: string;
    value: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const BookingButton: React.FC<BookingButtonProps> = ({ type, value, onClick }) => {
    return (
        <div>
            <button className={styles.bookButton} onClick={onClick}>
                <div>
                    <span style={{ fontWeight: 'lighter' }}> {type} </span>
                </div>
                <div>
                    <span style={{ fontWeight: 'bolder' }}> {value} </span>
                </div>
            </button>
        </div>
    );
};

export default BookingButton;
