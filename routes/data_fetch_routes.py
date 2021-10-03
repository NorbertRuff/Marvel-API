import hashlib
import os

import requests as requests
from flask import request, jsonify, make_response

from . import routes

timestamp = 1
public_key = os.environ.get('public_key')
private_key = os.environ.get('private_key')
marvel_hash = (hashlib.md5((str(timestamp) + private_key + public_key).encode('utf-8')).hexdigest())


@routes.route('/get_characters_data', methods=['GET'])
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
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route('/get_avanger_data', methods=['GET'])
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
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route('/get-all-movies', methods=['GET'])
def get_all_movies():
    url = "https://mcuapi.herokuapp.com/api/v1/movies"
    try:
        response = requests.get(url).json()
        movies_list = response['data']
        return jsonify(movies_list)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


# <--------------------------------------navbar-------------------------------------->
@routes.route("/get-featured-comics", methods=['GET'])
def get_featured_comics():
    base_url = "https://gateway.marvel.com/v1/public/comics"
    order = "-modified"
    limit = "5"
    offset = "30"
    url = f"{base_url}?orderBy={order}&limit={limit}&offset={offset}&ts={timestamp}&apikey={public_key}&hash={marvel_hash}"
    try:
        response = requests.get(url).json()
        comics_list = response['data']["results"]
        return jsonify(comics_list)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route("/get-featured-movies", methods=['GET'])
def get_featured_movies():
    url = "https://mcuapi.herokuapp.com/api/v1/movies?limit=5&order=box_office%2CDESC"
    try:
        response = requests.get(url).json()
        movies_list = response['data']
        return jsonify(movies_list)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route("/get-featured-creators", methods=['GET'])
def get_featured_creators():
    base_url = "https://gateway.marvel.com/v1/public/creators"
    modified = "2019-01-01"
    limit = "100"
    offset = "0"
    url = f"{base_url}?modifiedSince={modified}&limit={limit}&offset={offset}&ts={timestamp}&apikey={public_key}&hash={marvel_hash}"
    try:
        response = requests.get(url).json()
        creator_list = response['data']["results"]
        filtered_creators = []
        counter = 0
        for creator in creator_list:
            if (creator["thumbnail"]["path"])[-9:] != "available":
                counter += 1
                filtered_creators.append(creator)
                if counter == 5:
                    return jsonify(filtered_creators)
        return jsonify(filtered_creators)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route("/get-featured-tv-shows", methods=['GET'])
def get_featured_tv_shows():
    url = "https://mcuapi.herokuapp.com/api/v1/tvshows?limit=10&order=release_date%2CDESC"
    try:
        response = requests.get(url).json()
        movies_list = response['data']
        return jsonify(movies_list)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)


@routes.route("/get-featured-characters", methods=['GET'])
def get_featured_characters():
    base_url = "https://gateway.marvel.com/v1/public/characters"
    order = "-modified"
    limit = "50"
    url = f"{base_url}?orderBy={order}&limit={limit}&ts={timestamp}&apikey={public_key}&hash={marvel_hash}"
    try:
        response = requests.get(url).json()
        characters_list = response['data']["results"]
        filtered_characters_list = []
        counter = 0
        for creator in characters_list:
            if (creator["thumbnail"]["path"])[-9:] != "available":
                counter += 1
                filtered_characters_list.append(creator)
                if counter == 5:
                    return jsonify(filtered_characters_list)
        return jsonify(filtered_characters_list)
    except KeyError:
        print(response['message'])
        return make_response(jsonify(response['message']), 400)
