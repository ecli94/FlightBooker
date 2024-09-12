import React from 'react';
import LanguageLocation from '../components/LanguageSelector/LanguageLocation';

interface LanguageProps {
    onSelection: (language: string, location: string) => void;
}
const Language: React.FC<LanguageProps> = ({ onSelection }) => {
    return <LanguageLocation onSelection={onSelection} />;
};

export default Language;
