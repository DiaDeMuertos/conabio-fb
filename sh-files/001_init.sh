#!/bin/sh

# Se encarga de instalar postgis
psql -U "$POSTGRES_USER" "$POSTGRES_DB" -c "CREATE EXTENSION postgis;"