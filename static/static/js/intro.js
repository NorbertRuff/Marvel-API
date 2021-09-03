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


    preloadImages(["/static/intro/img-1.jpg",
        "/static/intro/img-2.jpg",
        "/static/intro/img-3.jpg",
        "/static/intro/img-4.jpg",
        "/static/intro/img-5.jpg",
        "/static/intro/img-6.jpg",
        "/static/intro/img-7.jpg",
        "/static/intro/img-8.jpg",
        "/static/intro/img-9.jpg",
        "/static/intro/img-10.jpg",
        "/static/intro/img-11.jpg",
        "/static/intro/img-12.jpg",
        "/static/intro/img-13.jpg",
        "/static/intro/img-14.jpg",
        "/static/intro/img-15.jpg",
        "/static/intro/img-16.jpg",
        "/static/intro/img-17.jpg",
        "/static/intro/img-18.jpg",
        "/static/intro/img-19.jpg",
        "/static/intro/img-20.jpg"]);

 }