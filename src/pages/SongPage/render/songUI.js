import { dom } from "../../../components/songpagecomponents.js";
import { playSong } from "../../../services/songService.js";
import { songDetail } from "../../SongDetailPage/songdetail.js";

class SongUIProvider {

    constructor() { }


    createSingleSongLi(song) {
        const li = document.createElement('li');

        li.songData = song;

        const playSongButton = document.createElement('button');
        playSongButton.textContent = "Play";

        const span = document.createElement('span');
        span.textContent = song.songName;


        playSongButton.addEventListener('click', () => playSong(mySong, song, dom.nowPlayingTitle));


        li.appendChild(span);
        li.appendChild(playSongButton);

        li.addEventListener('click', async () => songDetail.openSongDetailPage(song));

        return li;
    }




}


export const songUIProvider = new SongUIProvider();