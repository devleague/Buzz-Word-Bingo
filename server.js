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
  res.json(buzzWords); //return buzzWords obj as JSON
  res.set("success", "true"); //setting header status
  res.end();
});

app.post("/buzzwords", (req, res) => {
  let newWord = req.body;

  if (Object.keys(buzzWords).length > 10) {
    //err if more than 5 objects
    res.set("success", "false").end();
  } else {
    buzzWords.buzzWord = newWord.buzzWord; //adding to object
    buzzWords.points = newWord.points;
    console.log(buzzWords);
    res.set("success", "true").end();
    return buzzWords;
  }
});

app.put("/buzzwords", (req, res) => {
  let putWord = req.body;
  console.log(buzzWords);
  for (var i = 0; i <= Object.keys(buzzWords).length; i++) {
    //iterating to find matching key

    if (buzzWords.buzzWord[i] === putWord.buzzWord) {
      buzzWords.putWord[i] = putWord.points;
      console.log(buzzWords);
      res.set("success", "true").end();
    } else {
      res.set("success", "false").end();
    }
  }
});

app.listen(PORT, () => console.log("Server listening on port 8080"));
