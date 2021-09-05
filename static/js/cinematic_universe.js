import {dataHandler} from "./data_handler.js";


const characterContainer = document.querySelector("#character_grid_container");
const url = "/get_mcu_movies";

const fetchMCUCharacters = () => {
    dataHandler._api_get(url, createCards);
}


const createCards = (movies) => {
    for (let movie of movies) {
        if (movie.cover_url!==null){
            characterContainer.insertAdjacentHTML('beforeend', `
            <article class="gradient-shadow">
                <div class="card card_details_container">
                   <img src="${movie.cover_url}" alt="${movie.title}" class="card_img">
                    <div class="descriptions">
                        <h2 class="card__title">${movie.title}</h2>
                        <p className = "overview">` +
                        (movie.overview !== null ? movie.overview : 'No info') +
                        `</p>                  
                    </div>
                </div>
            </article>
        `);
        }

    }
}

fetchMCUCharacters();