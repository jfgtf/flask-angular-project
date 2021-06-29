from setuptools import setup

setup(
    name='myapplication',
    packages=['myapplication'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask_sqlalchemy',
        'flask_migrate',
        'flask_bootstrap',
        'flask_login',
        'flask_wtf',
        'wtform',
    ],
)
