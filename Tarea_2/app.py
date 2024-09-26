from flask import Flask, request, render_template, redirect, url_for
from utils.validations import validate_donation
from database import db

app = Flask(__name__)

# --- Routes ---

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/agregar-donacion", methods=["GET", "POST"])
def agregar_donacion():
    if request.method == "POST":        
        name = request.form.get("name")
        email = request.form.get("email")
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        device_names = [request.form.get(key) for key in request.form if key.startswith('device-name-')]
        device_types = [request.form.get(key) for key in request.form if key.startswith('device-type-')]
        device_ages = [request.form.get(key) for key in request.form if key.startswith('device-age-')]
        device_states = [request.form.get(key) for key in request.form if key.startswith('device-state-')]
        device_imgs = request.files.getlist('img-device-')
        
        if validate_donation(name, email, region, comuna, device_names, device_types, device_ages, device_states, device_imgs):
            return redirect(url_for("index"))

        return render_template("agregar-donacion.html")

    elif request.method == "GET":
        return render_template("agregar-donacion.html")

if __name__ == "__main__":
    app.run(debug=True)