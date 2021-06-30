from flask import Blueprint 

users = Blueprint("bp_users", __name__)

from . import views