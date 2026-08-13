// const BASE_URL = "http://localhost:8080/songs/";
const BASE_URL = "https://khaki-boxes-post.loca.lt/songs/";
// const BASE_URL = "https://hidropoietic-unloyally-eleonor.ngrok-free.dev/songs/";

export async function getAllSongs() {
    const reponseData = await fetch(BASE_URL + "getallsongs");

    if (!reponseData.ok) {
        throw new Error("Cannot get songList");
    }

    return await reponseData.json();

}

export function playSong(songAudio, song, nowPlayingTitle) {

    songAudio.src = BASE_URL + song.songSignature;

    nowPlayingTitle.textContent = song.songName;

    songAudio.loop = true;
    songAudio.play();
}

export async function findSingleSongBySongName(songName) {

    const songResponse = await fetch(BASE_URL + "findsong/" + songName);

    return await songResponse.json();

}

