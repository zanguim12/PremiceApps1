@echo off
echo Starting backend...
npx json-server .\backend\db.json --port 8000
pause