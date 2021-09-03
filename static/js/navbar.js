window.onload = () => {
    let dropdown = document.querySelector(".dropdown-content");
    let buttons = document.getElementsByClassName("menu_btn");
    for (let button of buttons) {
        button.addEventListener("mouseover", function () {
			dropdown.style.display="inline-block";
        });
    }
    dropdown.addEventListener("mouseout", function () {
			dropdown.style.display="none";
        });
}
