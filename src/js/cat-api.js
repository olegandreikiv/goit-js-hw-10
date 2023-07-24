// const API_KEY = 'live_9WnopwNPu3WmqazzM9fAS8v0TqL7wbT7hKvHN1rLPdk4kTmhaysx44BgGkeZDyvY'; 
const BASE_URL = "https://api.thecatapi.com/v1";
const END_POINT ="/breeds";
import axios from "axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio'
axios.defaults.headers.common["x-api-key"] = "live_9WnopwNPu3WmqazzM9fAS8v0TqL7wbT7hKvHN1rLPdk4kTmhaysx44BgGkeZDyvY";



function fetchBreeds(){
  Loading.arrows()
    return axios.get(`${BASE_URL}${END_POINT}`)
     .then(response =>{
      if(response.status !== 200) {
  throw new Error (response.data)
      }
      return response.data
  })
  }

  function fetchCatByBreed(breedId){
    Loading.arrows()
    const SEARCH = `/images/search?breed_ids=${breedId}`
    return axios.get(`${BASE_URL}${SEARCH}`)
     .then(response =>{
      if(response.status !== 200) {
        throw new Error (response.data )
      }
      return response.data})
  }


  export {fetchBreeds, fetchCatByBreed};