import {dataHandler} from "./data_handler.js";

const fetchFeaturedCharacters = () => {

    let limit = 100;
    let order = "-modified";
    let offset = 0;


    const allCharacters = `/get_characters_data?offset=${offset}&order=${order}&limit=${limit}`;

    const avangerIds = new Map();
    avangerIds.set("Thor", "1009664");
    avangerIds.set("Iron-man", "1009368");
    avangerIds.set("Loki", "1009407");
    avangerIds.set("Black Panther", "1009187");
    avangerIds.set("Black Widow", "1009189");
    avangerIds.set("Captain America", "1009220");
    avangerIds.set("Doctor Strange", "1009282");
    avangerIds.set("Hawkeye", "1009338");
    avangerIds.set("Hulk", "1009351");
    avangerIds.set("Drax", "1010735");
    avangerIds.set("Groot", "1010743");
    avangerIds.set("Mantis", "1011026");
    avangerIds.set("Gamora", "1010763");
    avangerIds.set("Nebula", "1010365");
    avangerIds.set("Rocket Raccoon", "1010744");
    avangerIds.set("Captain America (Sam Wilson)", "1017575");
    avangerIds.set("Spider-Man", "1017305");
    avangerIds.set("Star-Lord", "1010733");
    avangerIds.set("Thanos", "1009652");
    avangerIds.set("Vision", "1009697");
    avangerIds.set("War Machine (James Rhodes)", "1017834");
    avangerIds.set("Wong", "1009720");
    avangerIds.set("Winter Soldier", "1010740");


    for (let id of avangerIds.values()) {
        let url = `/get_avanger_data?charId=${id}`;
        dataHandler._api_get(url, createCard);
    }
}


const createCard = (character) => {
    console.log(character)
    let container = document.querySelector("#characters_container");
    container.insertAdjacentHTML('beforeend', `
            <article class="gradient-shadow">
                <div class="card card_details_container">
                   <img src="${character.thumbnail.path+"."+character.thumbnail.extension}" alt="${character.name}" class="card_img">
                    <div class="descriptions">
                        <h2 class="card__title">${character.name}</h2>
                        <p class="overview">` + (character.description !== null ? character.description : 'No info') +
                        `</p>                  
                    </div>
                </div>
            </article>
        `);
}

fetchFeaturedCharacters();