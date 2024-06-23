import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { FaTrashAlt, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function ListProducts() {
    const [products, setProducts] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/mainProductTeste');
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
        try {
            const response = await fetch(`http://localhost:8080/mainProductTeste/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Falha ao excluir produto');
            }
    
            // Produto excluído com sucesso
            alert(t('productDeleted'));
    
            // Atualizar a lista de produtos excluindo o produto removido
            setProducts(prevProducts => prevProducts.filter(item => item.productDetail.id !== id));
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert(t('deletedError'));
        }
    };    

    return products ? (
        <div className="product__list">
            <h1>{t('productList')}</h1>
            <div>
                {products.map((item) => {
                    return (
                        <div key={item.productDetail.id}>
                            <h4>{item.productDetail.nome}</h4>
                            <div>
                                <Link className="sgv--link" to={`/product/${item.productDetail.id}`}><FaExternalLinkAlt /></Link>
                                <Link className="sgv--edit" to={`/admin/editProduct/${item.productDetail.id}`}>
                                    <FaEdit />
                                </Link>
                                <FaTrashAlt className="sgv--trash" onClick={() => deleteProduct(item.productDetail.id)} />
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
