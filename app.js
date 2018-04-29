$("#auth").click(auth)

function auth() {
    var redirect_url = "https://accounts.spotify.com/authorize";
    redirect_url += "?client_id=5c249e8331d248ca9b95ade12e7e0c4b";
    redirect_url += "&response_type=token";
    redirect_url += "&redirect_uri="+encodeURIComponent('http://virtual.gq/bpm-sort/index.html');
    redirect_url += "&state=todo";
    redirect_url += "&scope=user-read-email";

    window.location.replace(redirect_url);
}
