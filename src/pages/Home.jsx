import React from "react";
import NavOptions from "../components/home/NavOptions";
import BradingCarrousel from "../components/home/BrandingCarrousel";
import SearchPageGrid from "../components/global/SearchPageGrid";
import BannerCarrousel from "../components/home/BannerCarrousel";
import { useTranslation } from 'react-i18next';

import "../styles/pages/home/homePage.scss";
import "../styles/main.scss";

export default function Home() {

    const { t } = useTranslation();

    return (
        <div className="homePage">
            <NavOptions />
            <BannerCarrousel />
            <BradingCarrousel />
            <SearchPageGrid h1title={t('pageGridTitle')} />
        </div>
    )
}