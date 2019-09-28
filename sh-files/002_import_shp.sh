#!/bin/sh

# Script que se encarda de importar los shp en caso de no existir
# damos por hecho que si existe una existen un shp existen todos.

if psql -U postgres "$POSTGRES_DB" -c "SELECT id FROM veracruz"; then
    echo "Ya fueron importadas"
else
    echo "Importar shps"
    shp2pgsql -s 4326 shapefiles/poligonos.shp | psql -U postgres -d "$POSTGRES_DB"
    shp2pgsql -s 4326 shapefiles/veracruz.shp | psql -U postgres -d "$POSTGRES_DB"
fi