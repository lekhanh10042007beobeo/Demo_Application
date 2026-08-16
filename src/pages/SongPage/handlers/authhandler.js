import { dom } from "../../../components/songpagecomponents.js";
import { loadUserChatList } from "./userhandler.js";
import { login } from "../../../services/userService.js";
import { setInfoAfterLogin } from "./userhandler.js";
import { register } from "../../../services/userService.js";

export async function handleLogin(username, password) {

    const responseData = await login(username, password);

    if ('httpStatus' in responseData) {

        dom.loginErrorMesasge.textContent = responseData.message;

    }
    else {
        console.log("login successfully");

        const userResponse = responseData;

        dom.displayUsername.textContent = userResponse.ownername;

        dom.loginModal.style.display = 'none';
        dom.showLoginButton.style.display = 'none';
        dom.showRegisterButton.style.display = 'none';

        dom.logoutButton.style.display = 'inline-block';

        await setInfoAfterLogin(userResponse);

        await loadUserChatList();

    }

}

export async function handleRegister(ownername, username, password) {

    if (ownername !== "" && username !== "" && password !== "") {
        const userInfo = {

            ownername: ownername,
            username: username,
            password: password

        }

        const responsData = await register(userInfo);

        if (responsData.ok) {

            dom.registerFormContainer.style.display = "none";

            dom.successPopup.style.display = "flex";

            dom.closeSuccessPopupButton.onclick = () => {
                dom.successPopup.style.display = "none";
            }

        }

        else {
            const error = await responsData.json();

            dom.registerErrorMessage.textContent = "";

            dom.registerErrorMessage.textContent = error.message;
            console.log(error);
            dom.registerErrorMessage.style.display = "flex";

        }
    }

}

export function checkLoginStatus() {

    if (localStorage.getItem('loginStatus') === 'true') {

        dom.displayUsername.textContent = localStorage.getItem('ownerName');

        dom.loginModal.style.display = 'none';
        dom.showLoginButton.style.display = 'none';
        dom.showRegisterButton.style.display = 'none';


    }

    else {

        dom.logoutButton.style.display = 'none';

    }

}
