import React, { useEffect, useState } from 'react'
import { request } from '../api';

export const useFetch = (endpoint) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true)
        request
            .get(endpoint)
            .then(res => setData(res.data?.products))
            .catch(err => setError(err.response.data))
            .finally(() => setLoading(false))
    },[])
    console.log(data)
  return {data, error, loading}
}
