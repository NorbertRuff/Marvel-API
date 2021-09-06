import hashlib
import os
import requests as requests
from flask import Flask, render_template, request, jsonify, make_response

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
    return render_template('marvel_cinematic_universe.html')


@app.route("/characters", methods=['GET'])
def characters():
    return render_template('characters.html')


@app.route("/cinematic_universe", methods=['GET'])
def cinematic_universe():
    return render_template('marvel_cinematic_universe.html')


@app.route("/get_mcu_movies", methods=['GET'])
def get_mcu_movies():
    url = "https://mcuapi.herokuapp.com/api/v1/movies"
    try:
        response = requests.get(url).json()
        movies_list = response['data']
        return jsonify(movies_list)
    except:
        return make_response(jsonify({'response': 'Error with server'}), 400)


@app.route("/get_featured_movies", methods=['GET'])
def get_featured_movies():
    url = "https://mcuapi.herokuapp.com/api/v1/movies?limit=5&order=box_office%2CDESC"
    try:
        response = requests.get(url).json()
        movies_list = response['data']
        return jsonify(movies_list)
    except:
        return make_response(jsonify({'response': 'Error with server'}), 400)


@app.route('/get_characters_data', methods=['GET'])
def get_characters_data():
    page = "characters"
    try:
        offset = request.values['offset']
        order = request.values['order']
        limit = request.values['limit']
    except KeyError:
        offset = "0"
        order = "modified"
        limit = "30"
    try:
        response = requests.get(
            f"https://gateway.marvel.com/v1/public/{page}"
            f"?orderBy={order}"
            f"&limit={limit}"
            f"&ts={timestamp}"
            f"&apikey={public_key}"
            f"&hash={marvel_hash}").json()
        characters_list = response['data']['results']
        return jsonify(characters_list)
    except KeyError:
        return jsonify({'response': 'Error with key'})
    except:
        return jsonify({'response': 'Error with server'})


@app.route('/get_avanger_data', methods=['GET'])
def get_avanger_data():
    try:
        char_id = request.values['charId']
        page = f"characters/{char_id}"
    except KeyError:
        return jsonify({'response': 'Error with key'})
    try:
        response = requests.get(
            f"https://gateway.marvel.com/v1/public/{page}"
            f"?ts={timestamp}"
            f"&apikey={public_key}"
            f"&hash={marvel_hash}").json()
        return jsonify(response["data"]["results"][0])
    except KeyError:
        return jsonify({'response': 'Error with key'})
    except:
        return jsonify({'response': 'Error with server'})


@app.route("/login", methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'GET':
        return render_template('login.html', error=error)


@app.route("/search", methods=['GET'])
def search():
    print(request.args['name'])
    return render_template('index.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        return render_template('login.html')
    if request.method == 'GET':
        return render_template('register.html')


if __name__ == '__main__':
    app.run(
        use_reloader=True,
        debug=True,
        port=5000,
    )
