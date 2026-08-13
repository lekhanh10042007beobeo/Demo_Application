import { dom } from "../../../components/songpagecomponents.js";
import { getAllSongs } from "../../../services/songService.js";
import { findSingleSongBySongName } from "../../../services/songService.js";
import { songUIProvider } from "../render/songUI.js";
import { getUserFavoriteSongs } from "../../../services/userService.js";

export async function findSong() {


    if (dom.searchInput.value !== "") {

        const reponseData = await findSingleSongBySongName(dom.searchInput.value);

        dom.userSongSearchResults.innerHTML = "";

        if ("httpStatus" in reponseData) {
            const li = document.createElement('li');
            const span = document.createElement('span');

            span.textContent = reponseData.message;

            li.appendChild(span);

            dom.userSongSearchResults.appendChild(li);


        }

        else {
            const songList = reponseData;

            if (songList.length !== 0) {

                dom.userSongSearchResults.innerHTML = "";

                for (const song of songList) {

                    const li = songUIProvider.createSingleSongLi(song);

                    dom.userSongSearchResults.appendChild(li);



                }

            }


        }

    }

}

export async function loadSongList() {

    const songList = await getAllSongs();

    for (const song of songList) {

        const li = songUIProvider.createSingleSongLi(song);


        dom.userSongSearchResults.appendChild(li);

    }

}

export async function loadUserFavoriteSongs() {
    const songSet = await getUserFavoriteSongs(localStorage.getItem('userId'));

    if (songSet) {

        dom.userSongSearchResults.innerHTML = "";
        dom.songListType.textContent = "Bài hát yêu thích";

        for (const song of songSet) {

            const li = songUIProvider.createSingleSongLi(song);

            dom.userSongSearchResults.appendChild(li);

        }
    }

}

export function setFavoriteSongListToLocalStorage(favoriteSongList) {

    const favovriteSongMap = new Map();

    for (const song of favoriteSongList) {

        favovriteSongMap.set(song.songId, song);

    }

    localStorage.setItem('userFavoriteSongs', JSON.stringify(Array.from(favovriteSongMap)));

}

