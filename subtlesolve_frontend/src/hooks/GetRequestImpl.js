import { useState, useEffect } from 'react';
import axios from "axios";

function GetRequestImpl(jsonFilePath) {
    // const PUZZLE_API_BASE_URL = "http://localhost:8081/Getdailypuzzle";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios
        .get(jsonFilePath)
        .then((res) => {
            setData(res.data) 
            setLoading(false);})
        .catch(err=> setError(err))
    }, [jsonFilePath]);

    return { data, error, loading };
}

export default GetRequestImpl;