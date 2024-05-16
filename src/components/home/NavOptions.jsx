import React from "react";
import "../../styles/pages/home/navOptions.scss"
import OptionSpanAndCard from "./OptionSpanAndCard";
import { useTranslation } from 'react-i18next';

export default function NavOptions() {

    const { t } = useTranslation();

    return (
        <nav className="nav-options">
            <ul>
                <OptionSpanAndCard 
                    id="1"
                    text={t('marcas')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="2"
                    text={t('tenis')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="3"
                    text={t('skate')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="4"
                    text={t('roupas')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="5"
                    text={t('acessorios')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
            </ul>
        </nav>
    )
}
