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
                    text={t('welcome')}
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="2"
                    text="TÊNIS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="3"
                    text="SKATE"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="4"
                    text="ROUPAS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    id="5"
                    text="ACESSÓRIOS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
            </ul>
        </nav>
    )
}
