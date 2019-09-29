from flask import Flask
import os
FLASK_PORT = os.environ.get('FLASK_PORT')
FLASK_ENV = os.environ.get('FLASK_ENV')

app = Flask(__name__)


@app.route('/')
def hello_world():
    return {'msg': 'Hello, World'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=FLASK_PORT)
