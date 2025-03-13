#!/bin/bash

echo "Starting Apache Bench Load Test for /weather/ endpoint..."
ab -n 100 -c 10 -p tests/load/apachebench/weather_payload.json -T application/json http://127.0.0.1:8000/weather/
echo ""

echo "Starting Apache Bench Load Test for /query/ endpoint..."
ab -n 200 -c 20 -p tests/load/apachebench/query_payload.json -T application/json http://127.0.0.1:8000/query/
echo ""

echo "Running High Volume Test (1000 requests, 50 concurrent users)..."
ab -n 1000 -c 50 -p tests/load/apachebench/weather_payload.json -T application/json http://127.0.0.1:8000/weather/
echo ""

echo "Running Spike Test (1000 requests, 100 concurrent users)..."
ab -n 1000 -c 100 -p tests/load/apachebench/weather_payload.json -T application/json http://127.0.0.1:8000/weather/
echo ""

echo "Running Duration Test (5000 requests, 50 concurrent users)..."
ab -n 5000 -c 50 -p tests/load/apachebench/weather_payload.json -T application/json http://127.0.0.1:8000/weather/
echo ""

echo "Load Test Completed!"
