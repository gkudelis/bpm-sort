$(function() {
    function auth() {
        console.log("starting auth");

        var redirect_url = "https://accounts.spotify.com/authorize";
        redirect_url += "?client_id=5c249e8331d248ca9b95ade12e7e0c4b";
        redirect_url += "&response_type=token";
        redirect_url += "&redirect_uri="+encodeURIComponent(window.location.href);
        redirect_url += "&state=todo";
        redirect_url += "&scope=user-read-email";

        window.location.replace(redirect_url);
    }

    function handle_user_profile(response) {
        console.log(response);
    }

    qs = new URLSearchParams(window.location.hash.substring(1));
    if (qs.has('access_token')) {
        var access_token = qs.get('access_token');
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            success: handle_user_profile
        });
    } else {
        $("#auth")
            .click(auth)
            .show();
    }
});
