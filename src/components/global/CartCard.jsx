import React from "react";
import "../../styles/pages/global/cartcard.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cart/actions";

export default function CartCard(props) {

    const dispatch = useDispatch()

    return (
        <div className="cart-card">
            <img alt="" src={props.image} />
            <div>
                <h4>{props.title}</h4>
                <div className="cart__qp-container">
                    <h5>{props.quantity}X</h5>
                    <h5>{props.price}</h5>
                </div>
            </div>
            <FaRegTrashAlt 
                className="sgv--trash" 
                onClick={() => dispatch(removeFromCart(props.id))}
            />
        </div>
    )
}