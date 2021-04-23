const app = require('./app')
const mysql = require("mysql");

app.set('db', db)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Yey, your server is running at https://fast-cliffs-44772.herokuapp.com");
})


