import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../../styles/pages/search/searchpage.scss";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function SearchPageGrid(props) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 20;
    const [totalItems, setTotalItems] = useState(0);
    const { t } = useTranslation();

    // Obtém o nome do produto da URL
    const { productname } = useParams();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);

            try {
                let response;
                if (productname) {
                    response = await fetch(`https://theshapesk8api.onrender.com/product/search/${productname}?page=${page}&size=${size}`);
                } else {
                    response = await fetch(`https://theshapesk8api.onrender.com/product?page=${page}&size=${size}`);
                }
                
                if (!response.ok) {
                    alert(t('failedRegister'));
                    throw new Error('Erro ao fazer login');
                }
                
                const data = await response.json();
                console.log(data);

                const productsData = data.content ? data.content : data; // Supondo que 'content' contenha os produtos

                setProducts(productsData);

                // Calcula o número total de páginas com base no número total de itens retornados
                const totalPages = Math.ceil(data.totalItems / size);

                setTotalItems(data.totalItems)

                setTotalPages(totalPages);
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [productname, page, t]); // Removido 'size' da lista de dependências pois é fixo

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    let h1title;
    if (props.h1title) {
        h1title = props.h1title;
    } else if (productname === undefined) {
        h1title = t('allProducts')
    } else {
        h1title = `${t('searchFor')}: ${productname}`;
    }

    const outletStyles = {
        minHeight: '62vh',
        height: '100%',
    };

    if (loading) {
        return <LoadingSpinner verticalsize="350" horizontalsize="1000" />;
    } else {
        return (
            <div style={outletStyles} className="searchPage">
                <h1>{h1title}</h1>
                {products.length === 0 ? (
                    <h1>{t('searchNoReturnResults')}</h1>
                ) : (
                    <>
                        <div className="searchPage__grid">
                            {products.map((item, index) => (
                                item.images.length > 0 && (
                                    <ProductCard 
                                        key={index}
                                        image={item.images[0].imagem}
                                        name={item.productDetail.nome}
                                        price={item.productDetail.valor}
                                        id={item.productDetail.id}
                                    />
                                )
                            ))}
                        </div>
                        <div className="searchPage__grid__pagination" style={{ display: totalPages <= 1 ? "none" : "" }}>
                            <button disabled={page === 0}>
                                <FaArrowAltCircleLeft
                                    className="pagination__button--left"
                                    onClick={handlePreviousPage}
                                />
                            </button>
                            
                            <span>{`PAGE ${page + 1} OF ${totalPages}`}</span>

                            <button disabled={page === totalPages - 1}>
                                <FaArrowAltCircleRight
                                    className="pagination__button--right"
                                    onClick={handleNextPage}
                                />
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}
