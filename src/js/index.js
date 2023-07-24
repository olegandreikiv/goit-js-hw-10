import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Report } from 'notiflix/build/notiflix-report-aio'
import { Loading } from 'notiflix/build/notiflix-loading-aio'


const selectContainer = document.querySelector(".breed-select")
const catCont = document.querySelector(".cat-info");
selectContainer.addEventListener("change", onSelect)

fetchBreeds()
.then(data => {selectContainer.innerHTML = createSelect(data);
selectContainer.style.visibility = "visible";
  new SlimSelect({
    select: ".breed-select",
  })
})
.finally(()=>Loading.remove())

function onSelect(e) {
    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => catCont.innerHTML = catsMarkup(data))
    .catch(err => Report.failure('Oops!', "Something went wrong! Try reloading the page!"))
    .finally(()=>Loading.remove())

}

function createSelect (arr){
    let options = arr.map(({ name, id }) => `<option value="${id}">${name}</option>`).join('');
    options = `<option value="">-- Select Breed --</option>` + options;
    return options;
    }




 function catsMarkup(arr) {
    if (arr.length === 0){
     Report.failure('Oops!', "Something went wrong! Try chosing another cat!")
     return " "
    } else {
     return arr.map(({url, breeds},)=>{
     const { origin, description, name, temperament } = breeds[0];
     return`<img class="cat-img" src="${url}" alt="${name}" width="400">
     <div class="cat-text"><h1 class="cat-name">${name}</h1>
     <p class="descr">${description}</p>
     <p class="temp">${temperament}</p>
     <p class="origin">${origin}</p></div>`}).join('')
    }
 }