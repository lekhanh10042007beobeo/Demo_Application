// const BASE_URL = "http://localhost:8080/songs/";
// const BASE_URL = "https://khaki-boxes-post.loca.lt/songs/";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/songs/";
import { BASE_URL } from "../components/commoncomponents.js";
import { dom } from "../components/songpagecomponents.js";

const BASE_SONG_URL = BASE_URL + "/songs/";

export async function getAllSongs() {
    const reponseData = await fetch(BASE_SONG_URL + "getallsongs");

    if (!reponseData.ok) {
        throw new Error("Cannot get songList");
    }

    return await reponseData.json();

}

export function playSong(songAudio, song, nowPlayingTitle) {

    songAudio.src = BASE_SONG_URL + song.songSignature;

    nowPlayingTitle.textContent = song.songName;

    dom.repeatSongButton.checked = false;
    dom.repeatSongControlContainer.style.display = "flex";
    songAudio.play();
}

export async function findSingleSongBySongName(songName) {

    const songResponse = await fetch(BASE_SONG_URL + "findsong/" + songName);

    return await songResponse.json();

}

