import axios from "axios";
import {useCallback, useContext, useState} from "react";
import {UserContext} from "../context/UserContext";

const baseURL = process.env.REACT_APP_API_BACKEND;
const timeout = Number(process.env.REACT_APP_TIMEOUT);

const corsUrl = '*'

const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': corsUrl,
        'Accept': 'application/json'
    }
});

export const useHttpClient = <T>() => {
    const userContext = useContext(UserContext);
    const [ loading, setLoading ] = useState<string[]>([]);
    const [ error, setError ] = useState<string | undefined>();

    const removeUrl = (array: string[], url: string) => {
        const idx = array.findIndex( item => item === url );
        array.splice( idx, 1 );
        return [...array];
    }

    const handleCatch = (err: any, reject: any, url: string) => {
            setLoading( data => removeUrl( data, url ) );
            reject(err.response.data);
            setError(err.response.data.message);
    }

    const httpGet = useCallback( (url: string): Promise<T | T[]> => {
        return new Promise<T>( (resolve, reject) => {
            setLoading( data => [...data, url] );

            const options = userContext ? {headers: {'Authorization': `Bearer ${userContext.token}`}} : {};
            instance.get(url, options)
                .then( (response: any) => {
                    setLoading( data => removeUrl( data, url ) );
                    resolve(response.data);
                } )
                .catch((err) => handleCatch(err, reject, url))
        } );
    }, [ setLoading, setError, userContext ] );

    const httpPost = useCallback( (url: string, body: T): Promise<T> => {
        return new Promise<T>( (resolve, reject) => {
            setLoading( data => [...data, url] );

            const options = userContext ? {headers: {'Authorization': `Bearer ${userContext.token}`}} : {};
            instance.post(url, body, options)
                .then( (response: any) => {
                    setLoading( data => removeUrl( data, url ) );
                    resolve(response.data as T);
                } )
                .catch((err) => handleCatch(err, reject, url))
        } );
    }, [ setLoading, setError, userContext ] );

    const httpDelete = useCallback( (url: string): Promise<T> => {
        return new Promise<T>( (resolve, reject) => {
            setLoading( data => [...data, url] );

            const options = userContext ? {headers: {'Authorization': `Bearer ${userContext.token}`}} : {};
            instance.delete(url, options)
                .then( (response: any) => {
                    setLoading( data => removeUrl( data, url ) );
                    resolve(response.data as T);
                } )
                .catch((err) => handleCatch(err, reject, url))
        } );
    }, [ setLoading, setError, userContext ] );

    const httpPut = useCallback( (url: string, body: T): Promise<T> => {
        return new Promise<T>( (resolve, reject) => {
            setLoading( data => [...data, url] );

            const options = userContext ? {headers: {'Authorization': `Bearer ${userContext.token}`}} : {};
            instance.put(url, body, options)
                .then( (response: any) => {
                    setLoading( data => removeUrl( data, url ) );
                    resolve(response.data as T);
                } )
                .catch((err) => handleCatch(err, reject, url))
        } );
    }, [ setLoading, setError, userContext ] );

    return { httpGet, httpPost, httpPut, httpDelete, isLoading: loading.length > 0, error };
}