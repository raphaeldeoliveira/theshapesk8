import React from "react";
import "../../styles/pages/home/brandingCarrousel.scss"

// import das imagens
import alien from "../../assets/images/home/brandings/Alien-Workshop-HP-Logo-Fade.jpg"
import dogtown from "../../assets/images/home/brandings/Dogtown-Skateboards-Brand-Icon-90-2.jpg"
import vans from "../../assets/images/home/brandings/HomepageBrandLogos_02.jpg"
import bonies from "../../assets/images/home/brandings/HomepageBrandLogos_05.jpg"
import dickies from "../../assets/images/home/brandings/HomepageBrandLogos_06.jpg"
import spitfire from "../../assets/images/home/brandings/HomepageBrandLogos_09.jpg"
import creature from "../../assets/images/home/brandings/HomepageBrandLogos_15.jpg"
import santacruz from "../../assets/images/home/brandings/HomepageBrandLogos_19.jpg"
import blacklabel from "../../assets/images/home/brandings/HomepageBrandLogos_20.jpg"
import allbrands from "../../assets/images/home/brandings/AllBrands1.jpg"
// imagens com hover
import alien_hover from "../../assets/images/home/brandings_hover/Alien-Workshop-HP-Logo-Hover.jpg"
import dogtown_hover from "../../assets/images/home/brandings_hover/Dogtown-Skateboards-Brand-Icon.jpg"
import vans_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_02.jpg"
import bonies_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_05.jpg"
import dickies_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_06.jpg"
import spitfire_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_09.jpg"
import creature_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_15.jpg"
import santacruz_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_19.jpg"
import blacklabel_hover from "../../assets/images/home/brandings_hover/HomepageBrandLogos2_20.jpg"
import allbrands_hover from "../../assets/images/home/brandings_hover/AllBrands2.jpg"

export default function BradingCarrousel() {
    
    // aqui vao ser colcadas as imagens ja importadas
    const branding = [alien, dogtown, vans, bonies, dickies, spitfire, creature, santacruz, blacklabel, allbrands]
    const brandingHover = [alien_hover, dogtown_hover, vans_hover, bonies_hover, dickies_hover, spitfire_hover, creature_hover, santacruz_hover, blacklabel_hover, allbrands_hover]

    return (
        <div className="brandingCarrousel">
            <h3>left button</h3>
            {branding.map((brand, index) => {
                return (
                    <div className="brand_container">
                        <img className="branding_default" src={brand} />
                        <img className="branding_hover" src={brandingHover[index]} />
                    </div>
                )
            })}
            <h3>right button</h3>
        </div>
    )
}