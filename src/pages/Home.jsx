import React from "react";
import NavOptions from "../components/home/NavOptions";
import mainBanner from "../assets/images/home/main_banner.jpg"
import BradingCarrousel from "../components/home/BrandingCarrousel";
import SearchPageGrid from "../components/global/SearchPageGrid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "../styles/pages/home/homePage.scss";
import "../styles/main.scss";

export default function Home() {

    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <div className="homePage">
            <NavOptions />
            <img onClick={() => navigate("/search/Spitfire")} alt="" src={mainBanner} />
            <BradingCarrousel />
            <SearchPageGrid h1title={t('pageGridTitle')} />
        </div>
    )
}