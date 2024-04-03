import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/global/LoadingSpinner";

export default function EditProduct() {
    
    const [loading, setLoading] = useState(true)
    const { productId } = useParams();
    console.log("productId")
    console.log(productId)

    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        imagem: "",
        valor: 0,
        tamanho: ""
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/${productId}`);
                if (response.ok) {
                    const productData = await response.json();
                    setFormData({
                        nome: productData.nome,
                        descricao: productData.descricao,
                        imagem: productData.imagem,
                        valor: productData.valor,
                        tamanho: productData.tamanho
                    });
                } else {
                    console.error('Falha ao recuperar os dados do produto');
                }
            } catch (error) {
                console.error('Erro ao conectar à API:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await fetch(`https://e-commerce-prod.onrender.com/api/produtos/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Produto atualizado com sucesso!');
                alert('Produto atualizado com sucesso!')
            } else {
                console.error('Falha ao atualizar o produto');
                alert('Falha ao atualizar o produto')
            }
        } catch (error) {
            console.error('Erro ao conectar à API:', error);
        } finally {
            setLoading(false)
        }
    };

    if (loading) {
        return <LoadingSpinner verticalsize="500" horizontalsize="800" />
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Descrição:
                    <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Imagem:
                    <input type="text" name="imagem" value={formData.imagem} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Valor:
                    <input type="number" name="valor" value={formData.valor} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Tamanho:
                    <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Atualizar Produto</button>
            </form>
        );
    }

    
}
