# affluent-test

## To launch the service you need

1. Launch MySQL server and create new database
2. Apply migrations from `src/migrations`
3. Copy env vars `src/.env.sample` to `src/.env`, set correct credentials in `src/.env` and apply with `source src/.env`
4. Run `node src/cron/updateUsers.js` to populate database with users data
5. Run `node src/cron/updateData.js` to populate database with stats data
6. Run `npm start` to run api
7. Go to `http://localhost:8000/` to see the data
