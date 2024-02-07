import React, { useEffect, useState } from 'react';

// @ts-ignore
declare let require: any;

const ArtworkShowcase: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // TypeScript doesn't know about require.context, therefore we use @ts-ignore
        // @ts-ignore
        const importAll = (r: any) => r.keys().map(r);
        const imagesContext = require.context('../../../public/images/artwork', false, /\.(png|jpe?g|svg)$/i);
        const images = importAll(imagesContext);
        setImages(images);
        // Disclaimer: the relative path to your images directory may vary
    }, []);

    return (
        <div>
            <h2>Галерия</h2>
            {images.map((image: string, index: number) => (
                <img key={index} src={image} className="artwork" alt="Artwork" />
            ))}
        </div>
    );
};

export default ArtworkShowcase;