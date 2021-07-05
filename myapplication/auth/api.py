import re
from myapplication import db, app
from myapplication.models import Users, BlackListToken
from flask import Blueprint, render_template, redirect, request ,url_for, flash, jsonify, make_response
from flask_login import login_required, logout_user, login_user, current_user 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, reqparse
import jwt
import datetime
from myapplication.auth.auth import check_email


class RegisterApi(Resource):
    def post(self):
        email = request.form.get("email")
        firstName = request.form.get("firstName")
        lastName = request.form.get("lastName")
        username = request.form.get("username")
        password = request.form.get("password")
        repeatPassword = request.form.get("repeatPassword")

        user = Users.query.filter_by(email=email).first()

        if user:
            return {'message': {'email': 'This email already exists'}}, 400

        if email == '':
            return {'message': {'email': 'No email provided'}}, 400

        if check_email(email) is False:
            return {'message': {'email': 'incorrect email'}}

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
        # token = jwt.encode({})
        return "Succesfully registered", 200
        # return jsonify(new_user)


class LoginApi(Resource):
    def post(self):
        post_data = request.get_json()
        key = 'essasito szefito'

        email = post_data.get('email')
        password = post_data.get('password')

        user = Users.query.filter_by(email=email).first()

        id = user.id

        if not user:
            responseObject = {
                'status': 'fail',
                'message': 'User does not exist.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response
            # return jsonify(user), 200

        elif check_password_hash(user.password, password) is False:
            responseObject = {
                'status': 'fail',
                'message': 'Password incorrect.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        else:
            token = jwt.encode({'id': id, 'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}, key, algorithm="HS256")
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'token': token
            }
            response = jsonify(responseObject)
            response.status_code = 200
            return response
            # return jsonify(user), 200


class UserAPI(Resource):
    def get(self):
        # get the auth token
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                response = jsonify(responseObject)
                response.status_code = 401
                return response
        else:
            auth_token = ''
        if auth_token:
            if BlackListToken.check_blacklist(auth_token):
                try:
                    decoded = jwt.decode(auth_token, 'essasito szefito', algorithms="HS256")
                    resp = decoded["id"]
                    if not isinstance(resp, str):
                        user = Users.query.filter_by(id=resp).first()
                        responseObject = {
                            'status': 'success',
                            'data': {
                                'user_id': user.id,
                                'email': user.email,
                                'username': user.username
                            }
                        }
                        response = jsonify(responseObject)
                        response.status_code = 200
                        return response
                    responseObject = {
                        'status': 'fail',
                        'message': 'Failed'
                    }
                    response = jsonify(responseObject)
                    response.status_code = 401
                    return response
                except jwt.ExpiredSignatureError:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Token expired.'
                    }
                    response = jsonify(responseObject)
                    response.status_code = 401
                    return response
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Already logged out'
                }
                response = jsonify(responseObject)
                response.status_code = 401
                return response
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            response = jsonify(responseObject)
            response.status_code = 401
            return response


class LogoutAPI(Resource):
    def post(self):
        post_data = request.get_json()
        auth_token = ''
        auth_token = post_data.get('token')
        if auth_token:
            if BlackListToken.check_blacklist(auth_token):
                if isinstance(auth_token, str):
                    # mark the token as blacklisted
                    blacklist_token = BlackListToken(token=auth_token)

                    # insert the token
                    db.session.add(blacklist_token)
                    db.session.commit()
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    response = jsonify(responseObject)
                    response.status_code = 200
                    return response

                else:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Failed to logout'
                    }
                    response = jsonify(responseObject)
                    response.status_code = 401
                    return response
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Failed'
                }
                response = jsonify(responseObject)
                response.status_code = 402
                return response
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            response = jsonify(responseObject)
            response.status_code = 403
            return response
