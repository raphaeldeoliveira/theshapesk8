import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/search/productcard.scss";

export default function ProductCard(props) {
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0 });
    };


    return (
        <Link onClick={scrollToTop} to={`/product/${props.id}`} className="productCard">
            <img alt="" src={props.image} />
            <h2>{props.name}</h2>
            <h3>$ {props.price}</h3>
        </Link>
    )
}
