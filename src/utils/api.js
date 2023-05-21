
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_TOKEN;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_KEY,
    }
};


export const fetchDataFromApi = async (url) => {
    try{
        const data = fetch(BASE_URL+url, options)
            .then(response => response.json())
        return data;
    }
    catch(err){
        return err;
    }
};