from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# --- Routes ---

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/agregar-donacion", methods=["GET", "POST"])
def agregar_donacion():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        region = request.form["region"]
        comuna = request.form["comuna"]
        device_names = [key for key in request.form if key.startswith('device-name-')]
        device_types = [key for key in request.form if key.startswith('device-type-')]
        device_ages = [key for key in request.form if key.startswith('device-age-')]
        device_states = [key for key in request.form if key.startswith('device-state-')]
        device_imgs = image_files = [file for key, file in request.files.getlist if key.startswith('img-device-')]

        return render_template("agregar-donacion.html")

if __name__ == "__main__":
    app.run(debug=True)