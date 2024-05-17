import React, { useState, useEffect } from "react";
import "../styles/pages/payment/payment.scss";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../components/global/CartCard";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cart/actions";
import LoadingSpinner from "../components/global/LoadingSpinner";
import { useTranslation } from 'react-i18next';

export default function Payment() {

    const navigate = useNavigate();
    const userId = useSelector(state => state.userReducer.userId);
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation();

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
        setLoading(true)
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
                alert(t('orderSend'))
            } else {
                throw new Error(t('orderSendFailed'));
            }
        } catch (error) {
            console.error(t('orderSendFailed'), error);
            alert(t('orderSendFailed'), error)
        } finally {
            setLoading(false)
            navigate("/");
        }
        dispatch(clearCart());
    };

    return (
        <div className="payment">
            <h1>{t('finishYourOrder')}</h1>
            {loading ? (
                <LoadingSpinner verticalsize="300" horizontalsize="800" />
            ) : (
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
                        <h2>{t('orderValue')}: ${totalPrice.toFixed(2)}</h2>
                        <button onClick={finalizarPedido}>{t('finishOrder')}</button>
                    </div>
                </div>
            )}
            
        </div>
    );
}
