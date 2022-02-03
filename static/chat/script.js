const socket = io();

const inputField = document.getElementById("input-field");
const sendBtn = document.getElementById("send-btn");
const msgBox = document.getElementById("msg-area")

let selectedUser = ""

socket.on("user-list", users => {
    userList = document.getElementById("list");
    console.log(users);
    userList.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        const div = "<button class='online-user' id='" + users[i] + "' onclick='selectUser(this)'>" +
                        "<h1>" + users[i] + "</h1>" +
                    "</button>";

        userList.innerHTML += div;
    }

});

socket.on('message', message => {
    showMsg(message, "rcv");
});

function showMsg(msg, sender) {
    let txt = msg['txt'];

    let colorClass = "";    
    if (sender == "You") {
        colorClass = " dark"
        txt = msg;
    }

    const div = "<div class='msg" + colorClass + "' id='msg'>" +
                    "<p>" + txt + "</p>" +
                "</div>"
    msgBox.innerHTML += div;

    msgBox.scrollTo(0, msgBox.scrollHeight);
}

function send(txt) {
    showMsg(txt, "You");

    const msg = {
        "txt" : txt,
        "id" : selectedUser
    }

    socket.emit("chatMsg", msg);

    inputField.value = "";
}

let selected = null;
function selectUser(btn) {

    if (selected != null) {
        selected.classList.remove("selected");
    }

    btn.classList.add("selected");
    selected = btn;
    selectedUser = btn.id;
    console.log(selectedUser);
}

inputField.addEventListener("keyup", function(event) {
    
    if (event.keyCode === 13) {
        event.preventDefault();
        sendBtn.click();

    }
});