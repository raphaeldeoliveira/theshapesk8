import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/search/productcard.scss";

export default function ProductCard(props) {
    //const topRef = useRef(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <Link onClick={scrollToTop} to={`/product/${props.id}`} className="productCard">
            <img alt="" src={props.image} />
            <h2>{props.name}</h2>
            <h3>{props.price}</h3>
            {/* Esta div vazia será a referência para rolar para o topo */}
            {/*<div ref={topRef} />*/}
        </Link>
    )
}
