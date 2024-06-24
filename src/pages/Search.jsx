import React from "react";
import SearchPageGrid from "../components/global/SearchPageGrid";
import { useParams } from "react-router-dom";

export default function Search() {

    const { productname } = useParams()
    
    return <SearchPageGrid productname={productname} />

}