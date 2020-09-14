const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  name = prompt("Please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

///////////////// firebase Authentication ///////////

let foo = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider);
};

let onFirebaseStateChanged = () => {
  firebase.auth().onAuthStateChanged(onStateChanged);
};

let onStateChanged = (user) => {
  if (user) {
    // alert(
    //   firebase.auth().currentUser.email +
    //     "\n" +
    //     firebase.auth().currentUser.dispayName
    // );

    document.getElementById(
      "img-profile"
    ).src = firebase.auth().currentUser.photoURL;
    document.getElementById(
      "img-profile"
    ).title = firebase.auth().currentUser.displayName;
  }
};

//////////////// call Auth state changed ////////////

onFirebaseStateChanged();