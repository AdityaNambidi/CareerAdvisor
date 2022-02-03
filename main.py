from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = "bruhhhh"
socket = SocketIO(app)

@app.route("/")
def home():
    return render_template("home/index.html")

@socket.on('message')
def message(msg):
    print(msg)
    send(msg, broadcast=True)


if __name__ == '__main__':
    print("Server started")
    socket.run(app, port=5000)