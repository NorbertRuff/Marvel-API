window.onload = () => {
    let marvelLogo = document.querySelector(".marvel");
    let studios = document.querySelector(".studios");
    let apiLogo = document.querySelector(".api");
    let dropdown = document.querySelector(".dropdown-content");
    let buttons = document.getElementsByClassName("menu_btn");

    for (let button of buttons) {
        button.addEventListener("mouseover", function () {
            dropdown.style.display = "inline-block";
        });
    }
    dropdown.addEventListener("mouseout", function () {
        dropdown.style.display = "none";
    });
    var mql = window.matchMedia('(max-width: 600px)');

    function screenTest(e) {
        if (e.matches) {
            /* the viewport is 600 pixels wide or less */
            marvelLogo.innerText = "M";
            marvelLogo.style.fontSize = "3rem";
            studios.style.display="none";
            apiLogo.style.display="none";
        } else {
            /* the viewport is more than 600 pixels wide */
            marvelLogo.innerText = "MARVEL";
            marvelLogo.style.fontSize = "5rem";
            studios.style.display="inline-block";
            apiLogo.style.display="block";

        }
    }

    mql.addEventListener('change', screenTest);


}
