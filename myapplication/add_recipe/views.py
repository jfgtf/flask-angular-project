import re
from myapplication import db
from myapplication.models import Recepies
from . import add_recipe
from flask import Blueprint, render_template, redirect, request , url_for, flash
from flask_login import login_required, logout_user, login_user, current_user 
from werkzeug.security import generate_password_hash, check_password_hash

@add_recipe.route("/add-recipe", methods=['GET', 'POST'])
@login_required
def add_recipe_get():
    if request.method == 'POST':
        recipe = request.form.get('recipe')
        tags = request.form.get('tags')
        user_id = current_user.id 

        if len(recipe) < 10 or len(recipe) > 400:
            flash("Recipe must be between 10 and 400 chars!", category='error')

        elif len(tags) < 2 and len(tags) > 200:
            flash("Tags must be between 2 and 200 chars", category='error')

        else:
            flash("Recipe has been added!")
            recipe_to_add = Recepies(recipe=recipe, user_id=user_id, tags=tags)
            db.session.add(recipe_to_add)
            db.session.commit()
            # return

    # return

