#!/bin/bash

echo "Testing /weather/ endpoint..."
curl -X POST "http://127.0.0.1:8000/weather/" -H "Content-Type: application/json" -d '{
  "city": "Boston"
}'
echo -e "\n"

echo "Testing /query/ endpoint..."
curl -X POST "http://127.0.0.1:8000/query/" -H "Content-Type: application/json" -d '{
  "city": "Boston",
  "weather_data": {
    "temperature": 22.5,
    "description": "clear sky"
  },
  "query": "Is it sunny?"
}'
echo -e "\n"

echo "Testing /weather/ with invalid city..."
curl -X POST "http://127.0.0.1:8000/weather/" -H "Content-Type: application/json" -d '{
  "city": "InvalidCity"
}'
echo -e "\n"

echo "Testing /query/ with missing weather_data..."
curl -X POST "http://127.0.0.1:8000/query/" -H "Content-Type: application/json" -d '{
  "city": "Boston",
  "query": "Is it sunny?"
}'
echo -e "\n"

echo "Testing /log/ endpoint..."
curl -X POST "http://127.0.0.1:8000/log/" -H "Content-Type: application/json" -d '{
  "level": "info",
  "message": "Test log"
}'
echo -e "\n"
