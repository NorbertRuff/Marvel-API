from flask import Blueprint

routes = Blueprint('routes', __name__)

from .data_fetch_routes import *
from .pages_routes import *
from .user_routes import *
