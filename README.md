# affluent-test

## To launch the service you need

1. Launch MySQL server and create new database
2. Apply migrations from `src/migrations`
3. Copy env vars `src/.env.sample` to `src/.env`, set correct credentials in `src/.env` and apply with `source src/.env`
4. Install the dependencies with `npm i`
5. Run `node src/cron/updateUsers.js` to populate database with users data
6. Run `node src/cron/updateData.js` to populate database with stats data
7. Run `npm start` to run api
8. Go to `http://localhost:8000/` to see the data


### TODOs

- [ ] Add error processing
- [ ] Add logger
- [ ] Add linting
- [ ] Add unit & integration tests
- [ ] Add docker & docker-composer for test launch
- [ ] Add migration engine
