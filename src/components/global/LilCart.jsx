import React, { useEffect } from "react";
import "../../styles/pages/global/lilcart.scss";
import { IoMdClose } from "react-icons/io";
import CartCard from "./CartCard";
import ButtonShape from "./ButtonShape"
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice } from "../../redux/cart/actions";
import { useNavigate } from "react-router-dom";


export default function LilCart(props) {

    // verifica o LocalStorage para ver a quantidade de itens no carrinho
    // ou puxa do redux (ainda nao decidi se vai armazena no localstorage ou redux)
    //const [cartProducts, setCartProducts] = useState([{"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheelsaaaa", "price": "$19.99", "quantity": "1"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheels", "price": "$19.99", "quantity": "3"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "HotWheels", "price": "$19.99", "quantity": "1"}, {"image": "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", "title": "Hot Wheels", "price": "$19.99", "quantity": "2"}])

    // o valor total da compra tambem ficara armazenado no redux, portanto nao precisa implementar aqui
    
    // aqui nao precisa de loading porque o carrinho vai ficar armazenado no redux
    // ou no localstorage

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);

    console.log("---cart itens---")
    console.log(cartItems)

    useEffect(() => {
        dispatch(calculateTotalPrice());
    }, [cartItems, dispatch]);

    return (
        <div className={`lil-cart ${props.showCart ? "cart__show" : "cart__hideen"}`}>
            <div className="cart__header">
                <h1>Seu carrinho</h1>
                <IoMdClose className="sgv--close" onClick={() => props.setShowCart((prev) => !prev)} />
            </div>
            {cartItems.length != 0 ? (
                cartItems.map((item) => {
                    console.log(item)
                    return <CartCard 
                        id={item.id}
                        image={item.imagem}
                        title={item.nome}
                        price={item.valor}
                        quantity={item.quantity}
                    />
                }
                )
            ) : (
                <h1 className="your-cart-is-empty">Seu carrinho esta vazio</h1>
            )}
            {cartItems.length != 0 ? (
                <div>
                    <div className="cart__separator"></div>
                    <div className="cart__pf-container">
                        <h2>Subtotal: ${totalPrice.toFixed(2)}</h2>
                        <button onClick={() => {
                            navigate("/payment"); 
                            props.setShowCart((prev) => !prev);
                        }}>Finalizar compra</button>
                        <ButtonShape 
                            color="673ab7"
                            title="Finalizar compra"
                        />
                    </div>
                </div>
                
            ) : (
                <div></div>
            )}
            
        </div>
    )
}
