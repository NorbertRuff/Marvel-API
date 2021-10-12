import {dataHandler} from "./data_handler.js";

let limit = 30;
let order = "-modified";
let offset = 0;
const LatestComicsUrl = `/get_latest_comics_data?offset=${offset}&order=${order}&limit=${limit}`;
const bestSellingComicsUrl = `/get_best_selling_comics_data?offset=${offset}&order=${order}&limit=${limit}`;

let latestContainer = document.querySelector("#latest_comics_container");
let bestSellingContainer = document.querySelector("#best_selling_comics_container");

const fetchNewestComics = () => {
    dataHandler._api_get_custom_container(LatestComicsUrl, createCards, latestContainer);
}

const fetchBestSellingComics = () => {
    dataHandler._api_get_custom_container(bestSellingComicsUrl, createCards, bestSellingContainer);
}


const createCards = (comics, container) => {

    console.log(comics.data.results)

    function getCreators(comic) {
        let creators = "" ;
        for (let creator of comic.creators.items){
            creators+= `<span>${creator.role}: </span><a href="/creator/${creator.name}"><span class="card-details-id">${creator.name}</span></a><br>`
        }
        return creators;
    }

    function getPrices(comic) {
        if(comic.prices[0].price !==0) {
           return `<span class="price">${comic.prices[0].price} $</span>`
        }else return "";

    }

    for (let comic of comics.data.results) {
        if (comic.thumbnail.path.slice(-9) !== "available") {
            container.insertAdjacentHTML('beforeend', `
            <article class="comic_card">
                 <a href="/comics/${comic.id}"<div class="mini-card">
                    <img class="card-thumbnail card_medium" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                    ${getPrices(comic)}
                    <div class="comic-card-details">
                        <p class="comic_title">${comic.title}</p>
                        <p class="comic_format">${comic.format}</p>
                        ${getCreators(comic)}
                    </div>
                    </div></a>
            </article>
        `);
        }
    }
    container.insertAdjacentHTML('beforeend', `  <div class="attributionHTML">  ${comics.attributionHTML}</div>`);

}
fetchNewestComics();
fetchBestSellingComics();