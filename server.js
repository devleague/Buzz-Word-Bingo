var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const PORT = 8080;
let buzzWords = {};

app.use(
  express.static("/public", next => {
    next();
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) =>
  res.sendFile("./index.html", err => {
    if (err) {
      next(err);
    } else {
      console.log("sent: index.html");
    }
  })
);

app.get("/buzzwords", (req, res) => {
  res.set("success", "true"); //setting header status
  res.json(buzzWords); //return buzzWords obj as JSON
  res.end();
});

app.post("/buzzwords", (req, res) => {
  let newWord = req.body;

  if (Object.keys(buzzWords).length > 10) {
    //err if more than 5 objects
    res.set("success", "false");
    return;
  } else {
    buzzWords.buzzWord = newWord.buzzWord; //adding to object
    buzzWords.points = newWord.points;
    console.log(buzzWords);
    res.set("success", "true");
    return buzzWords;
  }
});

app.put("/buzzwords", (req, res) => {
  let putWord = req.body;
  for (var i = 0; i <= Object.keys(buzzWords).length; i++) {
    //iterating to find matching key
    if (buzzWord.buzzWord[i] === putWord.buzzWord) {
      buzzWords.buzzWord[i] = putWord.points;
      console.log(buzzWords);
      res.set("success", "true");
    } else {
      res.set("success", "false");
    }
  }
});

app.listen(PORT, () => console.log("Server listening on port 8080"));
