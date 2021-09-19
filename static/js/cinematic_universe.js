import {dataHandler} from "./data_handler.js";


const moviesContainer = document.querySelector("#movies_container");

const allMovies = "/get-all-movies";

const fetchMCUMovies = () => {
    dataHandler._api_get(allMovies, createCards);
}


const createCards = (movies) => {
    for (let movie of movies) {
        if (movie.cover_url!==null){
            moviesContainer.insertAdjacentHTML('beforeend', `
            <article class="gradient-shadow">
                <div class="card card_details_container">
                   <img src="${movie.cover_url}" alt="${movie.title}" class="card_img">
                    <div class="descriptions">
                        <h2 class="card__title">${movie.title}</h2>
                        <p class="overview">` +
                        (movie.overview !== null ? movie.overview : 'No info') +
                        `</p>                  
                    </div>
                </div>
            </article>
        `);
        }

    }
}

fetchMCUMovies();
