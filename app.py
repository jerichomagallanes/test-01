from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://mmjnmswqytckmo:10dc66c782a68525b07f65e9b8eb07d6ccdfe713744cdb216cc878f32fcf90db@ec2-44-195-100-240.compute-1.amazonaws.com:5432/deecppf1t4vaas'
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

@app.route('/users', methods = ['POST'])
def createUser():
    name = request.json['name']
    email = request.json['email']

    user = Users(name, email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'message': name + " was added successfully"})

@app.route('/users', methods = ['GET'])
def getUsers():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route('/users/<id>', methods = ['PUT'])
def updateUser(id):
    user = Users.query.get(id)
    name = request.json['name']

    user.name = name
    db.session.commit()
    return jsonify({'message': "Successfully changed name to " + name})

@app.route('/users/<id>', methods = ['DELETE'])
def deleteUser(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': user.name + " was deleted successfully"})

if __name__ == "__main__":
    app.run(debug=True)