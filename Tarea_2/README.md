Tarea 2 - Desarrollo de Aplicaciones Web
Realizado por: Cristóbal Stamm

Este proyecto utiliza Flask como framework web y MySQL como base de datos. A continuación, se describen los pasos para configurar y ejecutar el entorno de desarrollo.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes programas en tu sistema:

- [Python 3.x](https://www.python.org/downloads/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)

## Instalación y Configuración del Entorno

### 1. Clonar el repositorio

Clona este repositorio a tu máquina local utilizando Git:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Crear y activar el entorno virtual (venv)

Es recomendable usar un entorno virtual para aislar las dependencias del proyecto. Sigue los pasos a continuación para crear y activar el entorno virtual:

En linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

En Windows
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Instalar las dependencias del proyecto

Con el entorno virtual activado, instala las dependencias listadas en el archivo requirements.txt:

```bash
pip install -r requirements.txt
```

### 4. Configurar la base de datos MySQL

Asegúrate de que MySQL está instalado y funcionando. Crea una base de datos para el proyecto:

1. Inicia sesión en MySQL desde la terminal:

    ```bash
    mysql -u root -p
    ```

2. Luego ejecuta tarea2.sql y region-comunas.sql en la carpeta database para crear la base de datos tarea2.

3. Asegúrate de que MySQL está corriendo. Inicia el servidor MySQL

### 5. Iniciar la aplicación Flask

```bash
flask run
```

## Creditos

Para agregar dispositivos, código inspirado en:
    Aux 2  Raúl De la Fuente A.

Para algunas validaciones, código inspirado en:
	Aux 3 Francisco Márquez

Para agregar archivos, código inspirado en:
    Aux 6 Francisco Márquez