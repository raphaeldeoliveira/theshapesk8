import React from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import { useParams } from "react-router-dom";

export default function Search() {

    const { productname } = useParams()
    // pega esse product name e manda pra API

    return (
        <SearchPageGrid h1title={`Busca por: ${productname}`} />
    )
}