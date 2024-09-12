import { useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';
import styles from './LanguageLocation.module.css';
import LanguageAutocomplete from './LanguageAutocomplete';
import logo from '../../assets/logoDarkMode.jpg';
import languagePic from '../../assets/languagePic.jpg';
import useLanguageLocation from '../../hooks/useLanguageLocation';

interface LanguageLocationProps {
    onSelection: (language: string, location: string) => void;
}
const LanguageLocation = (props: LanguageLocationProps) => {
    const [showLocations, setShowLocations] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);

    const { language, location } = useLanguageLocation();

    const toggleLocationsOn = () => {
        setShowLocations(true);
    };

    const toggleLocationsOff = () => {
        setShowLocations(false);
    };

    const toggleLanguagesOn = () => {
        setShowLanguages(true);
    };

    const toggleLanguagesOff = () => {
        setShowLanguages(false);
    };

    return (
        <div
            onClick={() => {
                toggleLocationsOff();
                toggleLanguagesOff();
            }}
            className={styles.mainContainer}
        >
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <img src={logo}></img>
                </div>
            </div>
            <div className={styles.autocompleteContainer}>
                <div className={styles.location}>
                    <LocationAutocomplete
                        show={showLocations}
                        showLocationsCallback={toggleLocationsOn}
                        hideLocationsCallback={toggleLocationsOff}
                    />
                </div>
                <div className={styles.language}>
                    <LanguageAutocomplete
                        show={showLanguages}
                        showLanguagesCallback={toggleLanguagesOn}
                        hideLanguagesCallback={toggleLanguagesOff}
                    />
                </div>
                <div className={styles.apply}>
                    <button
                        disabled={!language || !location?.description}
                        className={language && location?.description ? styles.applyHover : ''}
                        onClick={() => props.onSelection(language ?? '', location?.description ?? '')}
                    >
                        Apply
                    </button>
                </div>
            </div>
            <div className={styles.languagePicContainer}>
                <div className={styles.languagePic}>
                    <img src={languagePic}></img>
                </div>
            </div>
        </div>
    );
};

export default LanguageLocation;
