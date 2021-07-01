from flask import jsonify, request
from myapplication.models import Opinions
from flask_restful import Resource, reqparse
from myapplication import db
from markupsafe import escape
from myapplication.auth.auth import token_required

def OpinionsApi(Resource):
    def get(self):
        opinions = Opinions.query.all()
        return jsonify(opinions)

    @token_required
    def post(self):
        name_of_restaurant = request.form.get("name_of_restaurant")
        city_of_restaurant = request.form.get("city_of_restaurant")
        type_of_restaurant = request.form.get("type_of_restaurant")
        opinion = request.form.get("opinion")
        user_id = request.form.get("user_id")

        name_of_restaurant = str(escape(name_of_restaurant))
        city_of_restaurant = str(escape(city_of_restaurant))
        type_of_restaurant = str(escape(type_of_restaurant))
        opinion = str(escape(opinion))
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