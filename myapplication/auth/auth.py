import re
from flask import jsonify, request
import jwt
from functools import wraps
from myapplication import app

def check_email(email: str) -> bool:
	regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$' 
	if re.search(regex, email):
		return True
	else:
		return False

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') #http://127.0.0.1:5000/api/something?token=alshfjfjdklsfj89549834ur

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 400

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except Exception as e:
            return jsonify({'message' : 'Token is invalid!'}), 400

        return f(*args, **kwargs)

    return decorated