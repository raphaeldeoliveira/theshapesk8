import React, { useState } from "react";
import "../../styles/pages/global/lilcart.scss";
import { IoMdClose } from "react-icons/io";
import CartCard from "./CartCard";
import ButtonShape from "./ButtonShape"

export default function LilCart(props) {

    // verifica o LocalStorage para ver a quantidade de itens no carrinho
    // ou puxa do redux (ainda nao decidi se vai armazena no localstorage ou redux)
    const [cartProducts, setCartProducts] = useState([{"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheelsaaaa", "price": "$19.99", "quantity": "1"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheels", "price": "$19.99", "quantity": "3"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheels", "price": "$19.99", "quantity": "1"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "Hot Wheels", "price": "$19.99", "quantity": "2"}])

    // o valor total da compra tambem ficara armazenado no redux, portanto nao precisa implementar aqui
    
    // aqui nao precisa de loading porque o carrinho vai ficar armazenado no redux
    // ou no localstorage

    return (
        <div className={`lil-cart ${props.showCart ? "cart__show" : "cart__hideen"}`}>
            <div className="cart__header">
                <h1>Seu carrinho</h1>
                <IoMdClose className="sgv--close" onClick={() => props.setShowCart((prev) => !prev)} />
            </div>
            {cartProducts.map((item) => {
                return <CartCard 
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                />
            })}
            <div className="cart__separator"></div>
            <div className="cart__pf-container">
                <h2>Subtotal: $ 512.12</h2>
                <ButtonShape 
                    color="673ab7"
                    title="Finalizar compra"
                />
            </div>
        </div>
    )
}
