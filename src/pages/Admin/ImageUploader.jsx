import React from 'react';
import { useDropzone } from 'react-dropzone';
import { RiDragDropLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

const ImageUploader = ({ images, setImages, onImagesUploaded }) => {
    const { t } = useTranslation();

    const onDrop = (acceptedFiles) => {
        const remainingSlots = 4 - images.length;
        const filesToAdd = acceptedFiles.slice(0, remainingSlots);
        const newImages = [...images, ...filesToAdd];
        setImages(newImages);
        onImagesUploaded(newImages);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: 'image/*',
        multiple: true,
        disabled: images.length >= 4
    });

    const renderEmptySlots = () => {
        const totalSlots = 4;
        const filledSlots = images.length;
        const emptySlots = totalSlots - filledSlots;

        const emptyDivs = [];

        for (let i = 0; i < emptySlots; i++) {
            emptyDivs.push(<div key={filledSlots + i} className="image-not-load"></div>);
        }

        return emptyDivs;
    };

    return (
        <div className="addProduct__imagem-uploader">
            <div
                {...getRootProps()}
                className={`drag-and-drop__container ${isDragActive ? 'dragging' : ''}`}
                style={{ cursor: images.length >= 4 ? 'not-allowed' : 'pointer' }}
            >
                <input {...getInputProps()} />
                {images.length === 0 && (
                    <>
                        <RiDragDropLine className="drag-and-drop__icon" />
                        <p>{t('dragAndDropMessage')}</p>
                    </>
                )}
                <div className="drag-and-drop__images-minuature">
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`uploaded preview ${index}`}
                            />
                        </div>
                    ))}
                    {renderEmptySlots()}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
