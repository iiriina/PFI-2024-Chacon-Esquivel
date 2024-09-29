const urlApi = "http://localhost:4000/";
console.log("url",urlApi);

const urlWebServices = {
    //login:urlApi +"api/users/login",
    getComputadoras:urlApi + "api/computer-prediction/computer-prediction",
    getPredictions:urlApi + "api/prediction/prediction",
    getCelulares:urlApi + "api/cellphone_recommendations/cellphone-recommendations"

}

export default urlWebServices;