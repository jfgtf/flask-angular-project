from flask import Blueprint, render_template, jsonify
from myapplication.models import Users

home = Blueprint("bp_home", __name__)

@home.route('/', methods=['GET'])
def hello():
    return render_template('index.html')

