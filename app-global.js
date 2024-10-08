// navbar hiding function
var nav = document.getElementById('nav');
var prevScrollpos = window.pageYOffset;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.LOGIN_LINK = 'https://discord.com/oauth2/authorize?client_id=1156866965265203302&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Flogin%2F&scope=identify+connections'
} else {
    window.LOGIN_LINK =
        'https://discord.com/oauth2/authorize?client_id=1156866965265203302&response_type=code&redirect_uri=https%3A%2F%2Fnew.foundationxservers.com%2Flogin%2F&scope=identify+connections';
}


window.SITE_TOKEN = '';

window.USER_BALANCE = 0;

window.onscroll = function () {
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    if (burgerMenuButton.getAttribute('burger-menu') === 'false' && window.pageYOffset > 60) {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById('nav').style.top = '0';
            document.getElementById('nav').style.opacity = '1';
        } else {
            document.getElementById('nav').style.top = '-5rem';
            document.getElementById('nav').style.opacity = '0';
        }
        prevScrollpos = currentScrollPos;
    }
};

// preloader
window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');

    this.document.querySelectorAll('.discord-login-button').forEach((e) => (e.href = window.LOGIN_LINK));

    this.document.querySelectorAll('.discord-logout-button').forEach((e) => {
        e.addEventListener('click', async () => {
            if (!window.SITE_TOKEN) {
                window.alert('Already logged out.');
                return;
            }

            const response = await fetch('https://api.foundationxservers.com/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${window.SITE_TOKEN}`,
                },
            });

            localStorage.removeItem('user');

            window.SITE_TOKEN = '';
            window.USER_BALANCE = 0;

            if (!response.ok) {
                window.alert('Logout failed');
                console.log(await response.json());
            }
            
            window.location.reload();
        });
    });

    setTimeout(() => {
        preloader.style.scale = '1.1';
        preloader.style.pointerEvents = 'none';
        preloader.style.opacity = '0%';
        console.log('successfully loaded');

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2500);
    }, 500);

    const rawUser = this.localStorage.getItem('user');

    if (rawUser !== null) {
        const { user, siteToken} = JSON.parse(rawUser);
        window.SITE_TOKEN = siteToken;
        window.USER_BALANCE = user.economy.balance;
    }

    window.refetchUser();
});

window.updateUserBalanceDisplay = () => {
        var balanceAmountValue = document.getElementById('balanceAmountValue');
        balanceAmountValue.textContent = window.USER_BALANCE;
        
        
        const rawUser = this.localStorage.getItem('user');

        if (rawUser !== null) {
            const fullData = JSON.parse(rawUser);

            if (fullData.user.economy.balance !== window.USER_BALANCE) {
                fullData.user.economy.balance = window.USER_BALANCE;
                this.localStorage.setItem('user', JSON.stringify(fullData));
            }
        }
}

window.refetchUser = async () => {
    if (!window.SITE_TOKEN) {
        throw new Error('Cannot fetch current user without a token');
    }
    
    const response = await fetch('https://api.foundationxservers.com/users/@me', {
        headers: {
            Authorization: `Bearer ${window.SITE_TOKEN}`,
            Accept: 'application/json',
        }
    });
    
    if (!response.ok) {
        console.log(await response.json());
        localStorage.removeItem('user');
        window.alert('Session expired, logging out');
        window.location.reload();
        return;
    }

    const user = await response.json();

    localStorage.setItem('user', JSON.stringify({
        user,
        siteToken: window.SITE_TOKEN,
    }));

    window.USER_BALANCE = user.economy.balance;

    window.updateUserBalanceDisplay();
}

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

// function openMenuFunction() {
//     console.log('Menu opened');
//     var burgerMenuScreen = document.getElementById('burgerMenu');
//     var burgerIcon = document.getElementById('burgerIcon');
//     var crossIcon = document.getElementById('crossIcon');

//     burgerMenuScreen.style.pointerEvents = 'all';
//     burgerMenuScreen.style.scale = '1';
//     burgerMenuScreen.style.opacity = '1';

//     burgerIcon.style.scale = '0';
//     burgerIcon.style.opacity = '0';

//     crossIcon.style.scale = '1';
//     crossIcon.style.opacity = '1';

//     document.getElementById('nav').style.top = '0';
//     document.getElementById('nav').style.opacity = '1';
// }

// function closeMenuFunction() {
//     console.log('Menu closed');
//     var burgerMenuScreen = document.getElementById('burgerMenu');
//     var burgerIcon = document.getElementById('burgerIcon');
//     var crossIcon = document.getElementById('crossIcon');

//     burgerMenuScreen.style.pointerEvents = 'none';
//     burgerMenuScreen.style.scale = '1.2';
//     burgerMenuScreen.style.opacity = '0';

//     burgerIcon.style.scale = '1';
//     burgerIcon.style.opacity = '1';

//     crossIcon.style.scale = '0';
//     crossIcon.style.opacity = '0';
// }