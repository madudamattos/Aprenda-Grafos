from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Home Page!"

@app.route('/api/grafos')
def grafos():
    return {"message": "Welcome to the Grafos API!"}

if __name__ == '__main__':
    app.run(debug=True)
