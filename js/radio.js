/**
 * ES6 Fetch for player feed
 *
 * @param  xml format, iterator
 * @return  player feed
 */


async function fetchPlaylistSong( xml, i ) {

    try {
        const fetchPlaylist = await fetch( 'https://streamdb6web.securenetsystems.net/player_status_update/WMUV_history_rss.xml' )

        if ( !fetchPlaylist.ok ) {
            throw new Error( `HTTP error: ${fetchPlaylist.status}` );
        }

        const data = await fetchPlaylist.text();
        const xml = await (new window.DOMParser()).parseFromString( data, "text/xml" )

        console.log( xml );
        x = xml.getElementsByTagName( "channel" );
        console.log( x );

        if ( xml.getElementsByTagName( 'channel' )[0].children[5].childNodes[1].innerHTML.length !== 0 ) {
            xTitle = xml.getElementsByTagName( 'channel' )[0].children[5].childNodes[1].innerHTML
        } else xTitle = "not Found";
        console.log( xTitle )

        if ( xml.getElementsByTagName( 'channel' )[0].children[5].children[3].innerHTML.length !== 0 ) {
            xArtist = xml.getElementsByTagName( 'channel' )[0].children[5].children[3].innerHTML
        } else xArtist = "not Found";
        console.log( xArtist )

        if ( xml.getElementsByTagName( 'channel' )[0].children[5].childNodes[9].outerHTML.length !== 0 ) {
            xCover = xml.getElementsByTagNameNS( 'http://search.yahoo.com/mrss/', 'thumbnail' )[0].attributes[0].nodeValue
        } else xCover = "not Found";
        console.log( xCover )

        document.getElementById( "showPlaylist" ).innerHTML =
            "<a href='https://ilovethepromise.com/on-air/listen-live/'><div class='nowplaying'><h5>Now Playing</h5><div class='playlist-song'>Song: " +
            xTitle +
            "</div><div class='playlist-artist'>Artist: " +
            xArtist +
            "</div><div class='playlist-cover'><img src=" + xCover + " /></div></a> "
    } catch (error) {
        console.error( `Could not get playlist song: ${error}` );
    }
}

fetchPlaylistSong();

