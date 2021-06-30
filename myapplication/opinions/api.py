from flask import jsonify
from myapplication.models import Opinions
from flask_restful import Resource, reqparse
from myapplication import db
from markupsafe import escape

def OpinionsApi(Resource):
    def get(self):
        opinions = Opinions.query.all()
        return jsonify(opinions)

    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('name_of_restaurant', type=str, required=True, help='No name_of_restaurant provided', location='json')
        req_parse.add_argument('city_of_restaurant', type=str, required=True, help='No city_of_restaurant provided', location='json')
        req_parse.add_argument('type_of_restaurant', type=str, required=True, help='No type_of_restaurant provided', location='json')
        req_parse.add_argument('opinion', type=str, required=True, help='No opinion provided', location='json')
        req_parse.add_argument('user_id', type=int, required=True, help='No user_id provided', location='json')

        args = req_parse.parse_args()

        name_of_restaurant = args.get('name_of_restaurant')
        city_of_restaurant = args.get('city_of_restaurant')
        type_of_restaurant = args.get('type_of_restaurant')
        opinion = args.get('opinion')
        user_id = args.get('user_id')

        name_of_restaurant = escape(name_of_restaurant)
        city_of_restaurant = escape(city_of_restaurant)
        type_of_restaurant = escape(type_of_restaurant)
        opinion = escape(opinion)
        #user_id = escape(user_id)

        if name_of_restaurant == '':
            return {'message': {'name_of_restaurant': 'No name_of_restaurant provided'}}, 400

        if city_of_restaurant == '':
            return {'message': {'city_of_restaurant': 'No city_of_restaurant provided'}}, 400

        if type_of_restaurant == '':
            return {'message': {'type_of_restaurant': 'No type_of_restaurant provided'}}, 400

        if opinion == '':
            return {'message': {'opinion': 'no opinion provided'}}, 400

        new_opinion = Opinions(name_of_restaurant=name_of_restaurant, city_of_restaurant=city_of_restaurant,\
            type_of_restaurant=type_of_restaurant, opinion=opinion, user_id=user_id)
        db.session.add(new_opinion)
        db.session.commit()
        return jsonify(new_opinion), 200