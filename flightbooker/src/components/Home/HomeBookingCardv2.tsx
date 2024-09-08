import styles from '../../styles/Homev2.module.css';
import useContextHandler from '../../hooks/useHomeBookingCard';
import BookingButton from './BookingButtonv2';
import fromToArrow from '../../assets/fromToArrow.svg';

interface HomeBookingCardProps {
    showCard: (cardType: 'type' | 'from' | 'to' | 'passengers') => void;
    from?: string;
    to?: string;
    isOneWayPhaseTwo: () => boolean;
    isRoundTripPhaseTwo: () => boolean;
}

const HomeBookingCard: React.FC<HomeBookingCardProps> = (props) => {
    const { types, travelers, ticketClasses } = useContextHandler();

    return (
        <>
            <div className={styles.bookTypeContainer}>
                <div className={styles.bookTypeSpan}>
                    <span>Trip type</span>
                </div>
                <div className={styles.bookTypeButton}>
                    <BookingButton
                        type="Trip type"
                        value={types.find((x) => x.complete == true)!.name ?? ''}
                        onClick={() => props.showCard('type')}
                    />
                </div>
            </div>

            <div className={styles.bookFromToContainer}>
                <div className={styles.bookFromSpan}>
                    <span> From </span>
                </div>
                <div className={styles.bookFromButton}>
                    <BookingButton type="From" value={props.from ?? ''} onClick={() => props.showCard('from')} />
                </div>
                <div className={styles.bookToSpan}>
                    <span> To </span>
                </div>
                <div className={styles.bookToButton}>
                    <BookingButton type="To" value={props.to ?? ''} onClick={() => props.showCard('to')} />
                </div>
                <div className={styles.bookFromToArrow}>
                    <img src={fromToArrow}></img>
                </div>
            </div>
            {(props.isOneWayPhaseTwo() || props.isRoundTripPhaseTwo()) && (
                <div className={styles.bookPassengerContainer}>
                    <div className={styles.bookPassengerSpan}>
                        <span>Passengers and class</span>
                    </div>
                    <div className={styles.bookPassengerButton}>
                        <BookingButton
                            type="Passengers and class"
                            value={`${travelers.reduce((sum, type) => sum + type.count!, 0).toString()}, ${ticketClasses.find((tc) => tc.complete == true)?.name}`}
                            onClick={() => props.showCard('passengers')}
                        />
                    </div>
                </div>
            )}

            {props.isOneWayPhaseTwo() && (
                <div className={styles.bookDepartReturnContainer}>
                    <div className={styles.bookDepartOnlySpan}>
                        <span> Depart </span>
                    </div>
                    <div className={styles.bookDepartOnlyButton}>
                        <BookingButton type="DepartOnly" value={props.to ?? ''} onClick={() => props.showCard('to')} />
                    </div>
                </div>
            )}

            {props.isRoundTripPhaseTwo() && (
                <div className={styles.bookDepartReturnContainer}>
                    <div className={styles.bookDepartSpan}>
                        <span> Depart </span>
                    </div>
                    <div className={styles.bookDepartButton}>
                        <BookingButton type="Depart" value={props.to ?? ''} onClick={() => props.showCard('to')} />
                    </div>

                    <div className={styles.bookReturnSpan}>
                        <span> Return </span>
                    </div>
                    <div className={styles.bookReturnButton}>
                        <BookingButton type="Return" value={props.to ?? ''} onClick={() => props.showCard('to')} />
                    </div>
                </div>
            )}
        </>
    );
};

export default HomeBookingCard;
