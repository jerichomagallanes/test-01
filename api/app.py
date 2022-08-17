from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/users', methods = ['GET'])
def get_users():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route('/get/<id>', methods = ['GET'])
def user_details(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)

@app.route('/add', methods = ['POST'])
def add_user():
    name = request.json['name']
    email = request.json['email']

    user = Users(name, email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': "User Added Successfully"})
    # return user_schema.jsonify(user)

@app.route('/update/<id>', methods = ['PUT'])
def update_user(id):
    user = Users.query.get(id)
    name = request.json['name']

    user.name = name
    db.session.commit()
    return jsonify({'message': "User Updated Successfully"})
    # return user_schema.jsonify(user)

@app.route('/delete/<id>', methods = ['DELETE'])
def delete_user(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': "User Deleted Successfully"})
    # return user_schema.jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)