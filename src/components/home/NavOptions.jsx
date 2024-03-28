import React from "react";
import "../../styles/pages/home/navOptions.scss"
import OptionSpanAndCard from "./OptionSpanAndCard";

export default function NavOptions() {

    return (
        <nav className="nav-options">
            <ul>
                <OptionSpanAndCard 
                    id="1"
                    text="MARCAS"
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
