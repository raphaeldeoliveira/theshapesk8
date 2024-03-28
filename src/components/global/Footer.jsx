import React from "react";
import "../../styles/pages/global/footer.scss"
import logo from "../../assets/images/logo-purple.png"

export default function Footer() {

    return (
        <footer>
            <img alt="" src={logo}/>
            <h2>Powered by <a href="https://github.com/raphaeldeoliveira" target="_blank" rel="noreferrer">Raphael de Oliveira</a> and <a href="https://github.com/MAONEZZE" target="_blank" rel="noreferrer">Ruan Sanchez</a></h2>
        </footer>
    )
}