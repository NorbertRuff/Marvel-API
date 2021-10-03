import requests as requests
from flask import render_template

from . import routes


@routes.route("/", methods=['GET'])
def intro():
    return render_template('pages/intro.html')


@routes.route("/home", methods=['GET'])
def index():
    url = "https://mcuapi.herokuapp.com/api/v1/movies/21"
    movie_details = requests.get(url).json()
    return render_template('pages/marvel_cinematic_universe.html', movie_details=movie_details)


@routes.route("/characters", methods=['GET'])
def characters():
    return render_template('pages/characters.html')


@routes.route("/comics", methods=['GET'])
def comics():
    return render_template('pages/comics.html')


@routes.route("/cinematic-universe", methods=['GET'])
def cinematic_universe():
    url = "https://mcuapi.herokuapp.com/api/v1/movies/21"
    movie_details = requests.get(url).json()
    return render_template('pages/marvel_cinematic_universe.html', movie_details=movie_details)
