import React, { useState, useEffect } from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import ButtonShape from "../components/global/ButtonShape";
import "../styles/pages/product/product.scss"
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/global/LoadingSpinner";
import { addToCart } from "../redux/cart/actions";
import { getProductData } from "../api";

export default function Product() {

    const [dataLoad, setDataLoad] = useState(false)
    const [productData, setProductData] = useState()
    const { id } = useParams()

    // fazer o get na API. 
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/${id}`);
                if (!response.ok) {
                    alert("Falha ao registrar!")
                    throw new Error('Erro ao fazer login');
                }
                const data = await response.json();
                console.log("--------")
                console.log(data)
                console.log("--------")
                setProductData(data)
                setDataLoad(true)
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error)
                setDataLoad(true)
            }
        }
        loadProducts()
    }, [id])

    // os dados do productData vem da API. No momento ta mockado para teste
    /*const [productData, setProductData] = useState({
        id: "1",
        title: "Black frog",
        image: "https://socalskateshop.com/mm5/graphics/00000001/38/Dickies-Vincent-Alvarez-Block-Collar-Short-Sleeve-Work-Shirt-Gulf-Blue-1_280x280.jpg",
        price: 247.98,
        quantity: 1
    })*/
    const [productQtd, setProductQtd] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function incrementQdt() {
        setProductQtd((prev) => prev + 1)
    }

    function decrementQtd() {
        if (productQtd > 1) {
            setProductQtd((prev) => prev - 1)
        }
    }

    function handleAddToCart() {
        console.log("caiu na vila")
        dispatch(addToCart(productData));
    };

    const searchTerm = useSelector(state => state.searchReducer.currentSearch);
    //alert(`search: ${search}`)

    // a parte do product container esta fugindo do wireframe, mais pro site inspiração
    // isso por conta da falta de complexidade: uma foto, sem opções de cor, etc

    // usa esse ID pra recuperar as informações do produto (pelo menos uma imagem
    // com melhor resolução)

    /*useEffect(() => {
        const data = getProductData(id);
        setProductData(data);
    }, [id]);*/


    const product_sizes = ["P", "M", "G"]
    // essa informação vai vim da API

    return (
        <div>
            <Link className="return-link" to={searchTerm ? `/search/${searchTerm}` : "/search"}><FaArrowLeft /> <span>voltar para pagina de busca: {searchTerm}</span></Link>
            <div className="product__container">
                <div className="container__product__image">
                    {dataLoad ? 
                        (<img src={productData?.dados.imagem}/>) 
                        : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)}
                </div>
                {dataLoad && productData ? (
                    <div className="container__product__detail">
                        <h2>{productData.dados.nome}</h2>
                        <h3>R$ {productData.dados.valor?.toFixed(2)}<label>ou {(productData.dados.valor * 1.08)?.toFixed(2)} em 3x</label></h3>
                        <div className="detail__size">
                            <h4>select size: </h4>
                            {product_sizes.map((item) => {
                                return (
                                    <div className="size__input" key={item}>
                                        <input type="radio" name="size" />
                                        <label>{item}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="detail__quantity">
                            <h3>Quantidade: </h3>
                            <div>
                                <button onClick={decrementQtd}>-</button>
                                <div>{productQtd}</div>
                                <button onClick={incrementQdt}>+</button>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
                            <button onClick={() => navigate("/payment")}>Comprar agora</button>
                            <ButtonShape onClick={handleAddToCart} title="ADICIONAR AO CARRINHO" color="673ab7"/>
                            <ButtonShape title="COMPRAR AGORA" color="ff9800" />
                        </div>
                    </div>
                ) : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)}
                
            </div>
            <SearchPageGrid h1title="Produtos interessantes pra você:" />
        </div>
    )
}
