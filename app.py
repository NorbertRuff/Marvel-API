import hashlib
import os

from flask import Flask, render_template

app = Flask(__name__)

timestamp = 1
public_key = os.environ.get('public_key')
private_key = os.environ.get('private_key')
marvel_hash = (hashlib.md5((str(timestamp) + private_key + public_key).encode('utf-8')).hexdigest())


@app.route("/", methods=['GET'])
def intro():
    return render_template('intro.html')


@app.route("/home", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/characters", methods=['GET'])
def characters():
    return render_template('characters.html')


@app.route("/cinematic_universe", methods=['GET'])
def cinematic_universe():
    return render_template('marvel_cinematic_universe.html')


if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000,
    )
