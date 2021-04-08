//require('dotenv').config()
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "applicants",
  });

app.use(express.json());
app.use(cors());

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


app.listen(3003, () => {
    console.log("Yey, your server is running at http://localhost:3003");
  });