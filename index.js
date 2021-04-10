
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express();
const mysql = require("mysql");



const db = mysql.createConnection({
    user: "b9bdca4b0b9ce1",
    host: "us-cdbr-east-03.cleardb.com",
    password: "9e85f6ec",
    database: "heroku_2793bc343638f0e",
    connectionLimit: 12
  });

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);


app.post("/create", (req, res) => {
    const company = req.body.company;
    const experience = req.body.experience;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;



db.query(
    "INSERT INTO jobs (company, experience, country, position, wage) VALUES (?,?,?,?,?)",
[company, experience, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE jobs SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM jobs WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      } 
    });
  });


 
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
      console.log("Yey, your server is running at https://fast-cliffs-44772.herokuapp.com");
    })

  module.exports = app
/*
const knex = require('knex')
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express();
const { PORT, DATABASE_URL } = require('./config')

const database = knex({
      client: 'pg',
      connection: DATABASE_URL,
    })

app.use(express.json());
app.use(cors());

app.set('database', database)

const {CLIENT_ORIGIN} = require('./config');

app.use(
    cors({
      origin: 'http://localhost:3000'
    })
);

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "vacancies",
});



app.post("/create", (req, res) => {
  const company = req.body.company;
  const experience = req.body.experience;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;



db.query(
  "INSERT INTO jobs (company, experience, country, position, wage) VALUES (?,?,?,?,?)",
[company, experience, country, position, wage],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  }
);
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE jobs SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM jobs WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`)
})



;*/