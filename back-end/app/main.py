from flask import Flask, request
import psycopg2
import json
import os

"""
    Variables de entorno para flask.
"""
FLASK_PORT = os.environ.get('FLASK_PORT')
FLASK_ENV = os.environ.get('FLASK_ENV')

app = Flask(__name__)

@app.route('/api/areas/mayores/<area>')
def areas_mayores(area):
    try:
        """
            conexion a la base de datos.
        """
        connection = psycopg2.connect(
            user="postgres",
            password="123",
            host="db",
            port="5432",
            database="conabio",
        )
        cursor = connection.cursor()

        """
            Query que se ejecuta en la base de datos.
        """
        cursor.execute("""
            SELECT id,area
            FROM poligonos
            WHERE area > %s
            LIMIT 2;
        """ % (area))

        """
            Respuesta de la base de datos al query.
        """
        playload = [{"id": int(r[0]), "area": float(r[1])} for r in cursor]

    except (Exception, psycopg2.Error):
        playload = None
    finally:
        """
            Pase lo que pase al final cerramos la conexion
            a la base datos y retornamos el payload.
        """
        if(connection):
            cursor.close()
            connection.close()
        return json.dumps({"payload": playload})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=FLASK_PORT)
