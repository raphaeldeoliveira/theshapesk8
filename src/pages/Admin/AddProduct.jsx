import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import ImageUploader from "./ImageUploader";

export default function AddProduct() {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        valor: 55.32,
        categoria: "",
        subCategoria: "",
        marca: "",
        tamanho: "",
        quantidade: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageUpload = async (files) => {
        const formData = new FormData();
        
        Array.from(files).forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        
        try {
            const response = await fetch('http://localhost:8080/mainProductTeste/create', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload images');
            }
            
            const data = await response.json();
            // Handle response as needed (e.g., update state)
            console.log('Uploaded images:', data);
            
            // Atualiza o estado das imagens com as URLs ou outros dados retornados
            setImages(data.urls); // Supondo que o servidor retorna as URLs das imagens
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Preparar dados para enviar
            const formDataToSend = new FormData();

            // Montar a estrutura de productDetail
            const productDetail = {
                nome: formData.nome,
                descricao: formData.descricao,
                valor: parseFloat(formData.valor),
                categoria: formData.categoria,
                subCategoria: formData.subCategoria,
                marca: formData.marca
            };

            console.log("form.data")
            console.log(formData)

            // Adicionar productDetail ao FormDataToSend
            formDataToSend.append('productDetail', JSON.stringify(productDetail));

            // Montar a estrutura de products (assumindo apenas um produto por enquanto)
            const product = {
                tamanho: formData.tamanho,
                quantidade: parseInt(formData.quantidade),
                productDetail: {
                    id: 1 // Supondo que o ID do productDetail já exista ou seja gerado pelo backend
                }
            };

            // Adicionar product ao FormDataToSend
            formDataToSend.append('products', JSON.stringify([product]));

            // Adicionar imagens ao FormDataToSend
            images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });

            // Enviar requisição para o endpoint da API
            const response = await fetch('http://localhost:8080/mainProductTeste', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar produto');
            }

            // Limpar formulário e imagens após o sucesso
            alert(t('registeredProductSucefully'));
            setFormData({
                nome: "",
                descricao: "",
                valor: 0,
                categoria: "",
                subCategoria: "",
                marca: "",
                tamanho: "",
                quantidade: ""
            });
            setImages([]);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert(t('registerError'));
        }
    };

    return (
        <div className="add__product">
            <h1>{t('addProduct2')}</h1>
            <div className="addProduct__container">
                <ImageUploader
                    images={images}
                    setImages={handleImageUpload}
                    onImagesUploaded={setImages} // Certifique-se de passar a função correta aqui
                />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('name')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('namePlaceholder')}
                            name="nome" 
                            value={formData.nome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('description')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('descriptionPlaceholder')} 
                            name="descricao" 
                            value={formData.descricao} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('valor')}:</label>
                        <input 
                            type="number" 
                            name="valor" 
                            value={formData.valor} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('category')}:</label>
                        <input 
                            type="text" 
                            name="categoria"
                            placeholder={t('flannel')}
                            value={formData.categoria} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('subCategory')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('roupas')}
                            name="subCategoria" 
                            value={formData.subCategoria} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('brand')}: </label>
                        <input 
                            type="text" 
                            placeholder="Spitfire"
                            name="marca" 
                            value={formData.marca} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="separador">
                        <label>{t('size')}: </label>
                        <input 
                            type="text" 
                            placeholder="41"
                            name="tamanho" 
                            value={formData.tamanho} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('amount')}: </label>
                        <input 
                            type="number" 
                            placeholder="17"
                            name="quantidade" 
                            value={formData.quantidade} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">{t('adicionar')}</button>
                </form>
            </div>
        </div>
    );
}
