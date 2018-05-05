function app() {
    qs = new URLSearchParams(window.location.hash.substring(1));
    if (qs.has('access_token')) {
        var access_token = qs.get('access_token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

        ø("playlist").style.display = "initial";
        ø("sort").style.display = "initial";

        get_playlists()
            .then(get_playlist_names)
            .then(put_playlists_in_select);

        ø("sort").onclick = sort_playlist;
    } else {
        ø("auth").onclick = auth;
        ø("auth").display = "initial";
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
        return axios
            .get('https://api.spotify.com/v1/me/playlists')
            .then(function (response) {
                return response.data.items;
            }).catch(clog);
    }

    function get_playlist_names(playlists) {
        var playlist_promises = playlists.map(function(playlist) {
            return axios
                .get(playlist.href)
                .then(function (response) {
                    playlist.name = response.data.name;
                    return playlist;
                }).catch(clog);
        });
        return Promise.all(playlist_promises);
    }

    function put_playlists_in_select(playlists) {
        console.log(playlists);
        var content = playlists.reduce(function(acc, playlist) {
            return acc + "<option value='"+playlist.id+"'>"+playlist.name+"</option>";
        }, '');
        ø("playlist").innerHTML = content;
    }

    function sort_playlist() {
        console.log("Would sort playlist: " + ø("playlist").value);
    }

    function ø(id) { return document.getElementById(id); }
    function clog(stuff) { console.log(stuff); }
}
