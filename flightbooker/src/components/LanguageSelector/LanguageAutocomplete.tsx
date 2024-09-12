import { useEffect, useState } from 'react';
import GoogleMapsLoader from '../../services/GoogleMapsLoader';
import useLanguageLocation from '../../hooks/useLanguageLocation';
import styles from './LanguageLocation.module.css';

interface LanguageAutocompleteProps {
    show: boolean;
    showLanguagesCallback: () => void;
    hideLanguagesCallback: () => void;
}

const LanguageAutocomplete = (props: LanguageAutocompleteProps) => {
    const [languages, setLanguages] = useState<string[]>([]);
    const { location, language, setLanguage } = useLanguageLocation();

    const getLanguageByCountry = (country: string): string[] => {
        const defaultLanguages = ['English'];

        switch (country) {
            case 'Norway':
                return defaultLanguages.concat('Norwegian');
            case 'France':
                return defaultLanguages.concat('French');
            case 'Sweden':
                return defaultLanguages.concat('Swedish');
            default:
                return defaultLanguages;
        }
    };

    const onLanguageSelect = (lang: string) => {
        setLanguage(lang);
        props.hideLanguagesCallback();
    };

    useEffect(() => {
        setLanguages(getLanguageByCountry(location?.description ?? ''));
    }, [props.show, location]);

    return (
        <>
            <GoogleMapsLoader />
            <span>Language</span>
            <div>
                <button
                    className={location ? styles.languageButtonHover : ''}
                    disabled={location ? false : true}
                    onClick={(e) => {
                        props.showLanguagesCallback();
                        e.stopPropagation();
                    }}
                >
                    {language ?? 'Select or start typing'}
                </button>
            </div>

            {props.show && (
                <form>
                    <select size={3} defaultValue={language} onClick={(e) => e.stopPropagation()}>
                        {languages &&
                            languages.map((lang) => (
                                <option key={lang} onClick={() => onLanguageSelect(lang)}>
                                    {lang}
                                </option>
                            ))}
                    </select>
                </form>
            )}
        </>
    );
};

export default LanguageAutocomplete;
