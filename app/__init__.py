import os.path
from flask import Flask, render_template
from flask_login import LoginManager, login_user
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap
from pathlib import Path

bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
basedir = Path(__file__).parent.absolute()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config.from_mapping(SECRET_KEY='dev')
    # app.permanent_session_lifetime = timedelta(minutes=20)
    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from myapplication.models import Recepies, Opinions, Users

    create_database(app)

    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))

    from myapplication.views import home as bp_home
    app.register_blueprint(bp_home)

    from myapplication.api.recepies import bp as bp_recepies
    app.register_blueprint(bp_recepies)

    from myapplication.api.opinions import bp as bp_opinions
    app.register_blueprint(bp_opinions)

    from myapplication.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from myapplication.add_recipe import add_recipe as add_recipe_blueprint
    app.register_blueprint(add_recipe_blueprint)

    @app.route('/', methods=['GET'])
    def hello():
        return render_template('index.html')

    return app


def create_database(app):
    db.create_all(app=app)
