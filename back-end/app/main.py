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


def build_payload(row):
    return {
        "id": int(row[0]),
        "area": float(row[1]),
        "geojson": json.loads(row[2])
    }


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
                LIMIT 2;
            """ % (area))

            """
                Respuesta de la base de datos al query.
            """
            payload = [build_payload(r) for r in cursor]

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
            return json.dumps({"payload": payload, "status": status})
    else:
        return json.dumps({"payload": None, "status": "fail"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=FLASK_PORT)
