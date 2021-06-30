from flask.json import jsonify
from . import users
from myapplication import db
from myapplication.models import Users

@users.route('/api/users', methods=['GET'])
def users_get():
    users = Users.query.all()
    return jsonify(users)