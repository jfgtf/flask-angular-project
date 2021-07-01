import re
from myapplication import db, app
from myapplication.models import Users
from flask import Blueprint, render_template, redirect,request , url_for, flash, jsonify
from flask_login import login_required, logout_user, login_user, current_user 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, reqparse
from markupsafe import escape
import jwt
import datetime
from myapplication.auth.auth import check_email, token_required

class RegisterApi(Resource):
    def post(self):
            email = request.form.get("email")
            firstName = request.form.get("firstName")
            lastName = request.form.get("lastName")
            username = request.form.get("username")
            password = request.form.get("password")
            repeatPassword = request.form.get("repeatPassword")

            email = str(escape(email))
            firstName = str(escape(firstName))
            lastName = str(escape(lastName))
            username = str(escape(username))
            password = str(escape(password))
            repeatPassword = str(escape(repeatPassword))

            user = Users.query.filter_by(email=email).first()

            if user:
                return {'message': {'email': 'This email already exists'}}, 400

            if email == '':
                return {'message': {'email': 'No email provided'}}, 400

            elif check_email(email) is False:
                return {'message': {'email': 'Invalid email provided'}}, 400

            if firstName == '':
                return {'message': {'firstname': 'No first name provided'}}, 400

            if username =='':
                return {'message': {'username': 'no username provided'}}, 400

            if lastName == '':
                return {'message': {'lastname': 'No last name provided'}}, 400

            if password == '':
                return {'message': {'password': 'no password provided'}}, 400

            if repeatPassword == '':
                return {'message': {'repeatPassword': 'no repeat password provided'}}, 400

            if password != repeatPassword:
                return {'message': {'passwords do not match with each other'}}, 400

            password = generate_password_hash(password)
            new_user = Users(email=email, first_name=firstName, last_name=lastName,\
                username=username, password=password)
            db.session.add(new_user)
            db.session.commit()
            #token = jwt.encode({})
            return {'email': new_user.email}, 200
            #return jsonify(new_user)

class LoginApi(Resource):
    def post(self):
        email = request.form.get("email")
        password = request.form.get('password')

        email = str(escape(email))
        password = str(escape(password))

        user = Users.query.filter_by(email=email).first()

        if not user:
            return {'message': {'user has not been found'}}, 400

        elif check_password_hash(user.password, password) is False:
            return {'message': {'password is incorrect'}}, 400

        else:
            token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=20)}, app.config)
            return {'token': token.decode('UTF-8')}, 200
            #return jsonify(user), 200