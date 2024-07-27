var title = document.getElementById('loginTitle');

let redirectUri;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    redirectUri = `http://localhost:${window.location.port}/login/`;
} else {
    redirectUri = 'https://new.foundationxservers.com/login/';
}

async function main() {
    let existingUser = localStorage.getItem('user');
    if (existingUser) {
        existingUser = JSON.parse(existingUser);
        console.log(`Already logged in as ${existingUser.user.discord.username}`);
        title.textContent = `Already logged in as ${existingUser.user.discord.username}`;
        window.location.replace('/shop');
        return;
    }

    const code = new URLSearchParams(window.location.search).get('code');

    const response = await fetch(`https://api.foundationxservers.com/login`, {
        method: 'POST',
        body: JSON.stringify({ code, redirectUri }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (!response.ok) throw await response.json();

    const data = await response.json();

    localStorage.setItem('user', JSON.stringify(data));

    console.log(`Logged in as ${data.user.discord.username}`);
    title.textContent = `Logged in as ${data.user.discord.username}`;
    window.location.replace('/shop');

    // Redirect to home page
}

main();
