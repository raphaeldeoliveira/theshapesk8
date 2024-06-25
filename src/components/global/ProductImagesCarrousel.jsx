import React, { useState, useEffect, useCallback } from "react";
import "../../styles/pages/product/productImagesCarrousel.scss";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ProductImagesCarrousel(props) {

    const [carrouselPosition, setCarrouselPosition] = useState(0)

    const convertScrollX = useCallback(() => {
        return carrouselPosition * 26
    }, [carrouselPosition])

    useEffect(() => {
        convertScrollX()
    }, [convertScrollX, carrouselPosition])

    function moveRight() {
        setCarrouselPosition(prevPosition => prevPosition === props.images.length - 1 ? 0 : prevPosition + 1);
    }

    function moveLeft() {
        setCarrouselPosition(prevPosition => prevPosition === 0 ? props.images.length -1 : prevPosition - 1);
    }

    return (
        <div className="product-images-carrousel__container">
            <div className="images-carrousel__select-division">
                {props.images.map((item, index) => (
                    <img 
                        style={{
                            border: carrouselPosition === index ? "2px solid #ff9800" : "",
                            padding: carrouselPosition === index ? "3px" : "",
                        }}
                        key={index} 
                        src={item.imagem} 
                        alt={`Imagem ${index}`} 
                        onClick={() => setCarrouselPosition(index)}
                    />
                ))}
            </div>
            <div className="images-carrousel__main-image__container">
                <div className="images-carrousel__main-image__carrousel">
                    <div className="banner__arrow__container">
                        <FaArrowAltCircleLeft 
                            onClick={moveLeft}
                            className="banner__arrow--left"
                            style={{ display: props.images.length === 1 ? "none" : "" }}
                        />
                    </div>
                    <div 
                        className="banner__carrousel__internal"
                        style={{
                            transform: `translateX(-${convertScrollX()}vw)`
                        }}
                    >
                        {props.images.map((item) => {
                            return <img 
                                src={item.imagem}
                                alt=""
                            />
                        })}
                    </div>
                    <div className="banner__arrow__container">
                        <FaArrowAltCircleRight 
                            onClick={moveRight}
                            className="banner__arrow--right"
                            style={{ display: props.images.length === 1 ? "none" : "" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}