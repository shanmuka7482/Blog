import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { readFile } from 'node:fs';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var title;
var Content;

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
app.get("/create", (req, res) => {
  res.render("create.ejs");
});


app.post("/submit", (req, res) => {
  const newData = `${req.body.Title}\n${req.body.Content}\n\n`;

  fs.writeFile("Blog.txt", newData, { flag: 'a' }, (err) => {
    if (err) throw err;
    console.log('The Title and Content have been saved!');
  });

  title = req.body.Title;
  Content = req.body.Content;
  res.redirect("/");
});

app.get("/", (req, res) => {
  readFile('Blog.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const sets = data.split('\n\n').map(set => set.split('\n'));

    res.render("index.ejs", { sets });
  });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});