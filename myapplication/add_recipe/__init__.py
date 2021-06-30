from flask import Blueprint

add_recipe = Blueprint("bp_add_recipe", __name__)

from . import views