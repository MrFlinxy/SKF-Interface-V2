from config.config import DevConfig, TestConfig
from main import create_app
from socketio_server import socket_create
import eventlet
import threading


def add_wsgi_listen(app, port):
    try:
        eventlet.wsgi.server(eventlet.listen(("127.0.0.1", port)), app)
    except WindowsError:
        pass


if __name__ == "__main__":
    app = create_app(DevConfig)
    socket_create(app)

    listen_thread = threading.Thread(
        target=add_wsgi_listen, name="Listen Thread", args=(app, 5001)
    )
    listen_thread.start()

    app.run()
