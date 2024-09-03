import { useContext } from 'react';
import { LanguageLocationContext } from '../providers/LanguageLocationContextProvider';

// Generic hook to use either context
const useLanguageLocation = () => {
    const ctx = useContext(LanguageLocationContext);
    if (ctx === undefined) {
        throw new Error('useContextHandler must be used within a DataProvider');
    }
    return ctx;
};

export default useLanguageLocation;
