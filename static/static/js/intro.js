window.onload = () => {
    let animation_message = document.querySelector("#anim_message");
    let animation_percentage = document.querySelector("#loader_percentage");
    let loader_div = document.querySelector("#loader");
    let loader_logo = document.querySelector("#loader_logo");
    let audio = document.getElementById("audio");
    let counter = 0;

    function preloadImages(array) {
        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        let list = preloadImages.list;
        for (let i = 0; i < array.length; i++) {
            let img = new Image();
            img.onload = function () {
                let index = list.indexOf(this);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
            list.push(img);
            img.src = array[i];
        }
    }