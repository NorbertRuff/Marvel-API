from flask import Flask

from routes import *

app = Flask(__name__)
app.register_blueprint(routes)


@app.errorhandler(404)
def not_found(error):
    return render_template('errors/404.html', errorMessage=error), 404


if __name__ == '__main__':
    app.run(
        use_reloader=True,
        debug=True,
        port=5000,
    )
