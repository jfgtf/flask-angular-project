from myapplication import db
from myapplication.models import Recipes
from flask import jsonify, request
from flask_restful import Api, Resource, reqparse


class RecipesApi(Resource):
    def get(self):
        recipes = Recipes.query.all()
        responseObject = {
            'status': 'success',
            'data': recipes
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response
    
    def post(self):
        recipe = request.form.get("recipe")
        user_id = request.form.get("user_id")
        tags = request.form.get("tags")
        username = request.form.get("username")

        if recipe == '':
            responseObject = {
                'status': 'fail',
                'message': 'No recipe provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if user_id == '':
            responseObject = {
                'status': 'fail',
                'message': 'No user id provided.'
            }
            response = jsonify(responseObject)
            response.status_code = 400
            return response

        if tags == '':
            responseObject = {
                'status': 'fail',
                'message': 'No tags provided.'
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

        new_recipe = Recipes(recipe=recipe, user_id=user_id, tags=tags, username=username)
        db.session.add(new_recipe)
        db.session.commit()
        responseObject = {
            'status': 'success',
            'message': 'Recipe added successfully.'
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response

class RecipeApiDelete(Resource):
    def delete(self, id):
        recipe_to_delete = Recipes.query.filter_by(id=id).first()
        try:
            db.session.delete(recipe_to_delete)
            db.session.commit()
            responseObject = {
                'status': 'success',
                'message': 'Recipe has been deleted'
            }
            response = jsonify(responseObject)
            response.status_code = 204
            return response
        except Exception as e:
            responseObject = {
                    'status': 'fail',
                    'message': 'Recipe cannnot be deleted'
                }
            response = jsonify(responseObject)
            response.status_code = 400
            return response


class RecipeApiByID(Resource):
    def get(self):
        id_header = request.headers.get('Authorization')
        if id_header:
            try:
                user_id = id_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Failed.'
                }
                response = jsonify(responseObject)
                response.status_code = 401
                return response
        else:
            user_id = -1
        recipes = Recipes.query.filter_by(user_id=user_id).all()
        responseObject = {
            'status': 'success',
            'data': recipes
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response


class DeleteRecipeAPI(Resource):
    # def post(self):
    def delete(self):
        id_header = request.headers.get('Authorization')
        if id_header:
            try:
                id = id_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Failed.'
                }
                response = jsonify(responseObject)
                response.status_code = 401
                return response
        else:
            responseObject = {
                    'status': 'fail',
                    'message': 'Failed.'
                }
            response = jsonify(responseObject)
            response.status_code = 401
            return response

        recipe_to_delete = Recipes.query.filter_by(id=id).first()
        db.session.delete(recipe_to_delete)
        db.session.commit()
        responseObject = {
            'status': 'success',
            'message': 'Successfully deleted.'
        }
        response = jsonify(responseObject)
        response.status_code = 200
        return response

class UpdateRecipeAPI(Resource):
    def put(self):
        pass
    
