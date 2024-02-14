import React from 'react';
import {useTranslation} from 'react-i18next';
import BulgarianFlag from './BulgarianFlag';
import AmericanFlag from './AmericanFlag';

interface LanguageSwitcherProps {
    className?: string;
    style?: React.CSSProperties;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> =
    ({className, style}) => {
        const {i18n} = useTranslation();

        if (!i18n.isInitialized) {
            return null;
        }

        const changeLanguage = () => {
            if (i18n.language.startsWith('bg')) {
                i18n.changeLanguage('en');
            } else {
                i18n.changeLanguage('bg');
            }

        };

        return (
            <div className={className} style={style} onClick={changeLanguage}>
                {i18n.language.startsWith('bg') ? <BulgarianFlag/> : <AmericanFlag/>}
            </div>
        );
    };