from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
import os

"""
    Variables de entorno para flask.
"""
FLASK_PORT = os.environ.get('FLASK_PORT')
FLASK_ENV = os.environ.get('FLASK_ENV')

app = Flask(__name__)
cors = CORS(app)

"""
    helper function que se encarga de construir payload object(area_mayores).
"""


def build_areas_mayores(row):
    return {
        "id": int(row[0]),
        "area": float(row[1]),
        "geojson": json.loads(row[2])
    }


"""
    helper function que se encarga de construir payload object(basemap).
"""


def build_basemap(row):
    return {
        "id": int(row[0]),
        "geojson": json.loads(row[1])
    }


@app.route('/api/basemap/<id>', methods=['GET'])
def basemap(id):
    """
        caso solo para request tipo GET
    """
    if request.method == 'GET':
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
                SELECT
                    id,
                    ST_ASGEOJSON(geom) AS geojson
                FROM veracruz
                WHERE id = %s
            """ % (id))

            """
                Respuesta de la base de datos al query.
            """
            payload = [build_basemap(r) for r in cursor]

        except (Exception, psycopg2.Error):
            payload = None
        finally:
            """
                Pase lo que pase al final cerramos la conexion
                a la base datos y retornamos el payload.
            """
            if(connection):
                cursor.close()
                connection.close()
            status = "success" if payload != None else "fail"
            return jsonify({"payload": payload, "status": status})
    else:
        return jsonify({"payload": None, "status": "fail"})


@app.route('/api/areas/mayores/<area>', methods=['GET'])
def areas_mayores(area):
    """
        caso solo para request tipo GET
    """
    if request.method == 'GET':
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
                SELECT
                    id,
                    area,
                    ST_ASGEOJSON(geom) AS geojson
                FROM poligonos
                WHERE area > %s
            """ % (area))

            """
                Respuesta de la base de datos al query.
            """
            payload = [build_areas_mayores(r) for r in cursor]

        except (Exception, psycopg2.Error):
            payload = None
        finally:
            """
                Pase lo que pase al final cerramos la conexion
                a la base datos y retornamos el payload.
            """
            if(connection):
                cursor.close()
                connection.close()
            status = "success" if payload != None else "fail"
            return jsonify({"payload": payload, "status": status})
    else:
        return jsonify({"payload": None, "status": "fail"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=FLASK_PORT)
