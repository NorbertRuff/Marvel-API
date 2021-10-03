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
                counter = counter + 100 / array.length ;
                animation_percentage.innerHTML = counter + ' %';
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

 Promise.all(Array.from(document.images).map(img => {
        if (img.complete) {
            return Promise.resolve(img.naturalHeight !== 0);
        }
        return new Promise(resolve => {
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('error', () => resolve(false));
        });
    })).then(results => {
        if (results.every(res => res)) {
            // loading();
            if (audio.readyState > 3) {
                initAnimation();
            }

        } else {
            console.log('some images failed to load, all finished loading');
        }
    });

    function initAnimation() {
        delay(2000).then(() => {
            animation_percentage.style.animation = "blur-out 1.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
            loader_logo.style.animation = "heartbeat 1.5s ease-in-out infinite both";
            animation_message.innerHTML = "PLAY INTRO";
            loader_div.style.cursor = "pointer";
            loader_div.addEventListener("click", function anim() {
                loader_div.style.animation = "blur-out 1.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
                playAnimation();
                loader_div.removeEventListener("click", anim)
                delay(1000).then(() => window.addEventListener("click", function () {
                    window.location.href = "/home";
                }))
            });
        });
    }

    async function delay(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
    //
    // function loading() {
    //     const loading_anim = setInterval(() => {
    //         counter = counter + 1;
    //         animation_percentage.innerHTML = counter + ' %';
    //         if (counter === 100) {
    //             clearInterval(loading_anim);
    //         }
    //     }, 20);
    // }

    function playAnimation() {
        document.getElementById("marvel_logo").style.animation = "marvel 11s ease 2s forwards";
        document.getElementById("background").style.animation = "hideBackground 14s ease 0s forwards";
        let bg = document.getElementById("background");
        let bgNum = 0;
        audio.play();
        let marvelInterval = setInterval(function () {
            bgNum = (bgNum % 20) + 1;
            bg.style.backgroundImage = `url(/static/intro/img-${bgNum}.jpg)`;
        }, 100);
        setTimeout(function () {
            clearInterval(marvelInterval);
        }, 28000);
    }
}

