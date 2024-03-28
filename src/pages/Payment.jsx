import React from "react";
import "../styles/pages/payment/payment.scss";
import { useSelector } from "react-redux";

export default function Payment() {

    const cartItems = useSelector(state => state.cartReducer.cartItems)

    return (
        <div className="payment">
            <h1>Finalize sua compra</h1>
            <div>
                <h2>Pedidos:</h2>
                {cartItems.map(() => {
                    return (
                        <div>aaa</div>
                    )
                })}
            </div>
        </div>
    )
}