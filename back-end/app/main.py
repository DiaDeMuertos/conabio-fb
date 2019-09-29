from flask import Flask, request
import psycopg2
import json
import os

FLASK_PORT = os.environ.get('FLASK_PORT')
FLASK_ENV = os.environ.get('FLASK_ENV')

app = Flask(__name__)


@app.route('/api/areas/mayores/<area>')
def areas_mayores(area):
    try:
        connection = psycopg2.connect(
            user="postgres", password="123", host="db", port="5432", database="conabio"
        )
        cursor = connection.cursor()

        cursor.execute("""
            SELECT id,area
            FROM poligonos
            WHERE area > %s
            LIMIT 2;
        """ % (area))

        rows = []
        for r in cursor:
            rows.append({"id": int(r[0]), "area": float(r[1])})

        playload = rows

    except (Exception, psycopg2.Error) as error:
        playload = None
    finally:
        if(connection):
            cursor.close()
            connection.close()
        return json.dumps({"payload": playload})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=FLASK_PORT)
