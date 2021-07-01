from flask.json import jsonify
from . import users
from myapplication import db
from myapplication.models import Users
# It will be changed or removed

@users.route('/api/users', methods=['GET'])
def users_get():
    id:int
    email:str
    first_name:str
    last_name:str
    username:str
    password:str

    #output = []
    users = Users.query.all()
    """for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['email'] = user.email
        user_data['first_name'] = user.first_name
        user_data['last_name'] = user.last_name
        user_data['username'] = user.username
        user_data['password'] = user.password"""
        #output.append(user_data)
 
    return jsonify(users)
    #return