import React, { useState, useEffect } from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import ProductImagesCarrousel from "../components/global/ProductImagesCarrousel";
import "../styles/pages/product/product.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/global/LoadingSpinner";
import { addToCart } from "../redux/cart/actions";
import { useTranslation } from 'react-i18next';

export default function Product() {
    const [dataLoad, setDataLoad] = useState(false);
    const [ableToClick, setAbleToClick] = useState(false)
    const [productData, setProductData] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [productQtd, setProductQtd] = useState(1);
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setDataLoad(false);
        const loadProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/${id}`);
                if (!response.ok) {
                    alert(t('registerError2'))
                    throw new Error('Erro ao fazer login');
                }
                const data = await response.json();
                console.log(data);
                setProductData(data);
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error);
            } finally {
                setDataLoad(true);
            }
        };
        loadProducts();
    }, [id, t]);

    function incrementQdt() {
        if (productData && productData.products && sizeSelected !== null && productQtd < productData.products[sizeSelected].quantidade) {
            setProductQtd((prev) => prev + 1);
        } else {
            alert("Não há mais produtos disponíveis");
        }
    }

    function decrementQtd() {
        if (productQtd > 1) {
            setProductQtd((prev) => prev - 1);
        }
    }

    function handleAddToCart() {
        if (productData) {
            for (let i = 0; i < productQtd; i++) {
                dispatch(addToCart(productData));
            }
        }
    }

    const searchTerm = useSelector(state => state.searchReducer.currentSearch);
    const product_sizes = [t('tamanhoP'), t('tamanhoM'), t('tamanhoG')];

    return (
        <div>
            <Link className="return-link" to={searchTerm ? `/search/${searchTerm}` : "/search"}>
                <FaArrowLeft /> <span>{t('returnSearchPage')} {searchTerm}</span>
            </Link>
            <div className="product__container">
                <div className="container__product__image">
                    {dataLoad ? 
                        /*(<img alt="" src={productData?.images[0].imagem}/>) */
                        (<ProductImagesCarrousel 
                            images={productData?.images || []}
                        />)
                        : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)
                    }
                </div>
                {dataLoad && productData ? (
                    <div className="container__product__detail">
                        <h2>{productData.productDetail.nome}</h2>
                        <div className="container__product__detail__categories-section">
                            <div className="categories-section--category">{productData.productDetail.categoria}</div>
                            <div className="categories-section--subcategory">{productData.productDetail.subcategoria}</div>
                            <div className="categories-section--marca">{productData.productDetail.marca}</div>
                        </div>
                        <div className="container__product__detail__two-section">
                            <div>
                                <h3>$ {productData.productDetail.valor} <label> {t('conector2')} {(productData.productDetail.valor * 1.08)?.toFixed(2)} {t('conector3')} 3x</label></h3>
                                <div className="detail__size">
                                    <h4>{t('selectSize')} </h4>
                                    {productData.products && productData.products.map((item, index) => (
                                        <button 
                                            key={index}
                                            className="button__size"
                                            style={{
                                                backgroundColor: sizeSelected === index ? "#673ab7" : "",
                                                color: sizeSelected === index ? "white" : ""
                                            }}
                                            onClick={() => {
                                                setProductQtd(1);
                                                setSizeSelected(index);
                                                setAbleToClick(true);
                                            }}
                                        >
                                            {item.tamanho}
                                        </button>
                                    ))}
                                </div>
                                <div className="detail__quantity">
                                    <h3>{t('quantity')}: </h3>
                                    <div>
                                        <button 
                                            onClick={decrementQtd}
                                            disabled={!ableToClick}
                                            title={!ableToClick ? t('changeQuantityMsg') : ""}
                                        >-</button>
                                        <div>{productQtd}</div>
                                        <button 
                                            onClick={incrementQdt}
                                            disabled={!ableToClick}
                                            title={!ableToClick ? t('changeQuantityMsg') : ""}
                                        >+</button>
                                    </div>
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
                    </div>
                ) : (<LoadingSpinner verticalsize="350" horizontalsize="350" />)}
            </div>
            <SearchPageGrid h1title={t('pageGridTitle2')} />
        </div>
    );
}
