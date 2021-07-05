from flask import jsonify, request
from myapplication.models import Opinions
from flask_restful import Resource, reqparse
from myapplication import db
from markupsafe import escape
from myapplication.auth.auth import token_required


class OpinionsApi(Resource):
    def get(self):
        opinions = Opinions.query.all()
        responseObject = {
            'status': 'success',
            'data': opinions
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response

    def post(self):
        name_of_restaurant = request.form.get("name_of_restaurant")
        city_of_restaurant = request.form.get("city_of_restaurant")
        type_of_restaurant = request.form.get("type_of_restaurant")
        opinion = request.form.get("opinion")
        user_id = request.form.get("user_id")
        username = request.form.get("username")

        if name_of_restaurant == '':
            responseObject = {
                'status': 'fail',
                'message': 'No name provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if city_of_restaurant == '':
            responseObject = {
                'status': 'fail',
                'message': 'No city provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if type_of_restaurant == '':
            responseObject = {
                'status': 'fail',
                'message': 'No type provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if opinion == '':
            responseObject = {
                'status': 'fail',
                'message': 'No opinion provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if username == '':
            responseObject = {
                'status': 'fail',
                'message': 'No username provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        new_opinion = Opinions(name_of_restaurant=name_of_restaurant, city_of_restaurant=city_of_restaurant,\
            type_of_restaurant=type_of_restaurant, opinion=opinion, user_id=user_id, username=username)
        db.session.add(new_opinion)
        db.session.commit()
        responseObject = {
            'status': 'success',
            'message': 'Opinion added successfully.'
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response


class OpinionsApiByID(Resource):
    def get(self):
        id_header = request.headers.get('Authorization')
        if id_header:
            try:
                user_id = id_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                response = jsonify(responseObject)
                response.status_code = 401
                return response
        else:
            user_id = -1
        opinions = Opinions.query.filter_by(user_id=user_id).all()
        responseObject = {
            'status': 'success',
            'data': opinions
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response
