const pg = require("pg");

const client = new pg.Client({
  connectionString: "postgresql://localhost/fishes-app"
});

client.connect();

module.exports = client;
