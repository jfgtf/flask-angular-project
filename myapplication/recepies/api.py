from myapplication import db
from myapplication.models import Recepies
from flask import jsonify
from flask_restful import Api, Resource, reqparse
from markupsafe import escape

class RecepiesApi(Resource):
    def get(self):
        recepies = Recepies.query.all()
        return jsonify(recepies)

    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('recipe', type=str, required=True, help='No recipe provided', location='json')
        req_parse.add_argument('user_id', type=int, required=True, help='No user_id provided', location='json')
        req_parse.add_argument('tags', type=str, required=True, help='No tags provided', location='json')

        args = req_parse.parse_args()

        recipe = args.get('recipe')
        user_id = args.get('user_id')
        tags = args.get('tags')

        recipe = escape(recipe)
        user_id = escape(user_id)
        tags = escape(tags)

        if recipe == '':
            return {'message': {'No recipe provided'}}, 400

        if user_id == '':
            return {'message': {'No user_id provided'}}, 400

        if tags == '':
            return {'message': {'No tags provided'}}, 400

        new_recipe = Recepies(recipe=recipe, user_id=user_id, tags=tags)
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(new_recipe), 200

        

        


