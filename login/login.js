async function main() {
    let existingUser = localStorage.getItem('user');
    if (existingUser) {
        existingUser = JSON.parse(existingUser);
        console.log(`Already logged in as ${existingUser.user.discord.username}`);
        return;
    }

    const code = new URLSearchParams(window.location.search).get('code');

    const response = await fetch(`https://api.foundationxservers.com/login`, {
        method: 'POST',
        body: JSON.stringify({
            code,
            redirectUri: 'http://127.0.0.1:5500/login/',
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const data = await response.json();

    localStorage.setItem('user', JSON.stringify(data));

    console.log(`Logged in as ${data.user.discord.username}`);

    // Redirect to home page
}

main();
