
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;


export const fetchDataFromApi = async (url) => {
    try{
        const data = fetch(BASE_URL+url+"?api_key="+API_KEY)
            .then(response => response.json())
        return data;
    }
    catch(err){
        return err;
    }
};