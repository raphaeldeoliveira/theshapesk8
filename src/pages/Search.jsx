import React from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/global/LoadingSpinner";

export default function Search() {

    const { productname } = useParams()
    // pega esse product name e manda pra API

    // em vez de true tem que esperar a promisse virar um objeto quando da o fetch
    if (false) {
        return (
            <LoadingSpinner />
        )
    }
    else {
        return (
            <SearchPageGrid h1title={`Busca por: ${productname}`} />
        )
    }

}