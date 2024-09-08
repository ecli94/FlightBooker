import { MouseEventHandler } from 'react';

interface BookingButtonProps {
    type: string;
    value: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const BookingButton: React.FC<BookingButtonProps> = ({ value, onClick }) => {
    return (
        <button onClick={onClick}>
            <span style={{ fontWeight: 'bolder', color: 'black' }}> {value} </span>
        </button>
    );
};

export default BookingButton;
