import {dataHandler} from "./data_handler.js";


window.onload = () => {
    let marvelLogo = document.querySelector(".marvel");
    let studios = document.querySelector(".studios");
    let apiLogo = document.querySelector(".api");
    let mql = window.matchMedia('(max-width: 600px)');
    let intViewportWidth = window.innerWidth;
    if (intViewportWidth < 600) {
        resizeLogoToSmallScreens();
    }

    function resizeLogoToSmallScreens() {
        marvelLogo.innerText = "M";
        marvelLogo.style.fontSize = "3rem";
        studios.style.display = "none";
        apiLogo.style.display = "none";
    }

    function resizeLogoToBigScreens() {
        marvelLogo.innerText = "MARVEL";
        marvelLogo.style.fontSize = "5rem";
        studios.style.display = "inline-block";
        apiLogo.style.display = "block";
    }

    function responsiveLogoWatcher(event) {
        if (event.matches) {
            /* the viewport is 600 pixels wide or less */
            resizeLogoToSmallScreens();
        } else {
            /* the viewport is more than 600 pixels wide */
            resizeLogoToBigScreens();

        }
    }



    function loadFeaturedCards() {


        let promise1 = dataHandler.getFeaturedCards('/get-featured-comics')
        let promise2 = dataHandler.getFeaturedCards('/get-featured-movies')
        let promise3 = dataHandler.getFeaturedCards('/get-featured-creators')
        let promise4 = dataHandler.getFeaturedCards('/get-featured-tv-shows')
        let promise5 = dataHandler.getFeaturedCards('/get-featured-characters')
        Promise.all([promise1, promise2, promise3, promise4, promise5]).then((data) => {
            let featuredComics = data[0]
            let featuredMovies = data[1]
            let featuredCreators = data[2]
            let featuredTvShows = data[3]
            let featuredCharacters = data[4]
            createComicsFeaturedCards(featuredComics)
            createTvFeaturedCards(featuredTvShows)
            createMcuFeaturedCards(featuredMovies)
            createCreatorsFeaturedCards(featuredCreators)
            createCharactersFeaturedCards(featuredCharacters)

        })
    }

    function createComicsFeaturedCards(comics) {
        let comicsDropdownMenuCardContainer = document.querySelector("#comics-featured-container");
        for (let comic of comics) {
            comicsDropdownMenuCardContainer.insertAdjacentHTML('beforeend', `
         <a href="/comics/${comic.id}"<div class="mini-card">
        <img class="card-thumbnail card_small" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
        <div class="card-details">
            <p>${comic.title}</p>
            <p class="card-details-id">${comic.id}</p>
        </div>
        </div></a>`)
        }
    }

    function createMcuFeaturedCards(movies) {
        let mcuDropdownMenuCardContainer = document.querySelector("#mcu-featured-container");
        for (let movie of movies) {
            mcuDropdownMenuCardContainer.insertAdjacentHTML('beforeend', `
         <a href="/comics/${movie.id}"<div class="mini-card">
        <img class="card-thumbnail card_small" src="${movie.cover_url}" alt="${movie.title}">
        <div class="card-details">
            <p>${movie.title}</p>
            <p class="card-details-id">${movie.release_date}</p>
            <p class="card-details-id">${movie.saga}</p>
        </div>
        </div></a>`)
        }
    }

    function createTvFeaturedCards(shows) {

        let tvShowDropdownMenuCardContainer = document.querySelector("#tv-show-featured-container");
        for (let show of shows) {
            tvShowDropdownMenuCardContainer.insertAdjacentHTML('beforeend', `
         <a href="/tv/${show.id}"<div class="mini-card">
        <img class="card-thumbnail card_small" src="${show.cover_url}" alt="${show.title}">
        <div class="card-details">
            <p>${show.title}</p>
            <p class="card-details-id">${show.release_date}</p>
            <p class="card-details-id">
                <span>Seasons: ${show.number_seasons}</span>
                <span>Episodes: ${show.number_episodes}</span>
            </p>
        </div>
        </div></a>`)
        }
    }


    function createCreatorsFeaturedCards(creators) {
        let creatorDropdownMenuCardContainer = document.querySelector("#creators-featured-container");
        for (let creator of creators) {
                creatorDropdownMenuCardContainer.insertAdjacentHTML('beforeend', `
         <a href="/creator/${creator.id}"<div class="mini-card">
          <img class="card-thumbnail card_small" src="${creator.thumbnail.path}.${creator.thumbnail.extension}" alt="${creator.fullname}">
            <div class="card-details">
            <p>${creator.id}</p>
            <p class="card-details-id">
                <span>${creator.firstName}</span>
                <span>${creator.lastName}</span>
            </p>
        </div>
        </div></a>`)

    }
}
    function createCharactersFeaturedCards(featuredCharacters) {
         let characterDropdownMenuCardContainer = document.querySelector("#characters-featured-container");
        for (let character of featuredCharacters) {
                characterDropdownMenuCardContainer.insertAdjacentHTML('beforeend', `
         <a href="/creator/${character.id}"<div class="mini-card">
          <img class="card-thumbnail card_small" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <div class="card-details">
            <p>${character.name}</p>
            <p class="card-details-id">
                 <span>${character.comics.available} Comics</span>
                 <h5>${character.id}</h5>
            </p>
        </div>
        </div></a>`)

    }
    }

loadFeaturedCards();
mql.addEventListener('change', responsiveLogoWatcher);
}
