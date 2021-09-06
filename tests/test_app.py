from flask import Flask, request

app = Flask(__name__)

with app.test_request_context('/search?name=Peter'):
    assert request.path == '/search'
    assert request.args['name'] == 'Peter'