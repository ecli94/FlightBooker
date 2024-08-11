import { useContext } from "react";


// Generic hook to use either context
const useContextHandler = <T>(context: React.Context<T | undefined>): T => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error('useHomeBookingHandler must be used within a DataProvider');
    }
    return ctx;
}

export default useContextHandler;
