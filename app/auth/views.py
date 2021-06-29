import re
from myapplication import db
from myapplication.models import Users
from . import auth
from flask import Blueprint, render_template, redirect, request , url_for, flash
from flask_login import login_required, logout_user, login_user, current_user 
from werkzeug.security import generate_password_hash, check_password_hash
# Think about flask_wtf... FlaskForm, wtforms

def check_email(email: str) -> bool:
	regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$' 
	if re.search(regex, email):
		return True
	else:
		return False

@auth.route('/register', methods=['GET', 'POST'])
def register_get():
    if request.method == 'POST':
        email = request.form.get('email')
        firstname = request.form.get('firstName')
        lastname = request.form.get('lastName')
        username = request.form.get('username')
        password = request.form.get('password')
        repeat_password = request.form.get('repeatPassword')

        user = Users.query.filter_by(email=email).first()

        if user:
            flash("Email already exists", category='error')

        elif len(email) > 50:
            flash("Email cannot be longer than 50 chars!", category='error')

        elif check_email(email) == False:
            flash("It is inappropiate email!", category='error')

        elif len(firstname) < 3 or len(firstname) > 20:
            flash("Length of first name must be between 3 and 20 chars!", category='error')
        
        elif len(lastname) < 3 or len(lastname) > 20:
            flash("Length of last name must be between 3 and 20 chars!", category='error')

        elif len(password) < 3 or len(password) > 20:
            flash("Length of password must be between 3 and 20 chars!", category='error')

        elif len(repeat_password) < 3 or len(password) > 20:
            flash("Length of password must be between 3 and 20 chars!", category='error')

        elif password != repeat_password:
            flash("Passwords must have a match!", category='error')

        else:
            password = generate_password_hash(password)
            new_user =  Users(email=email, first_name=firstname, last_name=lastname, \
                 username=username, password=password )
            db.session.add(new_user)
            db.session.commit()
            flash("Account created!", category='success')
            # return
        

@auth.route('/login', methods=['GET', 'POST'])
def login_get():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = Users.query.filter_by(email=email)
        if user:
            if check_password_hash(user.password, password):
                flash("You are logged in!", category='success')
                login_user(user, remember=True)
                # return

            else:
                flash("Incorrect password!", category='error')
        
        else:
            flash("{} doesn't exist in database!".format(email), category='error')

    # return

@auth.route('/logout')
@login_required
def logout_get():
    logout_user()
    #return

