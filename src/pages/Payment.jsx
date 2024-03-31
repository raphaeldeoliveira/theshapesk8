import React, { useEffect } from "react";
import "../styles/pages/payment/payment.scss";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../components/global/CartCard";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cart/actions";

export default function Payment() {

    const navigate = useNavigate();
    const userId = useSelector(state => state.userReducer.userId);
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);
    const dispatch = useDispatch();

    const idAndQuantityArray = cartItems.map(product => ({
        id_Produto: product.id,
        qtd_Produto: product.quantity
    }));

    console.log(idAndQuantityArray)

    useEffect(() => {
        if (!userId) {
            navigate("/register");
        }
    }, [userId, navigate]);

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const finalizarPedido = async () => {
        try {
            console.log(JSON.stringify({
                valorTotal: totalPrice,
                data: dataFormatada,
                id_Cliente: userId,
                items: idAndQuantityArray,
            }))
            const response = await fetch('https://e-commerce-prod.onrender.com/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Se necessário, adicione outros headers como tokens de autenticação
                },
                body: JSON.stringify({
                    valorTotal: totalPrice,
                    data: dataFormatada,
                    id_Cliente: userId,
                    itens: idAndQuantityArray,
                })
            });

            // Verifica se a requisição foi bem sucedida
            if (response.ok) {
                // Implemente o que deseja fazer após finalizar o pedido, como redirecionar para outra página
                //navigate("/pagina-de-sucesso");
                alert("pedido enviado com sucesso")
            } else {
                throw new Error('Erro ao finalizar o pedido');
            }
        } catch (error) {
            console.error('Erro ao finalizar o pedido:', error);
            // Implemente o tratamento de erro conforme necessário
        }
        dispatch(clearCart());
    };

    return (
        <div className="payment">
            <h1>Finalize sua compra</h1>
            <div>
                <div className="payment__half--left">
                    {cartItems.map((item) => (
                        <CartCard 
                            key={item.id}
                            id={item.id}
                            image={item.imagem}
                            title={item.nome}
                            price={item.valor}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
                <div className="payment__half--right">
                    <h2>Valor do pedido: {totalPrice.toFixed(2)}</h2>
                    <button onClick={finalizarPedido}>Finalizar pedido</button>
                </div>
            </div>
        </div>
    );
}
