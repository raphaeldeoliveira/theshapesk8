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
        tamanhoCalçado: "",
        quantidade: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'valor' ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataWithNumber = {
                ...formData,
                valor: parseFloat(formData.valor),
                imagens: images
            };
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithNumber)
            });
    
            if (!response.ok) {
                throw new Error('Falha ao cadastrar produto');
            }
    
            alert(t('registeredProductSucefully'));
            setFormData({
                nome: "",
                descricao: "",
                imagem: "",
                valor: 0,
                tamanho: ""
            });
            setImages([]);
        } catch (error) {
            alert(t('registerError'));
        }
    };
    
    return (
        <div className="add__product">
            <h1>{t('addProduct2')}</h1>
            <div className="addProduct__container">
                <ImageUploader 
                    images={images}
                    setImages={setImages}
                    onImagesUploaded={(uploadedImages) => setImages(uploadedImages)}
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
                            name="tamanho"
                            placeholder={t('flannel')}
                            value={formData.tamanho} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('subCategory')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('roupas')}
                            name="tamanho" 
                            value={formData.tamanho} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('brand')}: </label>
                        <input 
                            type="text" 
                            placeholder="Spitfire"
                            name="tamanho" 
                            value={formData.tamanho} 
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
                            type="text" 
                            placeholder="17"
                            name="tamanho" 
                            value={formData.tamanho} 
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
