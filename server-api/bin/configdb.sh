#!/bin/bash

echo "Configuring database: pyrichdb"

echo "Dropping database: pyrichdb"
dropdb --no-password --host=localhost --username=postgres pyrichdb

echo "Creating database: pyrichdb"
createdb --no-password --host=localhost --username=postgres pyrichdb

echo "Creating Tables for pyrichdb database"
psql --no-password --host=localhost --dbname=pyrichdb --username=postgres < ./sql/pyrich.sql

echo "pyrichdb configured"