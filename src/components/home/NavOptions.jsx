import React from "react";
import { useState } from "react";
import "../../styles/pages/home/navOptions.scss"
import OptionSpanAndCard from "./OptionSpanAndCard";
import { useTranslation } from 'react-i18next';

export default function NavOptions() {

    const [showMenu, setShowMenu] = useState(false)
    const { t } = useTranslation();

    return (
        <nav className="nav-options">
            <ul
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <OptionSpanAndCard 
                    showMenu={showMenu}
                    id="1"
                    text={t('marcas')}
                    cardContent={["Alien Workshop", "Dogtown", "Vans", "Bonies", "Dickies", "Spitfire", "Creature", "Santa Cruz", "Black Label", "Toy Machine", "OJ Wheels", "Golf Wang", ]}
                />
                <OptionSpanAndCard 
                    showMenu={showMenu}
                    id="2"
                    text={t('tenis')}
                    cardContent={[t('neakers'), t('shoe'), t('slipper'), t('boot'), t('highTop'), t('lowTop'), ]}
                />
                <OptionSpanAndCard 
                    showMenu={showMenu}
                    id="3"
                    text={t('skate')}
                    cardContent={[t('decks'), t('wheels'), t('hardware'), t('reissues'), t('safety'), ]}
                />
                <OptionSpanAndCard 
                    showMenu={showMenu}
                    id="4"
                    text={t('roupas')}
                    cardContent={[t('tShirt'), t('flannel'), t('hats'), t('beanie'), t('short'), t('jacket'), t('hoodie'), t('polo'), t('reglan'), ]}
                />
                <OptionSpanAndCard 
                    showMenu={showMenu}
                    id="5"
                    text={t('acessorios')}
                    cardContent={[t('patches'), t('stickers'), t('plankets'), t('sunglas'), t('randomItems'), t('buttonsPins'), t('stickerPacks'), ]}
                />
            </ul>
        </nav>
    )
}
