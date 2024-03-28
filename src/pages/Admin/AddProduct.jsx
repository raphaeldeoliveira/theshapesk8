import React, { useState } from "react";

export default function AddProduct() {

    // não consegui passar os dados corretamente pro endpoint
    const [formData, setFormData] = useState({
        nome: "",
        imagem: "",
        valor: 0,
        tamanho: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'valor' ? parseFloat(value) : value; // Converter para número se o campo for 'valor'
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
                valor: parseFloat(formData.valor)
            };
    
            console.log(formDataWithNumber);
            const response = await fetch('https://e-commerce-prod.onrender.com/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithNumber)
            });
    
            if (!response.ok) {
                throw new Error('Falha ao cadastrar produto');
            }
    
            // Se chegou aqui, o produto foi cadastrado com sucesso
            alert('Produto cadastrado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                nome: "",
                imagem: "",
                valor: 0,
                tamanho: ""
            });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Verifique os campos e tente novamente.');
        }
    };
    

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    name="nome" 
                    value={formData.nome} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Imagem" 
                    name="imagem" 
                    value={formData.imagem} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Valor" 
                    name="valor" 
                    value={formData.valor} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Tamanho" 
                    name="tamanho" 
                    value={formData.tamanho} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}