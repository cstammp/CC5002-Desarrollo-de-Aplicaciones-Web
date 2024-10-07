from datetime import datetime
import pymysql

def get_conn():
    conn = pymysql.connect(
        db='tarea2',
        user='cc5002',
        passwd='programacionweb',
        host='localhost',
        charset='utf8'
    )
    return conn

# -- CONTACTO --

# Insertar contacto
def insert_contacto(name, email, phone, comuna_id):
    fecha_creacion = datetime.now()   #fecha y hora actual en formato YYYY-MM-DD HH:MM:SS
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO contacto (nombre, email, celular, comuna_id, fecha_creacion) VALUES (%s,%s,%s,%s,%s);", (name, email, phone, comuna_id, fecha_creacion))
    conn.commit()
    contacto_id = cursor.lastrowid  # obtener el ID del registro insertado
    return contacto_id

# Obtener contactos ordenados desde el mas reciente insertado al más antiguo
def get_contactos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute("SELECT id, nombre, email, celular, comuna_id, fecha_creacion FROM contacto ORDER BY id DESC;")
	contactos = cursor.fetchall()
	return contactos

def get_contacto_by_id(contacto_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute("SELECT id, nombre, email, celular, comuna_id, fecha_creacion FROM contacto WHERE id=%s;", (contacto_id,))
	contactos = cursor.fetchone()
	return contactos

# -- DISPOSITIVO --

# Insertar dispositivo
def insert_dispositivo(contacto_id, name, description, types, age, state):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO dispositivo (contacto_id, nombre, descripcion, tipo, anos_uso, estado) VALUES (%s,%s,%s,%s,%s,%s);", (contacto_id, name, description, types, age, state))
    conn.commit()

# Obtener dispositivos asociados a un contacto
def get_dispositivo(contacto_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, contacto_id, nombre, descripcion, tipo, anos_uso, estado FROM dispositivo WHERE contacto_id=%s;", (contacto_id,))
    dispositivos = cursor.fetchall()
    return dispositivos

def get_dispositivo_by_id(device_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, contacto_id, nombre, descripcion, tipo, anos_uso, estado FROM dispositivo WHERE id=%s;", (device_id,))
    dispositivo = cursor.fetchone()
    return dispositivo

def get_dispositivos_by_5(start):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT D.id, D.contacto_id, COM.nombre, D.nombre, D.descripcion, D.tipo, D.anos_uso, D.estado FROM dispositivo D, contacto CO, comuna COM WHERE contacto_id=CO.id AND CO.comuna_id=COM.id ORDER BY id DESC LIMIT %s, %s;", (start, 5))
    dispositivo = cursor.fetchall()
    return dispositivo

# -- ARCHIVOS --

# Insertar archivo
def insert_img(ruta_archivo, nombre_archivo, dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO archivo (ruta_archivo, nombre_archivo, dispositivo_id) VALUES (%s,%s,%s);", (ruta_archivo, nombre_archivo, dispositivo_id))
    conn.commit()

# obtener archivos asociados a un dispositivo
def get_img(dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, ruta_archivo, nombre_archivo FROM archivo WHERE dispositivo_id=%s;", (dispositivo_id,))
    dispositivo = cursor.fetchall()
    return dispositivo

# -- REGION Y COMUNA --

def get_comuna_region(comuna_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT CO.nombre, R.nombre FROM comuna CO, region R WHERE CO.region_id=R.id AND CO.id=%s;", (comuna_id,))
    comuna = cursor.fetchone()
    return comuna