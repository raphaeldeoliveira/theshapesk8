import React, { useState } from "react";
import "../../styles/pages/user/user__pedidos.scss";
import LoadingSpinner from "../../components/global/LoadingSpinner";

export default function Pedidos() {

    const [pedidos, setPedidos] = useState(
        [
            {
              "valorTotal": 5.6,
              "data": "2024-03-30",
              "id_Cliente": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "itens": [
                {
                  "id_Produto": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "qtd_Produto": 1
                }
              ]
            },
            {
              "valorTotal": 987.65,
              "data": "2024-09-10",
              "id_Cliente": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "itens": [
                {
                  "id_Produto": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "qtd_Produto": 42
                }
              ]
            },
            {
              "valorTotal": 0,
              "data": "2024-03-26",
              "id_Cliente": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "itens": [
                {
                  "id_Produto": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "qtd_Produto": 0
                }
              ]
            }
          ]
          
    )
    const [dataLoad, setDataLoad] = useState(true)
    // da um get na API para pegar os pedidos (a quantidade, nao os pedidos em sí)
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    function handleClickPedido(pedido) {
        setPedidoSelecionado(pedido)
    }

    const limparDetalhePedido = () => {
        setPedidoSelecionado(null);
    };

    return (
        dataLoad ? (
            <div className="user__pedidos">
                <div className="pedidos__half-left">
                    <h1>Pedidos</h1>
                    {pedidos ? (
                        <nav>
                            <ul>
                                {pedidos.map((item, index) => {
                                    {console.log(item)}
                                    return <li
                                        key={index}
                                        onClick={() => handleClickPedido(item)}
                                    >Pedido : {item.data}</li>;
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