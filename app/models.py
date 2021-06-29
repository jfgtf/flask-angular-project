from myapplication import db
from flask_login import UserMixin
# from werkzeug.security import generate_password_hash
# from werkzeug.security import check_password_hash


class Recepies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe = db.Column(db.String(400), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    tags = db.Column(db.String(200), nullable=False)


class Opinions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe = db.Column(db.String(400), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    tags = db.Column(db.String(200), nullable=False)


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(500), nullable=False)
