import axios from "axios";

const locationApiKey = "da292268e3mshf17b76677b42da4p10f5ffjsnb784a7b645e2";

export default axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    params: {limit: '10'},
    headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': locationApiKey
    }
})