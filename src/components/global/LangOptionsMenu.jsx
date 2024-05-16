import React from "react";
import "../../styles/pages/global/langoptionsmenu.scss";
import ESFlag from "../../assets/images/countryFlags/spain-flag-waving-icon-64.png";
import BRFlag from "../../assets/images/countryFlags/brazil-flag-waving-icon-64.png";
import ENFlag from "../../assets/images/countryFlags/united-kingdom-flag-waving-icon-64.png";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/language/actions";

export default function LangOptionsMenu(props) {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector(state => state.language);
    let langTwoLastLetters = language.substr(-2);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    };

    return (
        <div className="langOptionsMenu">
            <ul>
                <li className="flag__container--EN"><img src={ENFlag} 
                    onClick={() => {
                        changeLanguage('en');
                        props.setShowLangOptionsMenu();
                    }} 
                /></li>
                <li className="flag__container--BR"><img src={BRFlag} 
                    onClick={() => {
                        changeLanguage('pt');
                        props.setShowLangOptionsMenu();
                    }}
                /></li>
                <li 
                    className="flag__container--ES"
                    style={{
                        color: langTwoLastLetters === "es" ? "red" : "black", // Exemplo: mudando a cor do texto
                    }}
                ><img src={ESFlag} 
                    onClick={() => {
                        changeLanguage('es');
                        props.setShowLangOptionsMenu();
                    }}
                /></li>
            </ul>
        </div>
    )
}