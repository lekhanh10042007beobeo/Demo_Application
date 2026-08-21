import { dom } from "../../components/songpagecomponents.js";
import { handleLogin, handleRegister } from "./handlers/authhandler.js";
import { checkLoginStatus } from "./handlers/authhandler.js";
import { findSong } from "./handlers/songhandler.js";
import { loadSongList } from "./handlers/songhandler.js";
import { loadUserChatList } from "./handlers/userhandler.js";
import { websocketService } from "../../services/websocketService.js";
import { loadUserFavoriteSongs } from "./handlers/songhandler.js";

//Add event listeners to components:
async function setInitData() {
    dom.searchButton.addEventListener('click', async () => await findSong());

    dom.searchInput.addEventListener('keydown', async (event) => {
        if (event.key == "Enter") {

            dom.userSongSearchResults.innerHTML = "";

            await findSong();
        }
    })

    //Login
    dom.showLoginButton.addEventListener('click', () => {
        dom.loginModal.style.display = 'flex';
    });

    dom.closeLoginModalButton.addEventListener('click', () => {
        dom.loginModal.style.display = 'none';
    });

    dom.loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        dom.loginErrorMesasge.textContent = "";

        await handleLogin(dom.usernameInput.value, dom.passwordInput.value);

    });
    //Register
    dom.showRegisterButton.addEventListener('click', (event) => {

        dom.registerFormContainer.style.display = 'flex';

    });

    dom.registerButton.addEventListener('click', async (event) => {

        event.preventDefault();

        await handleRegister(dom.ownernameRegisterInput.value, dom.usernameRegisterInput.value, dom.passwordRegisterInput.value);

    });

    dom.closeRegisterPopupButton.addEventListener('click', () => {
        dom.registerFormContainer.style.display = "none";
    });



    //
    dom.logoutButton.addEventListener('click', () => {

        localStorage.clear();

        location.reload();


    });

    dom.userFavoriteSongs.addEventListener('click', async () => loadUserFavoriteSongs());

    dom.homePage.addEventListener('click', () => {
        location.reload();
    });

    dom.closeErrorContainerButton.addEventListener('click', () => {
        localStorage.clear();

        location.reload();

        dom.errorContainer.style.display = "none";
    });

    dom.closeGlobalErrorContainerButton.addEventListener('click', () => {

        location.reload();

    });


    //When the website has just been loaded for the first time:
    document.addEventListener('DOMContentLoaded', async () => {
        await loadSongList();

        await checkLoginStatus();

        await loadUserChatList();

        if (localStorage.getItem('userName')) {

            websocketService.establishConnection(localStorage.getItem('userName'));
        }

    });

    //Loop the song:
    dom.repeatSongButton.addEventListener('change', () => {

        dom.mySong.loop = dom.repeatSongButton.checked;

    });

    // const nextBtn = document.getElementById('nextSongBtn');

    // // Vô hiệu hóa nút (tự động tắt sáng và không bấm được)
    // nextBtn.disabled = true;

}


await setInitData();


