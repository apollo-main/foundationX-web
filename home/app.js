// login/logout buttons
var logoutButtonNav = document.getElementById('logoutButtonNav');
var loginButtonNav = document.getElementById('loginButtonNav');

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
}