import React, { useState } from "react";
import "../../styles/pages/home/navOptions.scss"
import OptionSpanAndCard from "./OptionSpanAndCard";

export default function NavOptions() {

    const [showWindows, setShowWindows] = useState({
        window1: false,
        window2: false,
        window3: false,
        window4: false,
        window5: false,
    });

    const [timers, setTimers] = useState({});

    function toogleWindow(windowName) {
        // Se o temporizador estiver ativo, não faz nada
        if (timers[windowName]) return;

        // Define o temporizador
        const timer = setTimeout(() => {
            setTimers(prevTimers => ({
                ...prevTimers,
                [windowName]: false
            }));
        }, 500);

        setTimers(prevTimers => ({
            ...prevTimers,
            [windowName]: timer
        }));

        // Atualiza o estado do showWindows
        setShowWindows(prev => ({
            ...prev,
            [windowName]: !prev[windowName]
        }));
    }

    return (
        <nav>
            <ul>
                <OptionSpanAndCard 
                    showWindows={showWindows}
                    toogleWindow={toogleWindow}
                    id="1"
                    text="MARCAS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    showWindows={showWindows}
                    toogleWindow={toogleWindow}
                    id="2"
                    text="TÊNIS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    showWindows={showWindows}
                    toogleWindow={toogleWindow}
                    id="3"
                    text="SKATE"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    showWindows={showWindows}
                    toogleWindow={toogleWindow}
                    id="4"
                    text="ROUPAS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
                <OptionSpanAndCard 
                    showWindows={showWindows}
                    toogleWindow={toogleWindow}
                    id="5"
                    text="ACESSÓRIOS"
                    cardContent={["Toy Machine", "Vans", "Element", ]}
                />
            </ul>
        </nav>
    )
}
