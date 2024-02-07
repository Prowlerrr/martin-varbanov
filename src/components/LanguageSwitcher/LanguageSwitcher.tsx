import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import BulgarianFlag from './BulgarianFlag';
import AmericanFlag from './AmericanFlag';

interface LanguageSwitcherProps {
    style?: React.CSSProperties;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
    const { i18n } = useTranslation();
    const [showOptions, setShowOptions] = useState(false);

    if (!i18n.isInitialized) {
        return null;
    }

    return (
        <div className="language-switcher" style={style} onClick={() => setShowOptions(!showOptions)}>
            {i18n.language.startsWith('bg') ? <BulgarianFlag /> : <AmericanFlag />}

            {showOptions && (
                <div className="language-options" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div onClick={() => i18n.changeLanguage('bg')}>
                        <BulgarianFlag />
                    </div>
                    <div onClick={() => i18n.changeLanguage('en')}>
                        <AmericanFlag />
                    </div>
                </div>
            )}
        </div>
    );
};