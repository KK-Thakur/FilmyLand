import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
//using api key
/*
const apiKey = "?api_key=a75effcad62e97633f45daeb32bfffca"
export const fetchDataFromApi = async (url) => {
    try {
        const resp=await fetch(BASE_URL+ url + apiKey);
        const data=await resp.json();
        // const {data} = await axios.get(BASE_URL + url + apiKey);
        return data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}
*/
//using token

const TMDB_TOKEN=import.meta.env.VITE_APP_TMDB_TOKEN;
const headers={
    Authorization: "Bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url,{headers,params});
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

