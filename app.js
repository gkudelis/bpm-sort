$(function() {
    qs = new URLSearchParams(window.location.hash.substring(1));
    if (qs.has('access_token')) {
        var access_token = qs.get('access_token');

        $("#playlists").show();
        $("#sort").show();

        get_playlists()
            .then(get_playlist_names)
            .then(handle_playlists);
    } else {
        $("#auth")
            .click(auth)
            .show();
    }

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

    function get_playlists() {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me/playlists',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });
    }

    function get_playlist_names(playlist_data) {
        var playlist_promises = playlist_data.items.map(function(playlist) {
            return $.ajax({
                url: playlist.href,
                headers: { 'Authorization': 'Bearer ' + access_token },
            }).then(function(playlist_details) {
                playlist.name = playlist_details.name;
                console.log(playlist);
                return playlist;
            });
        });
        return wait_for_promises(playlist_promises);
    }

    function handle_playlists(playlist_data) {
        console.log(playlist_data);
    }

    function wait_for_promises(promises) {
        return $.when.apply($, promises).then(collect_to_array);
    }

    function collect_to_array() { return Array.prototype.slice.call(arguments); }
});
