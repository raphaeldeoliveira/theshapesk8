import React from "react";
import "../../styles/pages/home/brandingCarrousel.scss";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// import das imagens
import alien from "../../assets/images/home/brandings/Alien-Workshop-HP-Logo-Fade.png"
import dogtown from "../../assets/images/home/brandings/Dogtown-Skateboards-Brand-Icon-90-2.jpg"
import vans from "../../assets/images/home/brandings/HomepageBrandLogos_02.jpg"
import bonies from "../../assets/images/home/brandings/HomepageBrandLogos_05.jpg"
import dickies from "../../assets/images/home/brandings/HomepageBrandLogos_06.png"
import spitfire from "../../assets/images/home/brandings/HomepageBrandLogos_09.png"
import creature from "../../assets/images/home/brandings/HomepageBrandLogos_15.jpg"
import santacruz from "../../assets/images/home/brandings/HomepageBrandLogos_19.jpg"
import blacklabel from "../../assets/images/home/brandings/HomepageBrandLogos_20.jpg"
//import allbrands from "../../assets/images/home/brandings/AllBrands1.jpg"
import toymachine from "../../assets/images/home/brandings/toymachine.jpg"
// imagens com hover
import alien_hover from "../../assets/images/home/brandings_hover/Alien-Workshop-HP-Logo-Hover.png"
import dogtown_hover from "../../assets/images/home/brandings_hover/Dogtown-Skateboards-Brand-Icon.jpg"
import vans_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_02.jpg"
import bonies_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_05.jpg"
import dickies_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_06.jpg"
import spitfire_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_09.png"
import creature_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_15.png"
import santacruz_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_19.jpg"
import blacklabel_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_20.jpg"
//import allbrands_hover from "../../assets/images/home/brandings_hover/AllBrands2.jpg"
import toymachine_hover from "../../assets/images/home/brandings_hover/toymachine_hover.jpg"

export default function BradingCarrousel() {
    
    const navigate = useNavigate()

    // aqui vao ser colcadas as imagens ja importadas
    const brandingName = ["Alien", "Dogtown", "Vans", "Bonies", "Dickies", "Spitfire", "Creature", "Santacruz", "Blacklabel", "Allbrands"] 
    const branding = [alien, dogtown, vans, bonies, dickies, spitfire, creature, santacruz, blacklabel, toymachine]
    const brandingHover = [alien_hover, dogtown_hover, vans_hover, bonies_hover, dickies_hover, spitfire_hover, creature_hover, santacruz_hover, blacklabel_hover, toymachine_hover]

    return (
        <div className="brandingCarrousel">
            <FaHandPointLeft className="branding__arrow--left"/>
            {branding.map((brand, index) => {
                console.log(brand)
                return (
                    <div className="brand__container">
                        <img alt="" className="branding__hover" src={brandingHover[index]} />
                        <img onClick={() => navigate(`/search/${brandingName[index]}`)} alt="" className="branding__default" src={brand} />
                    </div>
                )
            })}
            <FaHandPointRight className="branding__arrow--right" />
        </div>
    )
}