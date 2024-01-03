const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./test.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the test.db database.");
});

db.run("CREATE TABLE IF NOT EXISTS greetings(message text)", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Created greetings table");
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});
