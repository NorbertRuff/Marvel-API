import {dataHandler} from "./data_handler.js";


const characterContainer = document.querySelector("#character_grid_container");
const url = "https://mcuapi.herokuapp.com/api/v1/movies";

const fetchMCUCharacters = () => {
    dataHandler._api_get(url, createCards);
}


const createCards = (movies) => {
    console.log(movies.data)
    for (let movie of movies.data) {
        characterContainer.insertAdjacentHTML('beforeend', `
            <article class="gradient-shadow">
            <div class="card card_details_container">
               <img src="${movie.cover_url}" alt="${movie.title}" class="card_img">
             
                <div class="descriptions">
                    <h2 class="card__title">${movie.title}</h2>
                    <p class="overview">${movie.overview}
                    </p>
            </div>
            </div>

            </article>
        `);
    }
}

fetchMCUCharacters();