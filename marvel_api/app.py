from flask import Flask

from routes import *


def create_app():
    app = Flask(__name__)
    app.register_blueprint(routes)

    @app.errorhandler(404)
    def not_found(error):
        return render_template('errors/404.html', errorMessage=error), 404

    return app


if __name__ == '__main__':
    application = create_app()
    application.run(
        use_reloader=True,
        debug=True,
        port=5000,
    )
