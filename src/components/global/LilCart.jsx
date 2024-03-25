import React from "react";
import "../../styles/pages/global/lilcart.scss";
import { IoMdClose } from "react-icons/io";

export default function LilCart(props) {
    return (
        <div className={`lil-cart ${props.showCart ? "cart__show" : "cart__hideen"}`}>
            <div className="cart__header">
                <h1>Seu carrinho</h1>
                <IoMdClose className="sgv--close" onClick={() => props.setShowCart((prev) => !prev)} />
            </div>
        </div>
    )
}
