from flask import Flask, render_template, request, jsonify, send_from_directory, redirect
from flask_socketio import SocketIO, emit
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import os


app = Flask(__name__, static_folder='./react-chat-app/build', static_url_path='/index.html')
CORS(app)  # Enable CORS for all routes

socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins for simplicity

# Maintain a list of connected clients
connected_clients = set()

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatDB.db'  # Change this to your database URI
class Base(DeclarativeBase):
  pass

db = SQLAlchemy(app, model_class=Base)

# Create models for database
class User(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    username: Mapped[str] = mapped_column(db.String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(db.String, nullable=False)
    '''
    def __str__(self):
        return f'{self.id} {self.username} {self.password}'
    '''

def user_serializer(user):
    return {
        'id': user.id,
        'username': user.username,
        'password': user.password
    }

    
# Create the database tables inside the application context
    '''
with app.app_context():
    # Drop existing tables
    db.drop_all()

    # Create new tables
    db.create_all()

    # Add initial users
    db.session.add(User(username="zyena", password="zyena123"))
    db.session.add(User(username="ali", password="ali123"))
    db.session.commit()
    '''

react_folder = 'react-chat-app'
directory= os.getcwd()+ f'/{react_folder}/build/static'


@app.route('/')
def index():
    path= os.getcwd()+ f'/{react_folder}/build'
    print(path)
    return send_from_directory(directory=path, path='index.html')


# Add a catch-all route to redirect any unmatched routes to index.html
@app.route('/<path:invalid_path>')
def catch_all(invalid_path):
    return redirect('/')


@app.route('/static/<folder>/<file>')
def css(folder,file):
    path = folder+'/'+file
    return send_from_directory(directory=directory, path=path)





@app.route('/api/login', methods=['GET'])
def login():
    return jsonify([*map(user_serializer, User.query.all())])

@socketio.on('connect')
def handle_connect():
    client_id = request.sid
    connected_clients.add(client_id)
    print(f'Client {client_id} connected')
    emit('connected_clients', list(connected_clients), broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    client_id = request.sid
    connected_clients.discard(client_id)
    print(f'Client {client_id} disconnected')
    emit('connected_clients', list(connected_clients), broadcast=True)

@socketio.on('message')
def handle_message(data):
    client_id = data['clientId']
    message = data['message']
    print(f"Received message from Client {client_id}: {message}")
    emit('message', {'clientId': client_id, 'message': message}, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)