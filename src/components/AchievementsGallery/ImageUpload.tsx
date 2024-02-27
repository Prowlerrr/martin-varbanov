import React, {useEffect, useState} from "react";
import {getDownloadURL, listAll, ref, uploadBytes,} from "firebase/storage";
import {storage} from "../../firebase";
import {v4} from "uuid";

interface ImageUploadProps {
    storageDir: string
}
const ImageUpload : React.FC<ImageUploadProps> = ({storageDir}) => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const storageRef = ref(storage, storageDir);

    const uploadFile = () => {
        if (imageUpload == null) return;
        // @ts-ignore
        const imageRef = ref(storage, storageDir + `/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // @ts-ignore
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };


    useEffect(() => {
        listAll(storageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    // @ts-ignore
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


    return (
        <div className="App">
            <input
                type="file"
                onChange={(event) => {
                    // @ts-ignore
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadFile}> Upload Image</button>
            {imageUrls.map((url) => {
                return <img src={url} />;
            })}
        </div>
    );
}

async function listSubDirectories(directory: string) {
    const storageRef = ref(storage, directory);

    const { items, prefixes } = await listAll(storageRef);

    return prefixes.map(prefix => prefix.name);
}

async function uploadFile(directory: string, file: File): Promise<string> {
    if (file == null) {
        return Promise.reject('File must not be null');
    }

    const imageRef = ref(storage, directory + `/${file.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, file);

    return await getDownloadURL(snapshot.ref);
}

export { listSubDirectories, uploadFile };

export default ImageUpload