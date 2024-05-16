import React, { useState, useEffect } from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import "../styles/pages/product/product.scss"
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/global/LoadingSpinner";
import { addToCart } from "../redux/cart/actions";
import { useTranslation } from 'react-i18next';

export default function Product() {

    const [dataLoad, setDataLoad] = useState(false)
    const [productData, setProductData] = useState()
    const { id } = useParams()
    const { t } = useTranslation();

    useEffect(() => {
        setDataLoad(false)
        const loadProducts = async () => {
            try {
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/${id}`);
                if (!response.ok) {
                    alert("Falha ao registrar!")
                    throw new Error('Erro ao fazer login');
                }
                const data = await response.json();
                setProductData(data)
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error)
                
            } finally {
                setDataLoad(true)
            }
        }
        loadProducts()
    }, [id])

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
        console.log("caiu na vila o peixe fuzila")
        console.log(productData.dados)
        dispatch(addToCart(productData.dados));
    };

    const searchTerm = useSelector(state => state.searchReducer.currentSearch);
    
    const product_sizes = ["P", "M", "G"]
    
    return (
        <div>
            <Link className="return-link" to={searchTerm ? `/search/${searchTerm}` : "/search"}><FaArrowLeft /> <span>{t('returnSearchPage')} {searchTerm}</span></Link>
            <div className="product__container">
                <div className="container__product__image">
                    {dataLoad ? 
                        (<img alt="" src={productData?.dados.imagem}/>) 
                        : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)}
                </div>
                {dataLoad && productData ? (
                    <div className="container__product__detail">
                        <h2>{productData.dados.nome}</h2>
                        <h3>$ {productData.dados.valor?.toFixed(2)} <label> {t('conector2')} {(productData.dados.valor * 1.08)?.toFixed(2)} {t('conector3')} 3x</label></h3>
                        <div className="detail__size">
                            <h4>{t('selectSize')}: </h4>
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
                            <h3>{t('quantity')}: </h3>
                            <div>
                                <button onClick={decrementQtd}>-</button>
                                <div>{productQtd}</div>
                                <button onClick={incrementQdt}>+</button>
                            </div>
                        </div>
                        <div className="detail__buttons">
                            <button className="button--add" onClick={handleAddToCart}>{t('addCartButton')}</button>
                            <button className="button--buy" onClick={() => {
                                handleAddToCart();
                                navigate("/payment");
                            }}>{t('buyNowButton')}</button>
                        </div>
                    </div>
                ) : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)}
                
            </div>
            <SearchPageGrid h1title={t('pageGridTitle2')} />
        </div>
    )
}
