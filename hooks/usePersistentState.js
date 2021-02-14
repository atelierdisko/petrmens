import {useEffect, useState} from "react";

const usePersistentState = (key, defaultValue, storage = "local") => {

    if (typeof window === "undefined") {
        return [null, null]
    }

    const storageApi = storage === "locale" ? localStorage : sessionStorage;

    const [state, setState] = useState(
        JSON.parse(storageApi.getItem(key)) || defaultValue
    );

    useEffect(() => {
        storageApi.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export default usePersistentState;
