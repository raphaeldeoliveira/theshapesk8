import React from "react";
import "../../styles/pages/global/footer.scss";
import logo from "../../assets/images/logo-purple.png";
import { useTranslation } from 'react-i18next';

export default function Footer() {

    const { t } = useTranslation();

    return (
        <footer>
            <img alt="" src={logo}/>
            <h2>{t('poweredBy')} <a href="https://github.com/raphaeldeoliveira" target="_blank" rel="noreferrer">Raphael de Oliveira</a> {t('conector')} <a href="https://github.com/MAONEZZE" target="_blank" rel="noreferrer">Ruan Sanchez</a></h2>
        </footer>
    )
}