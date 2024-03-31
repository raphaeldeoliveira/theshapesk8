import React, { useState, useEffect } from "react";
import "../../styles/pages/user/user__pedidos.scss";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { useSelector } from "react-redux";

export default function Pedidos() {

    const [loading, setLoading] = useState(true)
    const [pedidos, setPedidos] = useState([])
    const userId = useSelector(state => state.userReducer.userId);
    
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/pedidos/cliente/${userId}`);
                if (!response.ok) {
                    alert("Falha ao registrar!")
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
    }, []);

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
                    <h1>Pedidos</h1>
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
                                            Pedido : {item.data}
                                        </li>
                                    );
                                })}
                                <li
                                    onClick={limparDetalhePedido}
                                >Limpar detalhe do pedido</li>
                            </ul>
                        </nav>
                    ) : (
                        <h1 className="h1--v2">Sua lista de pedidos está vazia</h1>
                    )}
                </div>
                <div className="pedidos__half-right">
                    {pedidoSelecionado ? (
                        <div>
                            <h2>Detalhes do Pedido</h2>
                            <h3>Data: {pedidoSelecionado.data}</h3>
                            <h4>Valor Total: {pedidoSelecionado.valorTotal}</h4>
                            <h4>Itens comprados</h4>
                            {pedidoSelecionado.itens.map((item) => {
                                return <div>
                                    <h3>nome: {item.id_Produto}</h3>
                                    <h3>quantidade: {item.qtd_Produto}</h3>
                                </div>
                            })}
                        </div>
                    ) : (
                        <h1>Selecione um pedido!</h1>
                    )}
                </div>
            </div>
        ) : (
            <LoadingSpinner horizontalsize="800" verticalsize="500" />
        )
       
    )
}