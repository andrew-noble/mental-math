from app import create_app

#note: this `from app import create_app` file looks to app/__init__.py for the create_app function
#this is a nonobvious behavior of python. Its how it treats packages. 

app = create_app()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)