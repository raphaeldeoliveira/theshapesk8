import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../../styles/pages/search/searchpage.scss";
import LoadingSpinner from "./LoadingSpinner";

export default function SearchPageGrid(props) {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    // fazer o get na API. 
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('https://e-commerce-prod.onrender.com/api/produtos');
                if (!response.ok) {
                    alert("Falha ao registrar!")
                    throw new Error('Erro ao fazer login');
                }
                setLoading(false)
                const data = await response.json();
                console.log(data)
                setProducts(data)
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error)
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    /* Não vai ter filtros. Somente 'busca por: ', quando clicar em spitfire
    ele vai ficar 'Busca por: Spitfire' */

    if (loading) {
        return <LoadingSpinner verticalsize="350" horizontalsize="1000" />
    } else {
        return (
            <div className="searchPage">
                <h1>{props.h1title}</h1>
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
            </div>
        )
    }

    
}