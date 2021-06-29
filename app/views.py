from flask import Blueprint

home = Blueprint("bp_home", __name__)

@home.route('/')
def home_get():
    pass
    # return render_template("home.html", user=current_user)