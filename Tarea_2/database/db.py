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

#def insert_contacto():

def get_contactos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute("SELECT id, nombre, email, celular, comuna_id, fecha_creacion FROM contacto ORDER BY id DESC;")
	contactos = cursor.fetchone()
	return contactos

def insert_dispositivo(id, name, description, types, age, state):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO dispositivo (contacto_id, nombre, descripcion, tipo, anos_uso, estado) VALUES (%s,%s,%s,%s,%s,%s);", (id, name, description, types, age, state))
