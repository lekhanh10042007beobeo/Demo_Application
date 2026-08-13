class UserInfoRender {

    constructor() { }

    renderFriendRequestStatusButton(friendStatusButton, userInfo) {
        //     NONE,
        //     SENT,
        //     REQUESTED,
        //     ACCEPTED,
        //     REJECTED
        console.log(userInfo.friendRequestStatus);

        const updateFriendStatusUI = (status) => {

            if (status === "NONE" || status === "REJECTED") {
                friendStatusButton.textContent = "+ Friend";
                friendStatusButton.title = "Gửi lời mời kết bạn";

                friendStatusButton.onclick = () => {
                    updateFriendStatusUI("SENT");
                };

            }
            else if (status === "SENT") {

                friendStatusButton.textContent = "You sent " + userInfo.ownername + " a friend request";
                friendStatusButton.title = "Hủy yêu cầu";

                friendStatusButton.onclick = () => {
                    updateFriendStatusUI("NONE");
                };

            }

            else if (status === "REQUESTED") {

                friendStatusButton.textContent = userInfo.ownername + " sent you a friend request";
                friendStatusButton.title = "";

                document.getElementById('popup-menu').style.display = "flex";

                //
                document.getElementById('acceptButton').onclick = () => {
                    updateFriendStatusUI("ACCEPTED");

                    document.getElementById('popup-menu').style.display = "none";



                }
                document.getElementById('denyButton').onclick = () => {
                    updateFriendStatusUI("NONE");

                    document.getElementById('popup-menu').style.display = "none";

                }

            }
            //ACCEPTED
            else {

                friendStatusButton.textContent = "✓ Friends";
                friendStatusButton.title = "Hủy kết bạn";

                friendStatusButton.onclick = () => {
                    updateFriendStatusUI("NONE");
                };

            }

        }

        updateFriendStatusUI(userInfo.friendRequestStatus);

    }


}

export const userInfoRenderUI = new UserInfoRender();