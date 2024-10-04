from flask import Flask,request,jsonify
from flask_cors import CORS

def test():
    return "This is a test message from test.py"

def create_app():
    app = Flask(__name__)
    CORS(app)
    @app.route("/")
    def landing_page():
        return "Hello World"

    @app.route('/python-file')
    def python_test():
        from test import  my_test  # Import test inside the function
        my_test_c =  my_test()
        return my_test_c    
    
    @app.route('/send-name', methods=['POST'])
    def receive_name():
        from add_faces import addFaces  # Import test inside the function
        data = request.json  # Get the JSON data sent from the client
        name = data.get('name')  # Extract the 'name' value from the JSON data
        print(f"Received name: {name}")  # Print the received name on the server console
        my_face = addFaces(name)
        return my_face
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=8000)
