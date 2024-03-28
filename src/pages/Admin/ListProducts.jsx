import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function ListProducts() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://e-commerce-prod.onrender.com/api/produtos');
                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos');
                }   
                const data = await response.json();
                setProducts(data); // Define os produtos com os dados da API
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Falha ao excluir produto');
            }
    
            // Produto excluído com sucesso
            alert('Produto excluído com sucesso!');
    
            // Atualizar a lista de produtos excluindo o produto removido
            setProducts(prevProducts => {
                return {
                    ...prevProducts,
                    dados: prevProducts.dados.filter(item => item.id !== id)
                };
            });
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Tente novamente mais tarde.');
        }
    };
    

    return products ? (
        <div className="product__list">
            <h1>List of products</h1>
            <div>
                {products.dados.map((item) => {
                    return (
                        <div key={item.id}>
                            <h4>{item.nome}</h4>
                            <div>
                                <Link className="sgv--link" to={`/product/${item.id}`}><FaExternalLinkAlt /></Link>
                                <FaTrashAlt className="sgv--trash" onClick={() => deleteProduct(item.id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <LoadingSpinner />
    )
}
