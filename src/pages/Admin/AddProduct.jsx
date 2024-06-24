import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "../../styles/pages/admin/addProduct.scss";

const initialProductState = { tamanho: "", quantidade: 0 };
const initialImageState = { imagem: "" };

export default function AddProduct() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        productDetail: {
            nome: "",
            descricao: "",
            valor: 0,
            categoria: "",
            subcategoria: "",
            marca: ""
        },
        products: [ { ...initialProductState } ],
        images: [ { ...initialImageState } ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            productDetail: {
                ...prevFormData.productDetail,
                [name]: value
            }
        }));
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...formData.products];
        updatedProducts[index][name] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            products: updatedProducts
        }));
    };

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const updatedImages = [...formData.images];
        updatedImages[index].imagem = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: updatedImages
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Filtrar produtos e imagens para enviar apenas os preenchidos
        const filteredProducts = formData.products.filter(p => p.tamanho !== "" && p.quantidade !== 0);
        const filteredImages = formData.images.filter(i => i.imagem !== "");
        
        try {
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productDetail: formData.productDetail,
                    products: filteredProducts,
                    images: filteredImages
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar produto');
            }

            alert(t('registeredProductSucefully'));
            resetForm();
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert(t('registerError'));
        }
    };

    const resetForm = () => {
        setFormData({
            productDetail: {
                nome: "",
                descricao: "",
                valor: 0,
                categoria: "",
                subcategoria: "",
                marca: ""
            },
            products: [ { ...initialProductState } ],
            images: [ { ...initialImageState } ]
        });
    };

    const addProductField = () => {
        if (formData.products.length < 7) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                products: [...prevFormData.products, { ...initialProductState }]
            }));
        }
    };

    const addImageField = () => {
        if (formData.images.length < 4) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, { ...initialImageState }]
            }));
        }
    };

    return (
        <div className="add__product">
            <h1>{t('addProduct2')}</h1>
            <form onSubmit={handleSubmit} className="addProduct__container">
                <div className="addProduct--ProductDetails">
                    <div>
                        <label>{t('name')}: </label>
                        <input 
                            type="text" 
                            name="nome" 
                            value={formData.productDetail.nome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('description')}: </label>
                        <input 
                            type="text" 
                            name="descricao" 
                            value={formData.productDetail.descricao} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('valor')}:</label>
                        <input 
                            type="number" 
                            name="valor" 
                            value={formData.productDetail.valor} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('category')}:</label>
                        <input 
                            type="text" 
                            name="categoria"
                            value={formData.productDetail.categoria} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('subCategory')}: </label>
                        <input 
                            type="text" 
                            name="subcategoria" 
                            value={formData.productDetail.subcategoria} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('brand')}: </label>
                        <input 
                            type="text" 
                            name="marca" 
                            value={formData.productDetail.marca} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                <div className="addProduct--SizeAndQuantity">
                    {formData.products.map((product, index) => (
                        <div key={index}>
                            <label>{t('size')}: </label>
                            <input 
                                type="text" 
                                name="tamanho" 
                                value={product.tamanho} 
                                onChange={(e) => handleProductChange(index, e)} 
                                required 
                            />
                            <label>{t('amount')}: </label>
                            <input 
                                type="number" 
                                name="quantidade" 
                                value={product.quantidade} 
                                onChange={(e) => handleProductChange(index, e)} 
                                required 
                            />
                        </div>
                    ))}
                    {formData.products.length < 7 && (
                        <button type="button" onClick={addProductField}>+ {t('addProductField')}</button>
                    )}
                </div>
                <div className="addProduct--Images">
                    {formData.images.map((image, index) => (
                        <div key={index}>
                            <label>{t('image')}: </label>
                            <input 
                                type="text" 
                                value={image.imagem} 
                                onChange={(e) => handleImageChange(index, e)} 
                            />
                        </div>
                    ))}
                    {formData.images.length < 4 && (
                        <button type="button" onClick={addImageField}>+ {t('addImageField')}</button>
                    )}
                </div>
                <button type="submit">{t('adicionar')}</button>
            </form>
        </div>
    );
}
