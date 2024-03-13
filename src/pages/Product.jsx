import React from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import ButtonShape from "../components/global/ButtonShape";
import "../styles/pages/product/product.scss"

export default function Product() {

    // a parte do product container esta fugindo do wireframe, mais pro site inspiração
    // isso por conta da falta de complexidade: uma foto, sem opções de cor, etc

    const product_sizes = ["P", "M", "G"]
    // essa informação vai vim da API

    return (
        <div>
            <div className="product__container">
                <div className="container__product__image">
                    <img src="https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg"/>
                </div>
                <div className="container__product__detail">
                    <h2>Product Title</h2>
                    <h3>R$ 247,98 <label>ou 259,99 em 3x</label></h3>
                    <div className="detail__size">
                        <h4>select size: </h4>
                        {product_sizes.map((item) => {
                            return (
                                <div className="size__input">
                                    <input type="radio" name="size" />
                                    <label>{item}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="detail__quantity">
                        <h3>Quantidade: </h3>
                        <div>
                            <button>-</button>
                            <div>1</div>
                            <button>+</button>
                        </div>
                    </div>
                    <div>
                        <ButtonShape title="ADICIONAR AO CARRINHO" color="673ab7"/>
                        <ButtonShape title="COMPRAR AGORA" color="ff9800" />
                    </div>
                    
                </div>
            </div>
            <SearchPageGrid h1title="Produtos interessantes pra você:" />
        </div>
    )
}