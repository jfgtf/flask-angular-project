import os.path
from flask import Flask, app, render_template, make_response, jsonify
from flask_login import LoginManager, login_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_migrate import Migrate
from pathlib import Path
from flask_restful import Api, Resource


db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
basedir = Path(__file__).parent.absolute()


def create_app():
    app = Flask(__name__)
    api = Api(app)
    #engine = create_engine('sqlite:///db.sqlite')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config.from_mapping(SECRET_KEY='dev')
    # app.permanent_session_lifetime = timedelta(minutes=20)
    #bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from myapplication.models import Recepies, Opinions, Users

    create_database(app)

    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))

    from myapplication.auth.api import RegisterApi
    api.add_resource(RegisterApi, '/api/register')

    from myapplication.auth.api import LoginApi
    api.add_resource(LoginApi, '/api/login')

    from myapplication.recepies.api import RecepiesApi
    api.add_resource(RecepiesApi, '/api/recepies')

    #from myapplication.opinions.api import OpinionsApi
    #api.add_resource(OpinionsApi, '/api/opinions')

    from myapplication.views import home as bp_home
    app.register_blueprint(bp_home)

    #from myapplication.recepies import recepies as bp_recepies
    #app.register_blueprint(bp_recepies)

    #from myapplication.opinions import opinions as bp_opinions
    #app.register_blueprint(bp_opinions)

    #from myapplication.add_recipe import add_recipe as bp_add_recipe
    #app.register_blueprint(bp_add_recipe)

    from myapplication.users import users as bp_users
    app.register_blueprint(bp_users)

    @app.route('/elo', methods=['GET'])
    def elo():
        return "elo", 200

    @app.route('/hejka', methods=['GET'])
    def tryjson():
        #x = Users(email="sdad@", first_name="hej", last_name='lastXD', username="username", password="admin1")
        x = Users.query.filter_by(email="kamil@wp.pl").first()
        #print(x.email)
        #db.session.add(x)
        #db.session.commit()
        #users = Users.query.all()
        #print(x)
        if x:
            return jsonify(x), 200
            #return {"message": "hej"}, 200
        else:
            return "hejka"

    class HelloWorld(Resource):
        def get(self):
            return {"data": "got"}
        
        def post(self):
            return {"data": "posted"}

    api.add_resource(HelloWorld, "/xd")

    return app


def create_database(app):
    db.create_all(app=app)
