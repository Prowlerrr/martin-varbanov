import React, {useEffect, useState} from "react";
import {getDownloadURL, listAll, ref, uploadBytes,} from "firebase/storage";
import {storage} from "../../firebase";
import {v4} from "uuid";

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