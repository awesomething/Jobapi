const express = require('express')
const morgan = require('morgan')

const cors = require('cors')
const app = express();
const helmet = require('helmet');
const config = require('./src/config');





const morganOption = (config.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())


app.use(express.json());

//app.use('/employees')

app.use(
  cors({
    origin: '*'
  })
);


app.post("/create", (req, res) => {
  const company = req.body.company;
  const experience = req.body.experience;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  const db = req.app.get('db')

  db.query(
    "INSERT INTO jobs (company, experience, country, position, wage) VALUES (?,?,?,?,?)",
    [company, experience, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  const db = req.app.get('db')
  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const db = req.app.get('db')
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
  const db = req.app.get('db')
  const id = req.params.id;
  db.query("DELETE FROM jobs WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = app