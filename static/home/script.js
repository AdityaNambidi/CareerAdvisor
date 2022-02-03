var socket = io.connect('ws://' + document.domain + ':' + location.port);

socket.on("connect", function() {
    console.log("connectyed")
});