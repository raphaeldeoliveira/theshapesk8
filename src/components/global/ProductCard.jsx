import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/search/productcard.scss"

export default function ProductCard(props) {

    return (
        <Link className="productCard">
            <img src={props.image} />
            <h2>{props.name}</h2>
            <h3>{props.price}</h3>
        </Link>
    )
}