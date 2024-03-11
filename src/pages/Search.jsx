import React from "react";
import ProductCard from "../components/global/ProductCard";
import "../styles/pages/search/searchpage.scss"

export default function Search() {

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

    return (
        <div className="searchPage">
            <h1>Busca por: {/* parametro do input da home ou clica nos banners */}</h1>
            <div className="searchPage__grid">
                {arrayDeRetornoDaBusca.map((item) => {
                    return (
                        <ProductCard 
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}