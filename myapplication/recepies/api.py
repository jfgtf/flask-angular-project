from myapplication import db
from myapplication.models import Recepies
from flask import jsonify, request
from flask_restful import Api, Resource, reqparse
from markupsafe import escape
from myapplication.auth.auth import token_required

class RecepiesApi(Resource):
    def get(self):
        recepies = Recepies.query.all()
        return jsonify(recepies)
    
    @token_required
    def post(self):
        recipe = request.form.get("recipe")
        user_id = request.form.get("user_id")
        tags = request.form.get("tags")

        recipe = str(escape(recipe))
        user_id = str(escape(user_id))
        tags = str(escape(tags))

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