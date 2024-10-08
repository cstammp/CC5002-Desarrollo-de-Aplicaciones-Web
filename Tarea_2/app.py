from flask import Flask, request, render_template, redirect, url_for
from utils.validations import validate_donation
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Routes ---

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/agregar-donacion", methods=["GET", "POST"])
def agregar_donacion():
    if request.method == "POST":
        # Obtener información del contacto    
        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        region = request.form.get("region")
        comuna = request.form.get("comuna")

        # Obtener información de los dispositivos
        device_names = [request.form.get(key) for key in request.form if key.startswith('device-name-')]
        device_descriptions = [request.form.get(key) for key in request.form if key.startswith('description-')]
        device_types = [request.form.get(key) for key in request.form if key.startswith('device-type-')]
        device_ages = [request.form.get(key) for key in request.form if key.startswith('device-age-')]
        device_states = [request.form.get(key) for key in request.form if key.startswith('device-state-')]
        device_imgs = [request.files.getlist(key) for key in request.files if key.startswith('img-device-')]

        if validate_donation(name, email, region, comuna, device_names, device_types, device_ages, device_states, device_imgs):

            # Insertar contacto en la base de datos
            contacto_id = db.insert_contacto(name, email, phone, comuna)

            # Insertar dispositivos
            for i, name in enumerate(device_names):
                db.insert_dispositivo(contacto_id, name, device_descriptions[i], device_types[i], device_ages[i], device_states[i])

            # Procesar y guardar las imágenes correspondientes a este dispositivo
            dispositivos = db.get_dispositivo(contacto_id)

            for i, dispositivo in enumerate(dispositivos):
                dispositivo_id = dispositivo[0]

                for img in device_imgs[i]:  # Itera sobre cada imagen
                    # 1. Generar nombre único para la imagen
                    _filename = hashlib.sha256(
                        secure_filename(img.filename).encode("utf-8")
                    ).hexdigest()
                    _extension = filetype.guess(img).extension
                    img_filename = f"{_filename}.{_extension}"
                    # 2. Guardar la imagen en la carpeta de uploads
                    img.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                    # 3. Guardar imagen en la base de datos
                    filepath = "static/uploads"
                    db.insert_img(filepath, img_filename, dispositivo_id)

            return redirect(url_for("index"))

        return render_template("agregar-donacion.html")

    elif request.method == "GET":
        return render_template("agregar-donacion.html")

@app.route("/ver-dispositivos/<int:page>", methods=["GET"])
def ver_dispositivos(page):
    if request.method == "GET":
        data = []
        for device in db.get_dispositivos_by_5(page * 5):
            device_id, contacto_id, comuna, nombre, _, tipo, _, estado = device
            device_imgs = db.get_img(device_id)
            ### CHECKPOINT 
            img_filename = f"uploads/{device_imgs[0][2]}"
            data.append({
                "device_id": device_id,
                "contacto_id": contacto_id,
                "type": tipo,
                "name": nombre,
                "state": estado,
                "comuna": comuna,
                "path_image": url_for("static", filename=img_filename),
            })
        total_devices = db.get_total_devices()
        max_page = int(total_devices/5)
    return render_template("ver-dispositivos.html", data=data, current_page=page, max_page=max_page)

@app.route("/informacion-dispositivo/<int:contacto_id>/<int:device_id>", methods=["GET"])
def info_dispositivo(contacto_id, device_id):
    if request.method == "GET":
        contacto = db.get_contacto_by_id(contacto_id)
        comuna, region = db.get_comuna_region(contacto[4])
        device = db.get_dispositivo_by_id(device_id)
        imgs = db.get_img(device_id)
        imgs_filenames = []
        for img in imgs:
            img_filename = f"uploads/{img[2]}"
            path_image = url_for("static", filename=img_filename)
            imgs_filenames.append(path_image)
    return render_template("informacion-dispositivo.html", contacto=contacto, comuna=comuna, region=region, device=device, imgs_filenames=imgs_filenames)

if __name__ == "__main__":
    app.run(debug=True)