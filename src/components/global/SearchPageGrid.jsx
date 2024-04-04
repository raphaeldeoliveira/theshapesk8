import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../../styles/pages/search/searchpage.scss";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router-dom";

export default function SearchPageGrid(props) {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

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
                    response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos`);
                }
                
                if (!response.ok) {
                    alert("Falha ao registrar!")
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
    }, [productname]); // Adiciona productname como dependência para garantir que a solicitação seja feita sempre que a rota mudar

    /* Não vai ter filtros. Somente 'busca por: ', quando clicar em spitfire
    ele vai ficar 'Busca por: Spitfire' */

    let h1title;
    if (props.h1title) {
        h1title = props.h1title;
    } else if (productname === undefined) {
        h1title = "Todos os produtos"
    } else {
        h1title = `Busca por: ${productname}`;
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
                {products.dados && products.dados.length === 0 ? (
                    <h1>A busca não retornou resultados</h1>
                ) : (
                    <div className="searchPage__grid">
                    {products.dados && products.dados.map((item, index) => (
                        <ProductCard 
                            key={index}
                            image={item.imagem}
                            name={item.nome}
                            price={item.valor}
                            id={item.id}
                        />
                    ))}
                </div>
                )}
                
            </div>
        );
    }
}
