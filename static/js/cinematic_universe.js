import {dataHandler} from "./data_handler.js";


const moviesContainer = document.querySelector("#movies_container");
const featuredContainer = document.querySelector("#featured_movies_container");

const allMovies = "/get_mcu_movies";
const featured = "/get_featured_movies";

const fetchMCUMovies = () => {
    dataHandler._api_get(allMovies, createCards);
}

const fetchFeaturedMovies = () => {
    dataHandler._api_get(featured, createFeaturedCards);
}

function createFeaturedCards(movies) {
     for (let movie of movies) {
        if (movie.cover_url!==null){
            featuredContainer.insertAdjacentHTML('beforeend', `
            <article class="gradient-shadow">
                <div class="featured_card card_details_container">
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
fetchFeaturedMovies();
fetchMCUMovies();
