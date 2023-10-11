from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/start_scanner")
def start_scanner():
    return render_template("qr.html") 

if __name__ == "__main__":
    app.run()
