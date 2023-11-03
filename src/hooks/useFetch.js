import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(null);
        setLoading(true);
        setError(null);

        fetchDataFromApi(url)
            .then((res)=>{
                setData(res);
                setLoading(false);
            })
            .catch((err)=>{
                setError("Something went wrong!");
            })
    }, [url]);
    return {data,loading,error};
}

export default useFetch