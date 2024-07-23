// navbar hiding function
var nav = document.getElementById('nav')
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    if (burgerMenuButton.getAttribute('burger-menu') === 'false') {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav").style.top = "0";
            document.getElementById("nav").style.opacity = "1";
        } else {
            document.getElementById("nav").style.top = "-5rem";
            document.getElementById("nav").style.opacity = "0";
        }
        prevScrollpos = currentScrollPos;
    }
}

// preloader
window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader')

    setTimeout(() => {
        preloader.style.scale = '1.1'
        preloader.style.pointerEvents = 'none'
        preloader.style.opacity = '0%';
        console.log("successfully loaded")

        setTimeout(() => {
            preloader.style.display = 'none'
        }, 2500);
    }, 500);
})

function toggleBurgerMenu() {
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    const currentState = burgerMenuButton.getAttribute('burger-menu') === 'true';
    const newState = !currentState;
    burgerMenuButton.setAttribute('burger-menu', newState);

    if (newState) {
        openMenuFunction();
    } else {
        closeMenuFunction();
    }
}

function openMenuFunction() {
    console.log('Menu opened');
    var burgerMenuScreen = document.getElementById('burgerMenu')
    var burgerIcon = document.getElementById('burgerIcon')
    var crossIcon = document.getElementById('crossIcon')

    burgerMenuScreen.style.pointerEvents='all';
    burgerMenuScreen.style.scale='1';
    burgerMenuScreen.style.opacity='1';

    burgerIcon.style.scale='0';
    burgerIcon.style.opacity='0';

    crossIcon.style.scale='1';
    crossIcon.style.opacity='1';

    document.getElementById("nav").style.top = "0";
    document.getElementById("nav").style.opacity = "1";
}

function closeMenuFunction() {
    console.log('Menu closed');
    var burgerMenuScreen = document.getElementById('burgerMenu')
    var burgerIcon = document.getElementById('burgerIcon')
    var crossIcon = document.getElementById('crossIcon')

    burgerMenuScreen.style.pointerEvents='none';
    burgerMenuScreen.style.scale='1.2';
    burgerMenuScreen.style.opacity='0';

    burgerIcon.style.scale='1';
    burgerIcon.style.opacity='1';

    crossIcon.style.scale='0';
    crossIcon.style.opacity='0';
}