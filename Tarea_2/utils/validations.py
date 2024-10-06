import re
import json
import filetype

# Ruta al archivo JSON
file_path = "static/region_comuna.json"

# Abrir el archivo y cargar su contenido como JSON
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

regions = {str(region['id']): [str(comuna['id']) for comuna in region['comunas']] for region in data['regiones']}

# -- Validations --

def validate_name(value):
    return value and len(value) >= 3 and len(value) <= 80

def validate_email(value):
    regex = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
    return value and bool(re.match(regex,value))

def validate_phone(value):
    regex = r'^\d{9}$'
    return value and bool(re.match(regex,value))

def validate_region_comuna(region, comuna):
    return region in regions and comuna in regions[region]

def validate_deviceNames(values):
    for value in values:
        if not(value and len(value) >= 3 and len(value) <= 80):
            return False
    return True        

def validate_deviceTypes(values):
    types = ["pantalla","notebook","tablet","celular","consola","mouse","teclado","impresora","parlante","audifonos","otro"]
    for value in values:
        if not value in types:
            return False
    return True        

def validate_deviceAges(values):
    for value in values:
        if not (value and value.isdigit() and 1 <= int(value) <= 99):
            return False
    return True        

def validate_deviceStates(values):
    states = ["perfecto","a-medias","no-funciona"]
    for value in values:
        if not value in states:
            return False
    return True

def validate_imgs(values):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    if len(values) > 3 or len(values) < 1:
        return False
    for value in values:
        # check if a file was submitted
        if value is None:
            return False

        # check if the browser submitted an empty file
        if value.filename == "":
            return False

        # check file extension
        ftype_guess = filetype.guess(value)
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False

        # check mimetype
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
    return True

def validate_donation(name,email,region,comuna,device_names,device_types,device_ages,device_states,device_imgs):
    return validate_name(name) and validate_email(email) and validate_region_comuna(region,comuna)\
    and validate_deviceNames(device_names) and validate_deviceTypes(device_types) and validate_deviceAges(device_ages)\
    and validate_deviceStates(device_states) and validate_imgs(device_imgs)
