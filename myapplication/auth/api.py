import re
import markupsafe
from myapplication import db
from myapplication.models import Users
from flask import Blueprint, render_template, redirect, request , url_for, flash, jsonify
from flask_login import login_required, logout_user, login_user, current_user 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, reqparse
from markupsafe import escape
# Think about flask_wtf... FlaskForm, wtforms

def check_email(email: str) -> bool:
	regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$' 
	if re.search(regex, email):
		return True
	else:
		return False


class RegisterApi(Resource):
    def post(self):
            req_parse = reqparse.RequestParser(bundle_errors=True)
            req_parse.add_argument('email', type=str, required=True, help='No email provided', location='json')
            req_parse.add_argument('firstName', type=str, required=True, help='No firstName provided', location='json')
            req_parse.add_argument('lastName', type=str, required=True, help='No lastName provided', location='json')
            req_parse.add_argument('username', type=str, required=True, help='No username provided', location='json')
            req_parse.add_argument('password', type=str, required=True, help='No password provided', location='json')
            req_parse.add_argument('repeatPassword', type=str, required=True, help='No repeat password provided', location='json')

            args = req_parse.parse_args()

            email = args.get('email')
            firstName = args.get('firstName')
            lastName = args.get('lastName')
            username = args.get('username')
            password = args.get('password')
            repeatPassword = args.get('repeatPassword')

            email = escape(email)
            firstName = escape(firstName)
            lastName = escape(lastName)
            username = escape(username)
            password = escape(password)
            repeatPassword = escape(repeatPassword)

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
            return {'email': new_user.email}, 200
            #return jsonify(new_user)

class LoginApi(Resource):
    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('email')
        req_parse.add_argument('password')

        args = req_parse.parse_args()

        email = args.get('email')
        password = args.get('email')

        email = escape(email)
        password = escape(password)

        user = Users.query.filter_by(email=email).first()

        if not user:
            return {'message': {'user has not been found'}}, 400

        elif check_password_hash(user.password, password) is False:
            return {'message': {'password is incorrect'}}, 400

        else:
            return {'email': user.email, 'username': user.username}, 200
            #return jsonify(user), 200

        








            




"""@auth.route('/register', methods=['GET', 'POST'])
def register_get():
    if request.method == 'POST':
        email = request.form.get('email')
        firstname = request.form.get('firstName')
        lastname = request.form.get('lastName')
        username = request.form.get('username')
        password = request.form.get('password')
        repeat_password = request.form.get('repeatPassword')

        email = escape(email)
        firstname = escape(firstname)
        lastname = escape(lastname)
        username = escape(username)
        password = escape(password)
        repeat_password = escape(password)

        user = Users.query.filter_by(email=email).first()

        if user:
             pass
            
        elif password != repeat_password:
            pass

        else:
            password = generate_password_hash(password)
            new_user =  Users(email=email, first_name=firstname, last_name=lastname, \
                 username=username, password=password )
            db.session.add(new_user)
            db.session.commit()
            
            # return

@auth.route('/api/register', methods=['GET'])
def register_check(result: bool, msg: str):
        if result == False:
            return {"message"}
        else:
            return {"message": "account has been created"}, 200


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
    #return"""

