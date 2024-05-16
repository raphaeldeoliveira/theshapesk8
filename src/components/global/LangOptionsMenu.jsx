import React from "react";
import "../../styles/pages/global/langoptionsmenu.scss";
import ESFlag from "../../assets/images/countryFlags/spain-flag-waving-icon-64.png";
import BRFlag from "../../assets/images/countryFlags/brazil-flag-waving-icon-64.png";
import ENFlag from "../../assets/images/countryFlags/united-kingdom-flag-waving-icon-64.png";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/language/actions";

export default function LangOptionsMenu(props) {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    };

    return (
        <div className="langOptionsMenu">
            <ul>
                <li 
                    className="flag__container--EN"
                    style={{
                        backgroundColor: i18n.language === "en" ? "#ff9800" : "",
                        borderRadius: i18n.language === "en" ? "10px 10px 0px 0px" : ""
                    }}     
                ><img src={ENFlag} alt="" 
                    onClick={() => {
                        changeLanguage('en');
                        props.setShowLangOptionsMenu();
                    }} 
                /></li>
                <li 
                    className="flag__container--BR"
                    style={{
                        backgroundColor: i18n.language === "pt" ? "#ff9800" : ""
                    }} 
                ><img src={BRFlag} alt=""
                    onClick={() => {
                        changeLanguage('pt');
                        props.setShowLangOptionsMenu();
                    }}
                /></li>
                <li 
                    className="flag__container--ES"
                    style={{
                        backgroundColor: i18n.language === "es" ? "#ff9800" : "",
                        borderRadius: i18n.language === "es" ? "0px 0px 10px 10px" : ""
                    }}                    
                ><img src={ESFlag} alt=""
                    onClick={() => {
                        changeLanguage('es');
                        props.setShowLangOptionsMenu();
                    }}
                /></li>
            </ul>
        </div>
    )
}