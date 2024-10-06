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

#def insert_contacto():

# Obtener contactos ordenados desde el mas reciente insertado al más antiguo
def get_contactos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute("SELECT id, nombre, email, celular, comuna_id, fecha_creacion FROM contacto ORDER BY id DESC;")
	contactos = cursor.fetchall()
	return contactos

# -- DISPOSITIVO --

# Insertar dispositivo
def insert_dispositivo(id, name, description, types, age, state):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO dispositivo (contacto_id, nombre, descripcion, tipo, anos_uso, estado) VALUES (%s,%s,%s,%s,%s,%s);", (id, name, description, types, age, state))
    dispositivo = cursor.fetchone()
    conn.commit()
    return dispositivo

# Obtener dispositivos asociados a un contacto
def get_dispositivo(contacto_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, contacto_id, nombre, descripcion, tipo, anos_uso, estado FROM dispositivo WHERE contacto_id=%s;", (contacto_id,))
    dispositivo = cursor.fetchall()
    return dispositivo

def get_dispositivos_5(page):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, contacto_id, nombre, descripcion, tipo, anos_uso, estado FROM dispositivo WHERE contacto_id=%s;", (contacto_id,))
    dispositivo = cursor.fetchall()
    return dispositivo