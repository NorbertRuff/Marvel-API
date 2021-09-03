import hashlib
import os

import requests as requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

timestamp = 1
public_key = os.environ.get('public_key')
private_key = os.environ.get('private_key')
marvel_hash = (hashlib.md5((str(timestamp) + private_key + public_key).encode('utf-8')).hexdigest())

if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000,
    )
