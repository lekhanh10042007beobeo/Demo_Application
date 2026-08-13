import { dom } from "../../components/songpagecomponents.js";
import { playSong } from "../../services/songService.js";
import { addFavoriteSong } from "../../services/userService.js";
import { removeFavoriteSong } from "../../services/userService.js";
import { setFavoriteSongListToLocalStorage } from "../SongPage/handlers/songhandler.js";
class SongDetail {

    constructor() { }

    async openSongDetailPage(song) {

        console.log('open song detail');

        const responseData = await fetch("../SongDetailPage/songdetail.html");

        const htmlText = await responseData.text();

        dom.songDetailContainer.innerHTML = htmlText;
        dom.songDetailContainer.style.display = 'flex';


        //
        this.setInitData(song);




    }

    setInitData(song) {

        document.getElementById('songName').textContent = song.songName;

        document.getElementById('close-detail-btn').addEventListener('click', () => {

            dom.songDetailContainer.style.display = 'none';
        });

        document.getElementById('play-detail-btn').addEventListener('click', () => {

            playSong(dom.mySong, song, dom.nowPlayingTitle);

        });

        this.onActionHeartButton(song);


    }

    onActionHeartButton(song) {
        //
        const heartButton = document.getElementById('favorite-btn');

        const userFavoriteSongRequest = {
            userId: localStorage.getItem('userId'),
            songId: song.songId
        }


        if (this.isFavoriteSong(song)) {
            heartButton.classList.add('active');
            heartButton.title = "Xóa khỏi danh sách yêu thích";

            console.log(song.songName + " is one of your favorite songs");

        }
        else {
            heartButton.classList.remove('active');

            console.log(song.songName + " is not one of your favorite songs");

        }

        heartButton.addEventListener('click', async (event) => {
            const currentButton = event.currentTarget;

            currentButton.classList.toggle('active');

            if (currentButton.classList.contains('active')) {

                //call api:
                console.log("added " + song.songName + " to song to your favorite song list");

                const responseData = await addFavoriteSong(userFavoriteSongRequest);

                if (responseData.ok) {

                    const favoriteSongList = await responseData.json();

                    setFavoriteSongListToLocalStorage(favoriteSongList);



                }
                currentButton.title = "Xóa khỏi danh sách yêu thích";





            }
            else {
                //Call api:
                console.log("removed " + song.songName + " from song to your favorite song list");

                const responseData = await removeFavoriteSong(userFavoriteSongRequest);

                if (responseData.ok) {

                    const favoriteSongList = await responseData.json();

                    setFavoriteSongListToLocalStorage(favoriteSongList);


                }
                currentButton.title = "Thêm vào danh sách yêu thích";




            }


        });
    }

    isFavoriteSong(song) {
        const songs = localStorage.getItem('userFavoriteSongs');

        if (songs) {
            const songMap = new Map(JSON.parse(songs));

            const favoriteSong = songMap.get(song.songId);

            if (favoriteSong !== undefined) {
                return true;
            }

        }

        return false;
    }





}





export const songDetail = new SongDetail();