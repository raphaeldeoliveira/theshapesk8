import React from "react";
import "../../styles/pages/global/cartcard.scss";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartCard(props) {

    return (
        <div className="cart-card">
            <img src={props.image} />
            <div>
                <h4>{props.title}</h4>
                <div className="cart__qp-container">
                    <h5>{props.quantity}X</h5>
                    <h5>{props.price}</h5>
                </div>
            </div>
            <FaRegTrashAlt className="sgv--trash" />
        </div>
    )
}