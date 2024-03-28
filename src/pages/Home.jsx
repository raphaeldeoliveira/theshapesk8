import React from "react";
import NavOptions from "../components/home/NavOptions";
import mainBanner from "../assets/images/home/main_banner.jpg"
import BradingCarrousel from "../components/home/BrandingCarrousel";
import SearchPageGrid from "../components/global/SearchPageGrid";

import "../styles/pages/home/homePage.scss";
import "../styles/main.scss";

export default function Home() {

    return (
        <div className="homePage">
            <NavOptions />
            <img prop="" src={mainBanner} />
            {/* a imagem a cima tem que direcionar para a rota de busca e passar o parametro "ofertas" na barra de busca pra fazer uma consulta SQL e retornar os items em promoção */}
            <BradingCarrousel />
            <SearchPageGrid h1title="Principais ofertas" />
        </div>
    )
}