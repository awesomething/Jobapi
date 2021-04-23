const app = require('./app')
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "b9bdca4b0b9ce1",
  host: "us-cdbr-east-03.cleardb.com",
  password: "9e85f6ec",
  database: "heroku_2793bc343638f0e"
});

app.set('db', db)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Yey, your server is running at https://fast-cliffs-44772.herokuapp.com");
})


