import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { useTranslation } from 'react-i18next';
import "../../styles/pages/admin/editProduct.scss";

export default function EditProduct() {

    const { t } = useTranslation();
    
    const [loading, setLoading] = useState(true);
    const { productid } = useParams(); // Destructuring para obter productid diretamente
    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        descricao: "",
        valor: 0,
        categoria: "",
        subcategoria: "",
        marca: "",
        images: [],
        products: []  // Renomeado para manter consistência com a estrutura de dados
    });

    useEffect(() => {
        if (productid) {
            async function fetchProduct() {
                try {
                    setLoading(true);
                    const response = await fetch(`http://localhost:8080/mainProductTeste/${productid}`);
                    if (response.ok) {
                        const productData = await response.json();
                        console.log("productData");
                        console.log(productData);
                        setFormData({
                            id: productData.productDetail.id,
                            nome: productData.productDetail.nome,
                            descricao: productData.productDetail.descricao,
                            valor: productData.productDetail.valor,
                            categoria: productData.productDetail.categoria,
                            subcategoria: productData.productDetail.subcategoria,
                            marca: productData.productDetail.marca,
                            images: productData.images,
                            products: productData.products  // Ajustado para o campo products
                        });
                    } else {
                        console.error('Falha ao recuperar os dados do produto');
                    }
                } catch (error) {
                    console.error('Erro ao conectar à API:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchProduct();
        } else {
            setFormData({
                id: "",
                nome: "",
                descricao: "",
                valor: 0,
                categoria: "",
                subcategoria: "",
                marca: "",
                images: [],
                products: []
            });
            setLoading(false);
        }
    }, [productid]);      

    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        if (type === 'images') {
            const updatedImages = [...formData.images];
            updatedImages[index][name] = value;
            setFormData({ ...formData, images: updatedImages });
        } else if (type === 'products') {  // Renomeado para manter consistência
            const updatedProducts = [...formData.products];
            updatedProducts[index][name] = value;
            setFormData({ ...formData, products: updatedProducts });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/mainProductTeste`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productDetail: {
                        id: formData.id,
                        nome: formData.nome,
                        descricao: formData.descricao,
                        valor: formData.valor,
                        categoria: formData.categoria,
                        subcategoria: formData.subcategoria,
                        marca: formData.marca
                    },
                    products: formData.products.map(item => ({
                        id: item.id || null,  // Incluir id se necessário para atualização
                        tamanho: item.tamanho,
                        quantidade: item.quantidade
                    })),
                    images: formData.images.map(item => ({
                        id: item.id || null,  // Incluir id se necessário para atualização
                        imagem: item.imagem
                    }))
                })
            });
            if (response.ok) {
                alert(t('updateProductAlertMsg'));
                console.log('Produto atualizado com sucesso!');
            } else {
                alert(t('failedUpdatedMsg'));
                console.error('Falha ao atualizar o produto');
            }
        } catch (error) {
            console.error('Erro ao conectar à API:', error);
            alert(t('failedUpdatedMsg'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner verticalsize="500" horizontalsize="800" />;
    } else {
        return (
            <div className="product__edit">
                <h1>{t('editProduct')}</h1>
                <form className="product__edit__container" onSubmit={handleSubmit}>
                    <div className="product__edit__details">
                        <label>
                            {t('name')}:
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {t('descricao')}:
                            <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {t('valor')}:
                            <input type="number" name="valor" value={formData.valor} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {t('categoria')}:
                            <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {t('subcategoria')}:
                            <input type="text" name="subcategoria" value={formData.subcategoria} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {t('marca')}:
                            <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                        </label>
                        <br />
                    </div>
                    <div className="product__edit__images">
                        {formData.images.map((item, index) => (
                            <div key={index}>
                                <label>
                                    {t('imagem')} {index + 1}:
                                    <input type="text" name="imagem" value={item.imagem} onChange={(e) => handleChange(e, index, 'images')} />
                                </label>
                                <br />
                            </div>
                        ))}
                    </div>
                    <div className="product__edit__quantity-and-size">
                        {formData.products.map((item, index) => (
                            <div key={index}>
                                <label>
                                    {t('tamanho')} {index + 1}:
                                    <input type="text" name="tamanho" value={item.tamanho} onChange={(e) => handleChange(e, index, 'products')} />
                                </label>
                                <br />
                                <label>
                                    {t('quantidade')} {index + 1}:
                                    <input type="number" name="quantidade" value={item.quantidade} onChange={(e) => handleChange(e, index, 'products')} />
                                </label>
                                <br />
                            </div>
                        ))}
                    </div>
                    <button type="submit">{t('updateProduct')}</button>
                </form>
            </div>
        );
    }    
}
