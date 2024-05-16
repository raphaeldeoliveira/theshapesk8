import React, { useState, useEffect } from "react";
import "../../styles/pages/user/user__pedidos.scss";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Pedidos() {

    const [loading, setLoading] = useState(true)
    const [pedidos, setPedidos] = useState([])
    const userId = useSelector(state => state.userReducer.userId);

    const { t } = useTranslation();
    
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/pedidos/cliente/${userId}`);
                if (!response.ok) {
                    alert(t('failedRegister'))
                    throw new Error('Erro ao fazer login');
                }
                const pedidos = await response.json();
                console.log("pedidos")
                console.log(pedidos.dados)
                setPedidos(pedidos.dados);
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, [userId]);

    // da um get na API para pegar os pedidos (a quantidade, nao os pedidos em sí)
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    function handleClickPedido(pedido) {
        setPedidoSelecionado(pedido)
    }

    const limparDetalhePedido = () => {
        setPedidoSelecionado(null);
    };

    return (
        !loading ? (
            <div className="user__pedidos">
                <div className="pedidos__half-left">
                    <h1>{t('pedidos2')}</h1>
                    {pedidos ? (
                        <nav>
                            <ul>
                                {pedidos.map((item, index) => {
                                    console.log(item); // Remover o bloco aninhado redundante
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => handleClickPedido(item)}
                                        >
                                            {t('pedidos3')} : {item.data}
                                        </li>
                                    );
                                })}
                                <li
                                    onClick={limparDetalhePedido}
                                >{t('cleanRequests')}</li>
                            </ul>
                        </nav>
                    ) : (
                        <h1 className="h1--v2">{t('yourRequestListIsEmpty')}</h1>
                    )}
                </div>
                <div className="pedidos__half-right">
                    {pedidoSelecionado && <h2>{t('pedidoDetalhe')}</h2>}
                    {pedidoSelecionado ? (
                        <div>
                            <h3>{t('data2')}: {pedidoSelecionado.data}</h3>
                            <h4>{t('totalValue')}: ${pedidoSelecionado.valorTotal}</h4>
                            <h3>{t('buyedItens')}:</h3>
                            {pedidoSelecionado.itens.map((item) => {
                                return <div>
                                    <h3>{item.produto.nome}</h3>
                                    <h4>{t('quantity')}: {item.qtd_Produto}x</h4>
                                </div>
                            })}
                        </div>
                    ) : (
                        <h1>{t('selectedOrder')}</h1>
                    )}
                </div>
            </div>
        ) : (
            <LoadingSpinner horizontalsize="800" verticalsize="500" />
        )
       
    )
}