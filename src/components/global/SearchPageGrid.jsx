import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../../styles/pages/search/searchpage.scss";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function SearchPageGrid(props) {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { t } = useTranslation();

    // Obtém o nome do produto da URL
    const { productname } = useParams();

    useEffect(() => {
        const loadProducts = async () => {
            // Atualiza o estado loading para true antes de fazer a nova solicitação
            setLoading(true);

            try {
                let response;
                if (productname) {
                    response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/nome/${productname}`);
                } else {
                    response = await fetch(`http://localhost:8080/mainProductTeste`);
                }
                
                if (!response.ok) {
                    alert(t('failedRegister'))
                    throw new Error('Erro ao fazer login');
                }
                const data = await response.json();
                console.log(data)
                setProducts(data);
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error);
            } finally {
                // Define o estado loading como false após a conclusão da solicitação
                setLoading(false);
            }
        }
        loadProducts();
    }, [productname, t]); // Adiciona productname como dependência para garantir que a solicitação seja feita sempre que a rota mudar

    /* Não vai ter filtros. Somente 'busca por: ', quando clicar em spitfire
    ele vai ficar 'Busca por: Spitfire' */

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
                )}
            </div>
        );
    }
}
