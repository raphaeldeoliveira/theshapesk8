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

    // essa variavel vai mudar de nome quando implementar a chamada da api
    // pra popular esse array com os itens da busca
    const arrayDeRetornoDaBusca = [
        { image: "https://socalskateshop.com/mm5/graphics/00000001/39/Santa-Cruz-stone-ls-flannel-shirt-blackbrown-1_280x280.jpg", name: "Vans Shoes", price: "$ 79.99" },
        { image: "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg", name: "Black frong", price: "$ 19.99" },
        { image: "https://socalskateshop.com/mm5/graphics/00000001/36/Alien-Workshop-Skateboards-Visitor-Window-Button-Down-Shirt-Perriwinkle-White-1_280x280.jpg", name: "Tyler's shape", price: "$ 69.99" },
        { image: "https://socalskateshop.com/mm5/graphics/00000001/40/Black-Label-Skateboards-5-Flame-5-Panel-Snapback-Hat-Khaki-1_280x280.jpg", name: "Hat Khaki", price: "$ 29.95" }
    ];

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
                        />
                    ))}
                </div>
            </div>
        )
    }

    
}