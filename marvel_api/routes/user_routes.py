from flask import redirect, session, url_for, request, jsonify

import data_handler
import password_hasher
from . import routes


# <--------------------------------------login-------------------------------------->
@routes.route("/register", methods=["POST", "GET"])
def register():
    new_username = request.get_json()['new_username']
    new_password = password_hasher.hash_password(request.get_json()['new_password'])
    try:
        data_handler.add_new_user(new_username, new_password)
        return jsonify({"response": "OK"})
    except:
        return jsonify({"response": "There was an error during the registration process"})


@routes.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        username = request.get_json()['username']
        user_data = data_handler.get_user_login_data(username)
        if len(user_data) == 1:
            try:
                password = request.get_json()['password']
                hashed_password = user_data[0]["password"]
                valid_password = password_hasher.verify_password(password, hashed_password)
                if valid_password:
                    session["username"] = user_data[0]["name"]
                return jsonify({"response": "OK"})
            except:
                return jsonify({"response": "There was an error during the login process"})
    elif request.method == "GET":
        return redirect(url_for('index'))


@routes.route('/get-logged-in-user')
def logged_in_user():
    user_in_session = session.get("username", "")
    return jsonify({"username": user_in_session})


@routes.route('/logout')
def logout():
    session.pop("username", None)
    return redirect(url_for("index"))

# <--------------------------------------/login-------------------------------------->
