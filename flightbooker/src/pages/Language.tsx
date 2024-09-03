import React, { useEffect } from 'react';
import LanguageLocation from '../components/LanguageSelector/LanguageLocation';
import useLanguageLocation from '../hooks/useLanguageLocation';

interface LanguageProps {
    onSelection: (language: string, location: string) => void;
}
const Language: React.FC<LanguageProps> = ({ onSelection }) => {
    const { location, language } = useLanguageLocation();

    useEffect(() => {
        if (location && language) {
            onSelection(language, location.description);
        }
    }, [location, language, onSelection]);

    return <LanguageLocation />;
};

export default Language;
