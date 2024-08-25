// // countdown
// function updateCountdown() {
//     const now = new Date();
//     const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
//     const timeDiff = nextMidnight - now;

//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//     document.getElementById('countdown').textContent =
//         `[ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ]`;
// }

// setInterval(updateCountdown, 1000);
// updateCountdown();

// // particles
// particlesJS("particles-js", {
//     "particles": {
//         "number": {
//             "value": 160,
//             "density": {
//                 "enable": true,
//                 "value_area": 800
//             }
//         },
//         "color": {
//             "value": "#ffffff"
//         },
//         "shape": {
//             "type": "circle",
//             "stroke": {
//                 "width": 0,
//                 "color": "#000000"
//             },
//             "polygon": {
//                 "nb_sides": 5
//             },
//             "image": {
//                 "src": "img/github.svg",
//                 "width": 100,
//                 "height": 100
//             }
//         },
//         "opacity": {
//             "value": 1,
//             "random": true,
//             "anim": {
//                 "enable": true,
//                 "speed": 1,
//                 "opacity_min": 0,
//                 "sync": false
//             }
//         },
//         "size": {
//             "value": 3,
//             "random": true,
//             "anim": {
//                 "enable": false,
//                 "speed": 4,
//                 "size_min": 0.3,
//                 "sync": false
//             }
//         },
//         "line_linked": {
//             "enable": false,
//             "distance": 150,
//             "color": "#ffffff",
//             "opacity": 0.4,
//             "width": 1
//         },
//         "move": {
//             "enable": true,
//             "speed": 1,
//             "direction": "none",
//             "random": true,
//             "straight": false,
//             "out_mode": "out",
//             "bounce": false,
//             "attract": {
//                 "enable": false,
//                 "rotateX": 600,
//                 "rotateY": 600
//             }
//         }
//     },
//     "interactivity": {
//         "detect_on": "canvas",
//         "events": {
//             "onhover": {
//                 "enable": false,
//                 "mode": "repulse"
//             },
//             "onclick": {
//                 "enable": false,
//                 "mode": "repulse"
//             },
//             "resize": true
//         },
//         "modes": {
//             "grab": {
//                 "distance": 400,
//                 "line_linked": {
//                     "opacity": 1
//                 }
//             },
//             "bubble": {
//                 "distance": 250,
//                 "size": 0,
//                 "duration": 2,
//                 "opacity": 0,
//                 "speed": 3
//             },
//             "repulse": {
//                 "distance": 400,
//                 "duration": 0.4
//             },
//             "push": {
//                 "particles_nb": 4
//             },
//             "remove": {
//                 "particles_nb": 2
//             }
//         }
//     },
//     "retina_detect": true
// });

// login/logout buttons
var logoutButtonNav = document.getElementById('logoutButtonNav');
var loginButtonNav = document.getElementById('loginButtonNav');
var loginWarning = document.getElementById('loginWarning');
var shopWrapper = document.getElementById('shopWrapper');
var mainShop = document.getElementById('mainShop');

let siteToken;
const user = localStorage.getItem('user');

if (user) {
    siteToken = JSON.parse(user).siteToken;
} else {
    siteToken = null;
}

if (siteToken === null) {
    //logged out
    logoutButtonNav.style.display = 'none';
    loginWarning.style.display = 'flex';
    shopWrapper.style.display = 'none';
    mainShop.style.display = 'none';

} else {
    //logged in

    const {id, avatar} = JSON.parse(user).user.discord;

    if (avatar !== null) {
        const pfp = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
        document.getElementById('logoutProfilePicture').src = pfp;
    } else {
        document.getElementById('logoutProfilePicture').src = "../default-pfp.png";
    }

    loginButtonNav.style.display = 'none';
    loginWarning.style.display = 'none';
    shopWrapper.style.display = 'flex';
    mainShop.style.display = 'flex';
}

// populating the shop
document.addEventListener('DOMContentLoaded', async () => {
    function preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    function createShopItem(id, name, usage, price, imgSrc, bgColor) {
        const itemWrapperBorder = document.createElement('div');
        itemWrapperBorder.className = 'item-wrapper-border';

        if (siteToken === null) {
            itemWrapperBorder.classList.add('shop-item-wrapper-border-disabled')
            itemWrapperBorder.title = 'You must be logged in to purchase items';
        }

        imgSrc = `/shop/imgs/${imgSrc}.png`;

        itemWrapperBorder.innerHTML = `
            <div class="item-wrapper ${siteToken ? '' : 'shop-item-disabled'}" style="background-color: ${bgColor};">
                <img src="${imgSrc}" alt="${name}" class="shop-item-img" draggable="false">
                <div class="item-info">
                    <span class="item-name">${name}</span>
                    <span class="item-usage">${usage}</span>
                </div>
                <span class="item-price-wrapper">
                    <svg width="13" height="13" viewBox="0 0 309 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_0_3)">
                        <path d="M0 22.05L122.73 120.92L79.55 209.55L150 143.64L301.14 269.78H37.5L0 22.05Z" fill="black"/>
                        <path d="M186.14 140.91L255.46 71.59L214.55 161.36L308.87 237.5L294.09 29.55L17.96 0L186.14 140.91Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_0_3">
                        <rect width="308.87" height="269.78" fill="black"/>
                        </clipPath>
                        </defs>
                    </svg>         
                    <span class="item-price">${price}</span>
                </span>
            </div>
        `;

        if (siteToken) {
            itemWrapperBorder.addEventListener('click', () => {
                showBuyConfirmation(id, name, price, imgSrc, price);
            });
        }


        return itemWrapperBorder;
    }

    function showBuyConfirmation(id, name, price, imgSrc, cost) {
        const buyConf = document.getElementById('buyConf');
        document.getElementById('confItemName').textContent = name;
        document.getElementById('confItemPrice').textContent = price;
        document.getElementById('confItemImage').src = imgSrc;

        document.getElementById('confItemName').setAttribute('x-item-id', id);
        document.getElementById('confItemName').setAttribute('x-item-cost', cost);

        buyConf.classList.add('active');
    }

    function populateShop(items) {
        const mainShop = document.getElementById('mainShop');
        const imageUrls = [];

        items.forEach(item => {
            const shopItem = createShopItem(item.id, item.title, item.subtitle, item.cost, item.image, item.bgColor);
            mainShop.appendChild(shopItem);
            imageUrls.push(item.imgSrc);
        });

        preloadImages(imageUrls);
    }

    function showNotification(name, imgSrc, duration = 5000) {
        const notificationContainer = document.getElementById('notificationContainer');
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const messageElem = document.createElement('span');
        messageElem.className = 'message';
        messageElem.textContent = `${name} purchased`;
        
        const imgElem = document.createElement('img');
        imgElem.src = imgSrc;
        imgElem.alt = name;
        imgElem.className = 'shop-item-img';
    
        
        notification.appendChild(imgElem);
        notification.appendChild(messageElem);
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.className = 'notification-fadein notification';
        }, 10);

        setTimeout(() => {
            notification.className = 'notification-fadeout notification';
        }, duration-500);

        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, duration);
    }

    const cancelButton = document.getElementById('cancelPurchaseButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            document.getElementById('buyConf').classList.remove('active');
        });
    }

    const confirmButton = document.getElementById('confirmPurchaseButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', async () => {
            const id = document.getElementById('confItemName').getAttribute('x-item-id');
            const cost = document.getElementById('confItemName').getAttribute('x-item-cost');

            document.getElementById('confirmPurchaseButton').classList.add('buy-conf-button-disabled')

            if (USER_BALANCE <= 0) {
                document.getElementById('confirmPurchaseButton').classList.remove('buy-conf-button-disabled')
            } else {
                await buyItem(id, cost);

                window.USER_BALANCE -= cost;
                window.updateUserBalanceDisplay();
    
                const confItemName = document.getElementById('confItemName').textContent;
                const confItemImage = document.getElementById('confItemImage').src;
                document.getElementById('buyConf').classList.remove('active');
                showNotification(confItemName, confItemImage);
                console.log(`Purchase made for item: ${confItemName}`);
            }
        });
    }

    const shopItemsRequest = await fetch('https://api.foundationxservers.com/economy/rewards');

    if (!shopItemsRequest.ok) {
        throw await shopItemsRequest.json();
    }

    const shopItems = await shopItemsRequest.json();

    populateShop(shopItems);
});

async function buyItem(id, cost) {
    if (!window.SITE_TOKEN) {
        throw new Error('Not logged in (no site token found)');
    }

    if (window.USER_BALANCE < cost) {
        throw new Error(`Insufficient balance (need ${cost}, have ${window.USER_BALANCE})`);
    }

    const req = await fetch('https://api.foundationxservers.com/economy/payouts', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${window.SITE_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify([id]),
    });

    if (!req.ok) {
        throw await req.json();
    }

    document.getElementById('confirmPurchaseButton').classList.remove('buy-conf-button-disabled')
    console.log(`Purchase successful`, await req.json());
}