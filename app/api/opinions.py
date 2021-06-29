from flask import Blueprint

bp = Blueprint('bp_opinions', __name__)

@bp.route('/api/opinions', methods=['GET'])
def opinions_get():
    return "hello from opinions"