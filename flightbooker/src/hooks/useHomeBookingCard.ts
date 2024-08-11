import { useContext } from "react";
import { HomeBookingCardContext} from "../providers/HomeBookingCardContextProvider";


// Generic hook to use either context
const useHomeBookingCardContextHandler = () => {
    const ctx = useContext(HomeBookingCardContext);
    if (ctx === undefined) {
        throw new Error('useContextHandler must be used within a DataProvider');
    }
    return ctx;
}

export default useHomeBookingCardContextHandler;
