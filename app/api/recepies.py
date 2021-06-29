from flask import Blueprint

bp = Blueprint('bp_recepies', __name__)

@bp.route('/api/recepies', methods=['GET'])
def recepies_get():
    return "hello from recepies"