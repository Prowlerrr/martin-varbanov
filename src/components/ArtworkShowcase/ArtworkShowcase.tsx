import React, { useEffect, useState, useRef } from 'react';
import './ArtworkShowcase.css';

declare let require: any;

const ArtworkShowcase: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [enlargedImage, setEnlargedImage] = useState<string>('');
    const enlargedEl = React.useRef<HTMLDivElement>(null);

    const handleGalleryEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setEnlargedImage('');
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', handleGalleryEscape, false);
        return () => {
            window.removeEventListener('keyup', handleGalleryEscape, false);
        };
    }, []);

    useEffect(() => {
        const importAll = (r: any) => r.keys().map(r);
        const imagesContext = require.context('../../../public/images/artwork', false, /\.(png|jpe?g|svg)$/i);
        const images = importAll(imagesContext);
        setImages(images);
    }, []);

    const handleImageClick = (image: string) => {
        setEnlargedImage(image);
    };

    const handleImageMouseLeave = (e: any) => {
        if (enlargedEl.current && !enlargedEl.current.contains(e.relatedTarget)) {
            setEnlargedImage('');
        }
    };

    return (
        <div>
            <h2>Галерия</h2>
            {
                enlargedImage &&
                <div onMouseLeave={handleImageMouseLeave} ref={enlargedEl}>
                    <img src={enlargedImage} className="enlargedArtwork" onClick={() => setEnlargedImage('')} alt="Enlarged Artwork" />
                </div>
            }
            <div className="image-gallery">
                {images.map((image: string, index: number) => (
                    <img key={index} src={image} className="artwork" onClick={() => handleImageClick(image)} alt="Artwork" />
                ))}
            </div>
        </div>
    );
};

export default ArtworkShowcase;